/**
 * jspsych-survey-ius12
 * a jspsych plugin for the intolerance of uncertainty questionnaire
 */

jsPsych.plugins['survey-ius12'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-ius12',
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
    // Define IUS-12 questionnaire.
    //---------------------------------------//

    // Define IUS-12 items.
    var items = [
      "Unforeseen events upset me greatly.",
      "It frustrates me not having all the information I need.",
      "Uncertainty keeps me from living a full life.",
      "One should always look ahead so as to avoid surprises.",
      "A small unforeseen event can spoil everything, even with the best of planning.",
      "When it's time to act, uncertainty paralyses me.",
      "When I am uncertain I can't function very well.",
      "I always want to know what the future has in store for me.",
      "I can't stand being taken by surprise.",
      "The smallest doubt can stop me from acting.",
      "I should be able to organize everything in advance.",
      "I must get away from all uncertain situations."
    ];

    // Define IUS-12 response scale.
    var scale = ["Not at all<br>characteristic<br>of me",
                 "A little<br>characteristic<br>of me",
                 "Somewhat<br>characteristic<br>of me",
                 "Very<br>characteristic<br>of me",
                 "Entirely<br>characteristic<br>of me"];

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

    // Insert class
    html += `<style>
    .ius12-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 40% 12% 12% 12% 12% 12%;
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

    .ius12-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .ius12-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .ius12-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .ius12-resp input {
      position: relative;
    }

    .ius12-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 96px;
    }

    .ius12-resp:last-child input:after {
      display: none;
    }

    .ius12-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .ius12-footer input[type=submit] {
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

    // Add instructions.
    html += '<p style="font-size:17px;">Read each statement carefully and select which best describes you.<p>';

    // Begin form.
    html += '<form id="jspsych-survey-ius12">';

    // Initialize survey container.
    html += '<div class="ius12-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every six items).
      if (i % 6 == 0) {
        html += '<div class="ius12-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="ius12-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='ius12-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      var index = [1,2,3,4,5];

      for (let j of index) {
        html += `<div class='ius12-resp'><input type="radio" name="IUS12-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="ius12-footer"><input type="submit" id="jspsych-survey-ius12" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-ius12').addEventListener('submit', function(event) {

        // Wait for response.
        event.preventDefault();

        // Measure response time.
        var endTime = performance.now();
        var response_time = endTime - startTime;

        // Extract responses.
        var question_data = serializeArray(this);
        question_data = objectifyForm(question_data);

        // Store data
        var trialdata = {
          "rt": response_time,
          "ius12": question_data
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
