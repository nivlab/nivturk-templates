/**
 * jspsych-survey-sds
 * a jspsych plugin for the sds
 */

jsPsych.plugins['survey-sds'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-sds',
    description: '',
    parameters: {
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize Question Order',
        default: true,
        description: 'If true, the order of the questions will be randomized'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to finish the trial.'
      },
    }
  }
  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define sds questionnaire.
    //---------------------------------------//

    // Define sds items.
    var items = [
      "I feel down-hearted and blue.",
      "Morning is when I feel the best.",
      "I have crying spells or feel like it.",
      "I have trouble sleeping at night.",
      "I eat as much as I used.",
      "I still enjoy sex.",
      "I notice that I am losing weight.",
      "I have trouble with constipation.",
      "My heart beats faster than usual.",
      "I get tired for no reason.",
      "My mind is as clear as it used to be.",
      "I find it easy to do the things I used to.",
      "I am restless and can't keep still.",
      "I feel hopeful about the future.",
      "I am more irritable than usual.",
      "I find it easy to make decisions.",
      "I feel that I am useful and needed.",
      "My life is pretty full.",
      "I feel that others would be better off if I were dead.",
      "I still enjoy the things I used to do."
    ];

    // Define sds response scale.
    var scale = ["A little of<br>the time", "Some of<br>the time", "Good part of<br>the time", "Most of<br>the time"]

   // Define reverse scoring.
   var reverse = [false, true, false, false, true, true, false, false, false, false, true, true, false, true, false, true, true, true, false, true];

    // Randomize question order.
    var item_order = [];
    for(var i=0; i<items.length; i++){
       item_order.push(i);
    }
    if(trial.randomize_question_order){
       item_order = jsPsych.randomization.shuffle(item_order);
    }

    //---------------------------------------//
    // Define survey HTML.
    //---------------------------------------//

    // scroll to top of screen
    window.scrollTo(0,0);

    // Initialize HTML
    var html = '';

    // Insert CSS
    html += `<style>

    .sds-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 40% 15% 15% 15% 15%;
      grid-template-rows: auto;
      background-color: #F8F8F8;
      border-radius: 5px;
    }

    .row-wrapper {
      display: contents;
    }

    .row-wrapper:hover div {
      background-color: #dee8eb;
    }

    .sds-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .sds-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .sds-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .sds-resp input {
      position: relative;
    }

    .sds-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 140px;
    }

    .sds-resp:last-child input:after {
      display: none;
    }

    .sds-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .sds-footer input[type=submit] {
      background-color: #F0F0F0;
      color: black;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      float: center;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
    }

    </style>`;

    // Begin form.
    html += '<form id="jspsych-survey-sds">';

    // Add instructions.
    html += '<p style="font-size:16px; width: 80vw;">For each item below, please select the answer which best describes how often you felt or behaved this way during the past several days.<p>';

    // Initialize survey container.
    html += '<div class="sds-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 5 == 0) {
        html += '<div class="sds-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="sds-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='sds-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [4,3,2,1];
      } else {
        var index = [1,2,3,4];
      }

      for (let j of index) {
        html += `<div class='sds-resp'><input type="radio" name="sds-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="sds-footer"><input type="submit" id="jspsych-survey-sds" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-sds').addEventListener('submit', function(event) {

        // Wait for response
        event.preventDefault();

        // Measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;

        var question_data = serializeArray(this);
        question_data = objectifyForm(question_data);

        // Store data
        var trialdata = {
          "rt": response_time,
          "sds": question_data
        };

        // Update screen
        display_element.innerHTML = '';

        // Move onto next trial
        jsPsych.finishTrial(trialdata);

    });

    var startTime = performance.now();

  };

  /*!
   * Serialize all form data into an array
   * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
   * @param  {Node}   form The form to serialize
   * @return {String}      The serialized form data
   */
  var serializeArray = function (form) {
    // Setup our serialized data
    var serialized = [];

    // Loop through each field in the form
    for (var i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];

      // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

      // If a multi-select, get all selections
      if (field.type === 'select-multiple') {
        for (var n = 0; n < field.options.length; n++) {
          if (!field.options[n].selected) continue;
          serialized.push({
            name: field.name,
            value: field.options[n].value
          });
        }
      }

      // Convert field data to a query string
      else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized.push({
          name: field.name,
          value: field.value
        });
      }
    }

    return serialized;
  };

  // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
  function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }

  return plugin;

})();