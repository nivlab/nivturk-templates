/**
 * survey-7up7down
 * a jspsych plugin for the GAD-7
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
    // Define seven_up_seven_down questionnaire.
    //---------------------------------------//

    // Define seven_up_seven_down items.
    var items = [
      "Have you had periods of extreme happiness and intense energy lasting several days or more when you also felt much more anxious or tense (jittery, nervous, uptight) than usual (other than related to the menstrual cycle)?",
      "Have there been times of several days or more when you were so sad that it was quite painful or you felt that you couldn’t stand it?",
      "Have there been times lasting several days or more when you felt you must have lots of excitement, and you actually did a lot of new or different things?",
      "Have you had periods of extreme happiness and intense energy (clearly more than your usual self) when, for several days or more, it took you over an hour to get to sleep at night?",
      "Have there been long periods in your life when you felt sad, depressed, or irritable most of the time?",
      "Have you had periods of extreme happiness and high energy lasting several days or more when what you saw, heard, smelled, tasted, or touched seemed vivid or intense?",
      "Have there been periods of several days or more when your thinking was so clear and quick that it was much better than most other people’s?",
      "Have there been times of a couple days or more when you felt that you were a very important person or that your abilities or talents were better than most other people’s?",
      "Have there been times when you have hated yourself or felt that you were stupid, ugly, unlovable, or useless?",
      "Have there been times of several days or more when you really got down on yourself and felt worthless?",
      "Have you had periods when it seemed that the future was hopeless and things could not improve?",
      "Have there been periods lasting several days or more when you were so down in the dumps that you thought you might never snap out of it?",
      "Have you had times when your thoughts and ideas came so fast that you couldn’t get them all out, or they came so quickly that others complained that they couldn’t keep up with your ideas?",
      "Have there been times when you have felt that you would be better off dead?"
    ];

    // Define seven_up_seven_down response scale.
    var scale = ["Never or<br>hardly<br>ever",
                 "Sometimes",
                 "Often",
                 "Very often or<br>almost<br>constantly"];

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
    .seven_up_seven_down-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 42% 14.5% 14.5% 14.5% 14.5%;
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

    .seven_up_seven_down-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .seven_up_seven_down-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .seven_up_seven_down-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .seven_up_seven_down-resp input {
      position: relative;
    }

    .seven_up_seven_down-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 96px;
    }

    .seven_up_seven_down-resp:last-child input:after {
      display: none;
    }

    .seven_up_seven_down-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .seven_up_seven_down-footer input[type=submit] {
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
    html += '<p style="font-size:17px;">Below are some questions about behaviors that occur in the general population.<br>Using the scale below, select the number that best describes how often you experience these behaviors.<p>';

    // Begin form.
    html += '<form id="jspsych-survey-seven_up_seven_down">';

    // Initialize survey container.
    html += '<div class="seven_up_seven_down-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 7 == 0) {
        html += '<div class="seven_up_seven_down-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="seven_up_seven_down-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='seven_up_seven_down-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      index = [0,1,2,3];
      for (let j of index) {
        html += `<div class='seven_up_seven_down-resp'><input type="radio" name="seven_up_seven_down-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="seven_up_seven_down-footer"><input type="submit" id="jspsych-survey-seven_up_seven_down" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-seven_up_seven_down').addEventListener('submit', function(event) {

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
          "seven_up_seven_down": question_data
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
