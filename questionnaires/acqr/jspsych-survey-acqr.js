/**
 * survey-acqr
 * a jspsych plugin for the Anxiety Control Questionnaire (Revised)
 */

jsPsych.plugins['survey-acqr'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-acqr',
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
        default: 8,
        description: 'The number of items before the scale repeats'
      },
      row_prompt_percent: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Row prompt percent',
        default: 50,
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
      "I can usually put worrisome thoughts out of my mind easily.",
      "I am able to control my level of anxiety.",
      "I can usually relax when I want.",
      "I am unconcerned if I become anxious in a difficult situation, because I am confident in my ability to cope with my symptoms.",
      "When I am anxious, I find it hard to focus on anything other than my anxiety.",
      "When I am frightened by something, there is generally nothing I can do.",
      "Whether I can successfully escape a frightening situation is always a matter of chance with me.",
      "There is little I can do to change frightening events.",
      "The extent to which a difficult situation resolves itself has nothing to do with my actions.",
      "If something is going to hurt me, it will happen no matter what I do.",
      "Most events that make me anxious are outside my control.",
      "How well I cope with difficult situations depends on whether I have outside help.",
      "When I am put under stress, I am likely to lose control.",
      "When I am under stress, I am not always sure how I will react.",
      "I usually find it hard to deal with difficult problems."
    ];

    // Define response scale.
    var scale = ["Strongly<br>Disagree",
                 "Moderately<br>Disagree",
                 "Slightly<br>Disagree",
                 "Slightly<br>Agree",
                 "Moderately<br>Agree",
                 "Strongly<br>Agree"];

   // Define reverse scoring.
   var reverse = [false, false, false, false, true, true, true, true, true, true,
                  true, true, true, true, true];

    // Define instructions.
    var instructions = 'Please read each statement below carefully and indicate how much you think each statement is typical of you.';

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
    .survey-acqr-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-acqr-instructions {
      width: 90vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-acqr-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: 90vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-acqr-row {
      display: contents;
    }
    .survey-acqr-row:hover div {
      background-color: #dee8eb;
    }
    .survey-acqr-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-acqr-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-acqr-response {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-acqr-response input[type='radio'] {
      position: relative;
    }
    .survey-acqr-response input[type='radio']::after {
      position: absolute;
      left: 100%;
      top: 50%;
      height: 2px;
      width: calc(90vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-acqr-response:last-child input[type='radio']::after {
      display: none;
    }
    .survey-acqr-footer {
      margin: auto;
      width: 90vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-acqr-footer input[type=submit] {
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
    html += '<div class="survey-acqr-wrap"><form id="survey-acqr-submit">';

    // Add instructions.
    html += '<div class="survey-acqr-instructions" id="instructions">';
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
    html += '<div class="survey-acqr-container">';

    for (var i = 0; i < items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < scale.length; j++){ values.push(j); }
      if (reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-acqr-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="survey-acqr-header">${scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-acqr-row">';
      html += `<div class='survey-acqr-prompt'>${items[item_order[i]]}</div>`;
      for (let v of values) {
        html += `<div class='survey-acqr-response'><input type="radio" name="ACQR-Q${qid}" value="${v}" required></div>`;
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-acqr-footer">';
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

    display_element.querySelector('#survey-acqr-submit').addEventListener('submit', function(event) {

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
