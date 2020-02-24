/**
 * jspsych-survey-oci
 * a jspsych plugin for the oci
 */

jsPsych.plugins['survey-oci'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-oci',
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
    // Define oci questionnaire.
    //---------------------------------------//

    // Define oci items.
    var items = [
      "I have saved up so many things that they get in the way.",
      "I check things more often than necessary.",
      "I get upset if objects are not arranged properly. ",
      "I feel compelled to count while I am doing things.",
      "I find it difficult to touch an object when I know it has been touched by strangers or certain people.",
      "I find it difficult to control my own thoughts.",
      "I collect things I don't need.",
      "I repeatedly check doors, windows, drawers, etc.",
      "I get upset if others change the way I have arranged things.",
      "I feel I have to repeat certain numbers.",
      "I sometimes have to wash or clean myself simply because I feel contaminated.",
      "I am upset by unpleasant thoughts that come into my mind against my will.",
      "I avoid throwing things away because I am afraid I might need them later.",
      "I repeatedly check gas and water taps and light switches after turning them off.",
      "I need things to be arranged in a particular way.",
      "I feel that there are good and bad numbers.",
      "I wash my hands more often and longer than necessary",
      "I frequently get nasty thoughts and have difficulty in getting rid of them."
    ];

    // Define oci response scale.
    var scale = ["Not at all", "A little", "Moderately", "A lot", "Extremely"]

   // Define reverse scoring.
   var reverse = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

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

    .oci-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 50% 10% 10% 10% 10% 10%;
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

    .oci-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .oci-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .oci-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .oci-resp input {
      position: relative;
    }

    .oci-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 96px;
    }

    .oci-resp:last-child input:after {
      display: none;
    }

    .oci-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .oci-footer input[type=submit] {
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
    html += '<form id="jspsych-survey-oci">';

    // Add instructions.
    html += '<p style="font-size:16px; width: 80vw;">The following statements refer to experiences that many people have in their everyday lives. Select the description that best describes <b>HOW MUCH</b> that experience has <b>DISTRESSED or BOTHERED you during the PAST MONTH.</b><p>';

    // Initialize survey container.
    html += '<div class="oci-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 6 == 0) {
        html += '<div class="oci-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="oci-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='oci-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [4,3,2,1,0];
      } else {
        var index = [0,1,2,3,4];
      }

      for (let j of index) {
        html += `<div class='oci-resp'><input type="radio" name="oci-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="oci-footer"><input type="submit" id="jspsych-survey-oci" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-oci').addEventListener('submit', function(event) {

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
          "oci": question_data
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
