/**
 * jspsych-survey-nfc6
 * a jspsych plugin for the NFC-6
 */

jsPsych.plugins['survey-nfc6'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-nfc6',
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
    // Define nfc6 questionnaire.
    //---------------------------------------//

    // Define nfc6 items.
    var items = [
      "I would prefer complex to simple problems.",
      "I like to have the responsibility of handling a situation that requires a lot of thinking.",
      "Thinking is not my idea of fun.",
      "I would rather do something that requires little thought than something that is sure to challenge my thinking abilities.",
      "I really enjoy a task that involves coming up with new solutions to problems.",
      "I would prefer a task that is intellectual, difficult, and important to one that is somewhat important but does not require much thought."
    ];

    // Define nfc6 response scale.
    var scale = ["Extremely uncharacteristic of me",
                 "Somwhat uncharacteristic of me",
                 "Uncertain",
                 "Somwhat characteristic of me",
                 "Extremely uncharacteristic of me"]

   // Define reverse scoring.
   var reverse = [false, false, true, true, false, false];

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

    .nfc6-container {
      margin: auto;
      width: 80%;
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

    .nfc6-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 12px;
      line-height: 1.15em;
    }

    .nfc6-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .nfc6-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .nfc6-resp input {
      position: relative;
    }

    .nfc6-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 96px;
    }

    .nfc6-resp:last-child input:after {
      display: none;
    }

    .nfc6-footer {
      margin: auto;
      top: 95%;
      width: 80%;
      padding: 0 0 0 0;
      background-color: #fff;
      text-align: right;
    }

    /* Style the submit button */
    .nfc6-footer input[type=submit] {
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
    html += '<p style="font-size:17px;">For each of the statements below, please indicate whether or not the statement is characteristic of you or of what you believe.<p>';

    // Begin form.
    html += '<form id="jspsych-survey-nfc6">';

    // Initialize survey container.
    html += '<div class="nfc6-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 10 == 0) {
        html += '<div class="nfc6-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="nfc6-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='nfc6-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [4,3,2,1,0];
      } else {
        var index = [0,1,2,3,4];
      }

      for (let j of index) {
        html += `<div class='nfc6-resp'><input type="radio" name="nfc6-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="nfc6-footer"><input type="submit" id="jspsych-survey-nfc6" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-nfc6').addEventListener('submit', function(event) {

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
          "nfc6": question_data
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
