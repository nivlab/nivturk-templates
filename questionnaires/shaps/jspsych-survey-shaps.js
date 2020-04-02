/**
* survey-shaps
* a jspsych plugin for the SHAPS (Snaith et al., 1995)
* Several minor terminology edits have been made (question #1 and question #8) to adjust British English for an American sample
*/

jsPsych.plugins['survey-shaps'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-shaps',
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
      "I would enjoy my favorite television or radio show.",                                                       // Q1; lightly edited
      "I would enjoy being with my family or close friends.",                                                      // Q2
      "I would find pleasure in my hobbies and pastimes.",                                                         // Q3
      "I would be able to enjoy my favourite meal.",                                                               // Q4
      "I would enjoy a warm bath or refreshing shower.",                                                           // Q5
      "I would find pleasure in the scent of flowers or the smell of a fresh sea breeze or freshly baked bread.",  // Q6
      "I would enjoy seeing other people's smiling faces.",                                                        // Q7
      "I would enjoy looking good when I have made an effort with my appearance.",                                 // Q8; lightly edited
      "I would enjoy reading a book, magazine, or newspaper.",                                                     // Q9
      "I would enjoy a cup of tea or coffee or my favorite drink.",                                                // Q10
      "I would be able to take pleasure in small things, e.g. bright sunny day, a telephone call from a friend.",  // Q11
      "I would be able to enjoy a beautiful landscape or view.",                                                   // Q12
      "I would get pleasure from helping others.",                                                                 // Q13
      "I would feel pleasure when I receive praise from other people."                                             // Q14
    ];

    // Define response scale.
    var scale = [
      "Strongly<br>disagree",               // scored as 0
      "Disagree",                           // scored as 1
      "Agree",                              // scored as 2
      "Strongly<br>agree"                   // scored as 3
    ];


    // Define reverse scoring.
    var reverse = [false, false, false, false, false, false, false,
                   false, false, false, false, false, false, false];

      // Define instructions.
      var instructions = 'This questionnaire is designed to measure your ability to experience pleasure <b>in the last few days.</b>';

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
      .survey-shaps-wrap {
        height: 100vh;
        width: 100vw;
      }
      .survey-shaps-instructions {
        width: 80vw;
        margin: auto;
        font-size: 1.25vw;
        line-height: 1.5em;
      }
      .survey-shaps-container {
        display: grid;
        grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
        grid-template-rows: auto;
        width: 80vw;
        margin: auto;
        background-color: #F8F8F8;
        border-radius: 8px;
      }
      .survey-shaps-row {
        display: contents;
      }
      .survey-shaps-row:hover div {
        background-color: #dee8eb;
      }
      .survey-shaps-header {
        padding: 18px 0 0px 0;
        text-align: center;
        font-size: 1vw;
        line-height: 1.15em;
      }
      .survey-shaps-prompt {
        padding: 12px 0 12px 15px;
        text-align: left;
        font-size: 1.15vw;
        line-height: 1.15em;
        justify-items: center;
      }
      .survey-shaps-response {
        padding: 12px 0 12px 0;
        font-size: 12px;
        text-align: center;
        line-height: 1.15em;
        justify-items: center;
      }
      .survey-shaps-response input[type='radio'] {
        position: relative;
      }
      .survey-shaps-response input[type='radio']::after {
        position: absolute;
        left: 100%;
        top: 50%;
        height: 2px;
        width: calc(80vw * ${x2 / 100} - 100%);
        background: #d8dcd6;
        content: "";
      }
      .survey-shaps-response:last-child input[type='radio']::after {
        display: none;
      }
      .survey-shaps-footer {
        margin: auto;
        width: 80vw;
        padding: 0 0 0 0;
        text-align: right;
      }
      .survey-shaps-footer input[type=submit] {
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
      html += '<div class="survey-shaps-wrap"><form id="survey-shaps-submit">';

      // Add instructions.
      html += '<div class="survey-shaps-instructions" id="instructions">';
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
      html += '<div class="survey-shaps-container">';

      for (var i = 0; i < items.length; i++) {

        // Define item ID.
        const qid = ("0" + `${item_order[i]+1}`).slice(-2);

        // Define response values.
        var values = [];
        for (var j = 0; j < scale.length; j++){ values.push(j); }
        if (reverse[item_order[i]]) { values = values.reverse(); }

        // Add response headers (every N items).
        if (i % trial.scale_repeat == 0) {
          html += '<div class="survey-shaps-header"></div>';
          for (var j = 0; j < scale.length; j++) {
            html += `<div class="survey-shaps-header">${scale[j]}</div>`;
          }
        }

        // Add row.
        html += '<div class="survey-shaps-row">';
        html += `<div class='survey-shaps-prompt'>${items[item_order[i]]}</div>`;
        for (let v of values) {
          html += `<div class='survey-shaps-response'><input type="radio" name="SHAPS-Q${qid}" value="${v}" required></div>`;
        }
        html += '</div>';

      }
      html += '</div>';

      // Add submit button.
      html += '<div class="survey-shaps-footer">';
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

      display_element.querySelector('#survey-shaps-submit').addEventListener('submit', function(event) {

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
