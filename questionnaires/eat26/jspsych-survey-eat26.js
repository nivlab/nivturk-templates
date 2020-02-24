/**
 * jspsych-survey-eat26
 * a jspsych plugin for the eat26
 */

jsPsych.plugins['survey-eat26'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-eat26',
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
    // Define eat26 questionnaire.
    //---------------------------------------//

    // Define eat26 items.
    var items = [
      "Am terrified about being overweight.",
      "Avoid eating when I am hungry.",
      "Find myself preoccupied with food.",
      "Have gone on eating binges where I feel that I may not have be able to stop.",
      "Cut my food into small pieces.",
      "Aware of the calorie content of foods that I eat",
      "Particularly avoid food with a high carbohydrate content (i.e. bread, rice, potatoes, etc.)",
      "Feel that others would prefer if I ate more.",
      "Vomit after I have eaten.",
      "Feel extremely guilty after eating.",
      "Am preoccupied with a desire to be thinner.",
      "Think about burning up calories when I exercise.",
      "Other people think that I am too thin.",
      "Am preoccupied with the htought of having fat on my body.",
      "Take longer than others to eat my meals.",
      "Avoid foods with sugar in them.",
      "Eat diet foods.",
      "Feel that food controls my life.",
      "Display self-control around food.",
      "Feel that others pressure me to eat.",
      "Give too much time and thought to food.",
      "Feel uncomfortable after eating sweets.",
      "Engage in dieting behavior.",
      "Like my stomach to be empty.",
      "Have the impult to vomit after meals.",
      "Enjoy trying new rich foods."
    ];

    // Define eat26 response scale.
    var scale = ["Never", "Rarely", "Sometimes", "Often", "Usually", "Always"]

   // Define reverse scoring.
   var reverse = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true];

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

    .eat26-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 50% 8% 8% 8% 8% 8% 8%;
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

    .eat26-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .eat26-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .eat26-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .eat26-resp input {
      position: relative;
    }

    .eat26-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 80px;
    }

    .eat26-resp:last-child input:after {
      display: none;
    }

    .eat26-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .eat26-footer input[type=submit] {
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
    html += '<form id="jspsych-survey-eat26">';

    // Add instructions.
    html += '<p style="font-size:16px; width: 80vw;">Please fill out the below form as accurately, honestly and completely as possible. There are no right or wrong answers.<p>';

    // Initialize survey container.
    html += '<div class="eat26-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 7 == 0) {
        html += '<div class="eat26-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="eat26-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='eat26-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [3,2,1,0,0,0];
      } else {
        var index = [0,0,0,1,2,3];
      }

      for (let j of index) {
        html += `<div class='eat26-resp'><input type="radio" name="eat26-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="eat26-footer"><input type="submit" id="jspsych-survey-eat26" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-eat26').addEventListener('submit', function(event) {

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
          "eat26": question_data
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
