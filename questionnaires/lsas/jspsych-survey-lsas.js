/**
 * jspsych-survey-lsas
 * a jspsych plugin for the LSAS
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
    // Define lsas questionnaire.
    //---------------------------------------//

    // Define lsas items.
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

    .lsas-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 50% 12.5% 12.5% 12.5% 12.5%;
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

    .lsas-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .lsas-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .lsas-prompt .subtext {
      font-size: smaller;
      font-weight: 600;
    }

    .lsas-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .lsas-resp input {
      position: relative;
    }

    .lsas-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 120px;
    }

    .lsas-resp:last-child input:after {
      display: none;
    }

    .lsas-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .lsas-footer input[type=submit] {
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
    html += '<form id="jspsych-survey-lsas">';

    // Add instructions.
    html += '<p style="font-size:16px; width: 80vw;">Fill out the following questionnaire with the most suitable answer for each item. Base your answers on your experience in the <b>past week.</b><p>';

    // Initialize survey container.
    html += '<div class="lsas-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 6 == 0) {
        html += '<div class="lsas-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="lsas-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='lsas-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [3,2,1,0];
      } else {
        var index = [0,1,2,3];
      }

      for (let j of index) {
        html += `<div class='lsas-resp'><input type="radio" name="lsas-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="lsas-footer"><input type="submit" id="jspsych-survey-lsas" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-lsas').addEventListener('submit', function(event) {

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
          "lsas": question_data
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
