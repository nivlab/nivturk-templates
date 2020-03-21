/**
 * survey-lsas
 * a jspsych plugin for the Liebowitz Social Anxiety Scale
 */

jsPsych.plugins['survey-lsas'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-lsas',
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
    var items = [
      "Telephoning in public<br><div class='subtext'>Speaking on the telephone in a public place</div>",
      "Participating in small groups<br><div class='subtext'>Having a discussion with a few others</div>",
      "Eating in public places<br><div class='subtext'>Do you tremble or feel awkward handling food?</div>",
      "Drinking with others in public places<br><div class='subtext'>Refers to any beverage including alcohol</div>",
      "Talking to people in authority<br><div class='subtext'>For example, a boss or teacher</div>",
      "Acting, performing, or giving a talk in front of an audience<br><div class='subtext'>Refers to a large audience</div>",
      "Going to a party<br><div class='subtext'>An average party to which you may be invited; assume you know some but not all people at the party</div>",
      "Working while being observed<br><div class='subtext'>Any type of work you might do including school work or housework</div>",
      "Writing while being obsreved<br><div class='subtext'>For example, signing a check in a bank</div>",
      "Calling someone you don't know very well",
      "Talking with people you don't know very well",
      "Meeting strangers",
      "Urinating in a public bathroom",
      "Entering a room when others are already seated",
      "Being the center of attention",
      "Taking a written test",
      "Expressing appropriate disagreement or disapproval to people you don't know very well",
      "Looking at people you don't know very well in the eyes",
      "Giving a report to a group",
      "Trying to pick up someone",
      "Returning goods to a store where returns are normally accepted",
      "Giving an average party",
      "Resisting a high pressure salesperson"
    ];

    // Define lsas response scale.
    var scale = ["None","Mild","Moderate","Severe"]

    // Define reverse scoring.
    var reverse = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

    // Define instructions.
    var instructions = 'Fill out the following questionnaire with the most suitable answer for each item.<br>Base your answers on your experience in the <b>past week.</b>';

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
    .survey-lsas-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-lsas-instructions {
      width: 75vw;
      margin: auto;
      font-size: 1.25vw;
      line-height: 1.5em;
    }
    .survey-lsas-container {
      display: grid;
      grid-template-columns: ${x1}% repeat(${n}, ${x2}%);
      grid-template-rows: auto;
      width: 75vw;
      margin: auto;
      background-color: #F8F8F8;
      border-radius: 8px;
    }
    .survey-lsas-row {
      display: contents;
    }
    .survey-lsas-row:hover div {
      background-color: #dee8eb;
    }
    .survey-lsas-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 1vw;
      line-height: 1.15em;
    }
    .survey-lsas-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 1.15vw;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-lsas-prompt .subtext {
      margin: 5px 0 0 0;
      font-size: smaller;
      font-weight: 600;
    }
    .survey-lsas-response {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }
    .survey-lsas-response input[type='radio'] {
      position: relative;
    }
    .survey-lsas-response input[type='radio']::after {
      position: absolute;
      left: 100%;
      top: 50%;
      height: 2px;
      width: calc(75vw * ${x2 / 100} - 100%);
      background: #d8dcd6;
      content: "";
    }
    .survey-lsas-response:last-child input[type='radio']::after {
      display: none;
    }
    .survey-lsas-footer {
      margin: auto;
      width: 75vw;
      padding: 0 0 0 0;
      text-align: right;
    }
    .survey-lsas-footer input[type=submit] {
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
    html += '<div class="survey-lsas-wrap"><form id="survey-lsas-submit">';

    // Add instructions.
    html += '<div class="survey-lsas-instructions" id="instructions">';
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
    html += '<div class="survey-lsas-container">';

    for (var i = 0; i < items.length; i++) {

      // Define item ID.
      const qid = ("0" + `${item_order[i]+1}`).slice(-2);

      // Define response values.
      var values = [];
      for (var j = 0; j < scale.length; j++){ values.push(j); }
      if (reverse[item_order[i]]) { values = values.reverse(); }

      // Add response headers (every N items).
      if (i % trial.scale_repeat == 0) {
        html += '<div class="survey-lsas-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="survey-lsas-header">${scale[j]}</div>`;
        }
      }

      // Add row.
      html += '<div class="survey-lsas-row">';
      html += `<div class='survey-lsas-prompt'>${items[item_order[i]]}</div>`;
      for (let v of values) {
        html += `<div class='survey-lsas-response'><input type="radio" name="LSAS-Q${qid}" value="${v}" required></div>`;
      }
      html += '</div>';

    }
    html += '</div>';

    // Add submit button.
    html += '<div class="survey-lsas-footer">';
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

    display_element.querySelector('#survey-lsas-submit').addEventListener('submit', function(event) {

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
