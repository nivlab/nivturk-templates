/**
 * survey-bisbas
 * a jspsych plugin for a shortened version of the BIS-BAS (Carver & White, 1994)
 * the original 24-item measure has been shortened to 12 items following the recommendations of
 * Pagliacco et al. (Psych Assessment, 2016).
 */

jsPsych.plugins['survey-bisbas'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-bisbas',
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
    // Labels are per Pagliacco et al (2016)
    var items = [
      "I worry about making mistakes.",                                                // BIS2
      "Criticism or scolding hurts me quite a bit.",                                   // BIS3
      "I feel pretty worried or upset when I think or know somebody is angry at me.",  // BIS4
      "I feel worried when I think I have done poorly at something important.",        // BIS6
      "When I get something I want, I feel excited and energized.",                    // RWD1
      "When I'm doing well at something I love to keep at it.",                        // RWD2
      "It would excite me to win a contest.",                                          // RWD4
      "When I see an opportunity for something I like I get excited right away.",      // RWD5
      "When I want something I usually go all-out to get it.",                         // DRIVE1
      "I go out of my way to get things I want.",                                      // DRIVE2
      "If I see a chance to get something I want I move on it right away.",            // DRIVE 3
      "When I go after something I use a no-holds-barred approach."                    // DRIVE4
    ];

    // Define response scale.
    var scale = [
       "Very false<br>for me",               // scored as 0
       "Somewhat false<br>for me",           // scored as 1
       "Somewhat true<br>for me",            // scored as 2
       "Very true<br>for me"                 // scored as 3
     ];

   // Define reverse scoring.
   var reverse = [false, false, false, false, false, false,
                  false, false, false, false, false, false];

    // Define instructions.
    var instructions = "Each item below is a statement that a person may either agree with or disagree with.  For each item, indicate how much you agree or disagree with what the item says. Please be as accurate and honest as you can be. Respond to each item as if it were the only item. That is, don't worry about being \"consistent\" in your responses.";

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
    .survey-bisbas-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-bisbas-instructions {
      width: 80vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-bisbas-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: 80vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-bisbas-row {
      display: contents;
    }
    .survey-bisbas-row:hover div {
      background-color: #dee8eb;
    }
    .survey-bisbas-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-bisbas-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-bisbas-response {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-bisbas-response input[type='radio'] {
      position: relative;
    }
    .survey-bisbas-response input[type='radio']::after {
      position: absolute;
      left: 100%;
      top: 50%;
      height: 2px;
      width: calc(80vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-bisbas-response:last-child input[type='radio']::after {
      display: none;
    }
    .survey-bisbas-footer {
      margin: auto;
      width: 80vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-bisbas-footer input[type=submit] {
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
    html += '<div class="survey-bisbas-wrap"><form id="survey-bisbas-submit">';

    // Add instructions.
    html += '<div class="survey-bisbas-instructions" id="instructions">';
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
    html += '<div class="survey-bisbas-container">';

    for (var i = 0; i < items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < scale.length; j++){ values.push(j); }
      if (reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-bisbas-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="survey-bisbas-header">${scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-bisbas-row">';
      html += `<div class='survey-bisbas-prompt'>${items[item_order[i]]}</div>`;
      for (let v of values) {
        html += `<div class='survey-bisbas-response'><input type="radio" name="BISBAS-Q${qid}" value="${v}" required></div>`;
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-bisbas-footer">';
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

    display_element.querySelector('#survey-bisbas-submit').addEventListener('submit', function(event) {

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
