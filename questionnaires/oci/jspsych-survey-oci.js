/**
 * survey-oci
 * a jspsych plugin for the obsessive compulsive inventory
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
      scale_repeat: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Scale repeat',
        default: 6,
        description: 'The number of items before the scale repeats'
      },
      row_prompt_percent: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Row prompt percent',
        default: 45,
        description: 'The percentage of a row the item prompt should occupy'
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
    // Define questionnaire.
    //---------------------------------------//

    // Define items.
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

    // Define response scale.
    var scale = ["Not at all", "A little", "Moderately", "A lot", "Extremely"]


    // Define reverse scoring.
    var reverse = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    // Define instructions.
    var instructions = 'The following statements refer to experiences that many people have in their everyday lives. Select the description that best describes how much that experience has <b>distressed or bothered you during the past month.</b><p>';

    //---------------------------------------//
    // Define survey HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Define CSS constants
    const n  = scale.length;
    const x1 = trial.row_prompt_percent;
    const x2 = (100 - trial.row_prompt_percent) / n;

    // Insert CSS
    html += `<style>
    .survey-oci-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-oci-instructions {
      width: 80vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-oci-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: 80vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-oci-row {
      display: contents;
    }
    .survey-oci-row:hover div {
      background-color: #dee8eb;
    }
    .survey-oci-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-oci-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-oci-response {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-oci-response input[type='radio'] {
      position: relative;
    }
    .survey-oci-response input[type='radio']::after {
      position: absolute;
      left: 100%;
      top: 50%;
      height: 2px;
      width: calc(80vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-oci-response:last-child input[type='radio']::after {
      display: none;
    }
    .survey-oci-footer {
      margin: auto;
      width: 80vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-oci-footer input[type=submit] {
      background-color: #F0F0F0;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      margin-top: 5px;
      margin-bottom: 20px;
      margin-right: 0px;
      font-size: 1vw;
      color: black;
    }
    </style>`;

    // Initialize survey.
    html += '<div class="survey-oci-wrap"><form id="survey-oci-submit">';

    // Add instructions.
    html += '<div class="survey-oci-instructions" id="instructions">';
    html += `<p>${instructions}<p>`;
    html += '</div>';

    // Randomize question order.
    var item_order = [];
    for (var i=0; i<items.length; i++){
       item_order.push(i);
    }
    if(trial.randomize_question_order){
       item_order = jsPsych.randomization.shuffle(item_order);
    }

    // Iteratively add items.
    html += '<div class="survey-oci-container">';

    for (var i = 0; i < items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < scale.length; j++){ values.push(j); }
      if (reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-oci-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="survey-oci-header">${scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-oci-row">';
      html += `<div class='survey-oci-prompt'>${items[item_order[i]]}</div>`;
      for (let v of values) {
        html += `<div class='survey-oci-response'><input type="radio" name="OCI-Q${qid}" value="${v}" required></div>`;
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-oci-footer">';
    html += `<input type="submit" value="${trial.button_label}"></input>`;
    html += '</div>';

    // End survey.
    html += '</form></div>';

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    display_element.querySelector('#survey-oci-submit').addEventListener('submit', function(event) {

        // Wait for response
        event.preventDefault();

        // Measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;

        var question_data = serializeArray(this);
        question_data = objectifyForm(question_data);

        // Store data
        var trialdata = {
          "responses": question_data,
          "rt": response_time
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
