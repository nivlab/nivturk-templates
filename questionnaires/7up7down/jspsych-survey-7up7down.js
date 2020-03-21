/**
 * survey-7up7down
 * a jspsych plugin for the 7up-7down
 */

jsPsych.plugins['survey-7up7down'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-7up7down',
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
        default: 7,
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
      "Have you had periods of extreme happiness and intense energy lasting several days or more when you also felt much more anxious or tense (jittery, nervous, uptight) than usual (other than related to the menstrual cycle)?",
      "Have there been times of several days or more when you were so sad that it was quite painful or you felt that you couldn't stand it?",
      "Have there been times lasting several days or more when you felt you must have lots of excitement, and you actually did a lot of new or different things?",
      "Have you had periods of extreme happiness and intense energy (clearly more than your usual self) when, for several days or more, it took you over an hour to get to sleep at night?",
      "Have there been long periods in your life when you felt sad, depressed, or irritable most of the time?",
      "Have you had periods of extreme happiness and high energy lasting several days or more when what you saw, heard, smelled, tasted, or touched seemed vivid or intense?",
      "Have there been periods of several days or more when your thinking was so clear and quick that it was much better than most other people's?",
      "Have there been times of a couple days or more when you felt that you were a very important person or that your abilities or talents were better than most other people's?",
      "Have there been times when you have hated yourself or felt that you were stupid, ugly, unlovable, or useless?",
      "Have there been times of several days or more when you really got down on yourself and felt worthless?",
      "Have you had periods when it seemed that the future was hopeless and things could not improve?",
      "Have there been periods lasting several days or more when you were so down in the dumps that you thought you might never snap out of it?",
      "Have you had times when your thoughts and ideas came so fast that you couldn't get them all out, or they came so quickly that others complained that they couldn't keep up with your ideas?",
      "Have there been times when you have felt that you would be better off dead?"
    ];

    // Define response scale.
    var scale = ["Never or<br>hardly<br>ever",
                 "Sometimes",
                 "Often",
                 "Very often or<br>almost<br>constantly"];

   // Define reverse scoring.
   var reverse = [false, false, false, false, false, false, false,
                  false, false, false, false, false, false, false];

    // Define instructions.
    var instructions = 'Below are some questions about behaviors that occur in the general population.<br>Using the scale below, select the number that best describes how often you experience these behaviors.';

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
    .survey-7up7down-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-7up7down-instructions {
      width: 90vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-7up-7down-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: 90vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-7up-7down-row {
      display: contents;
    }
    .survey-7up-7down-row:hover div {
      background-color: #dee8eb;
    }
    .survey-7up-7down-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-7up-7down-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-7up-7down-response {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-7up-7down-response input[type='radio'] {
      position: relative;
    }
    .survey-7up-7down-response input[type='radio']:after {
      position: absolute;
      left: 100%;
      top: 50%;
      height: 2px;
      width: calc(90vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-7up-7down-response:last-child input[type='radio']:after {
      display: none;
    }
    .survey-7up-7down-footer {
      margin: auto;
      width: 90vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-7up-7down-footer input[type=submit] {
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
    html += '<div class="survey-7up7down-wrap"><form id="survey-7up-7down-submit">';

    // Add instructions.
    html += '<div class="survey-7up7down-instructions" id="instructions">';
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
    html += '<div class="survey-7up-7down-container">';

    for (var i = 0; i < items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < scale.length; j++){ values.push(j); }
      if (reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-7up-7down-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="survey-7up-7down-header">${scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-7up-7down-row">';
      html += `<div class='survey-7up-7down-prompt'>${items[item_order[i]]}</div>`;
      for (let v of values) {
        html += `<div class='survey-7up-7down-response'><input type="radio" name="SUSD-Q${qid}" value="${v}" required></div>`;
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-7up-7down-footer">';
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

    display_element.querySelector('#survey-7up-7down-submit').addEventListener('submit', function(event) {

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
