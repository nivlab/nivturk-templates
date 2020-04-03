/**
 * survey-pswq
 * a jspsych plugin for the Penn State Worry Questionnaire (Meyer et al., 1990)
 */

jsPsych.plugins['survey-pswq'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-pswq',
    description: '',
    parameters: {
      version: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Instrument version',
        default:  'Full',
        description: 'Specifies whether to run the 3-item, 8-item, or Full (16-item) version.'
      },
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

    // Define pswq items
    var all_items = [
      "If I don't have enough time to do everything, I do not worry about it.",                // Q1; included in full version
      "My worries overwhelm me.",                                                              // Q2; included in 8-item and full version
      "I do not tend to worry about things.",                                                  // Q3; to be reverse-scored; included in full version
      "Many situations make me worry.",                                                        // Q4; included in 3-item, 8-item, and full version
      "I know I should not worry about things, but I just can't help it.",                     // Q5; included in 8-item and full version
      "When I'm under pressure I worry a lot.",                                                // Q6; included in 8-item and full version
      "I'm always worrying about something.",                                                  // Q7; included in 8-item and full version
      "I find it easy to dismiss worrisome thoughts.",                                         // Q8; to be reverse-scored; included in full version
      "As soon as I finish one task, I start to worry about everything else I have to do.",    // Q9; included in 8-item and full version
      "I never worry about anything.",                                                         // Q10; to be reverse-scored; included in full version
      "When there's nothing more I can do about a concern, I don't worry about it any more.",  // Q11; to be reverse-scored; included in full version
      "I have been a worrier all my life.",                                                    // Q12; included in 8-item and full version
      "I notice that I have been worrying about things.",                                      // Q13; included in 8-item and full version
      "Once I start worrying, I can't stop.",                                                  // Q14; included in 3-item and full version
      "I worry all the time.",                                                                 // Q15; included in 3-item and full version
      "I worry about projects until they are done."                                            // Q16; included in full version
    ];

    // Define response scale.
    var scale = [
       "Not at all<br>typical<br>of me",              // scored as 0
       "Not very<br>typical<br>of me",                // scored as 1
       "Somewhat<br>typical<br>of me",                // scored as 2
       "Fairly<br>typical<br>of me",                  // scored as 3
       "Very<br>typical<br>of me"                     // scored as 4
     ];

    // Define reverse scoring.
    var all_reverse = [false, false, true, false, false, false, false, true,
                       false, true, true, false, false, false, false, false];

    // Define instructions.
    var instructions = 'Select the option that best describes how typical or characteristic each item is of you.';

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
    .survey-pswq-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-pswq-instructions {
      width: 80vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-pswq-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: 80vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-pswq-row {
      display: contents;
    }
    .survey-pswq-row:hover div {
      background-color: #dee8eb;
    }
    .survey-pswq-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-pswq-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-pswq-response {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-pswq-response input[type='radio'] {
      position: relative;
    }
    .survey-pswq-response input[type='radio']::after {
      position: absolute;
      left: 100%;
      top: 50%;
      height: 2px;
      width: calc(80vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-pswq-response:last-child input[type='radio']::after {
      display: none;
    }
    .survey-pswq-footer {
      margin: auto;
      width: 80vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-pswq-footer input[type=submit] {
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
    html += '<div class="survey-pswq-wrap"><form id="survey-pswq-submit">';

    // Add instructions.
    html += '<div class="survey-pswq-instructions" id="instructions">';
    html += `<p>${instructions}<p>`;
    html += '</div>';

    // subset items depending on version requested
    var item_index = []
    if (trial.version == "Full"){
      item_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    } else if (trial.version == "8-item"){
      item_index = [1, 3, 4, 5, 6, 8, 11, 12];
    } else if (trial.version == "3-item"){
      item_index = [3, 13, 14];
    }

    var items = [];
    var reverse = [];
    for (i = 0; i < item_index.length; i++){
      items.push(all_items[item_index[i]]);
      reverse.push(all_reverse[item_index[i]]);
    }


    // Randomize question order.
    var item_order = [];
    for (var i=0; i<items.length; i++){
       item_order.push(i);
    }
    if(trial.randomize_question_order){
       item_order = jsPsych.randomization.shuffle(item_order);
    }

    // Iteratively add items.
    html += '<div class="survey-pswq-container">';

    for (var i = 0; i < items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < scale.length; j++){ values.push(j); }
      if (reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-pswq-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="survey-pswq-header">${scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-pswq-row">';
      html += `<div class='survey-pswq-prompt'>${items[item_order[i]]}</div>`;
      for (let v of values) {
        html += `<div class='survey-pswq-response'><input type="radio" name="PSWQ-Q${qid}" value="${v}" required></div>`;
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-pswq-footer">';
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

    display_element.querySelector('#survey-pswq-submit').addEventListener('submit', function(event) {

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
