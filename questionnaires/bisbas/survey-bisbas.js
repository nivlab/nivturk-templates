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
    // Define BIS/BAS questionnaire.
    //---------------------------------------//

    // Define BIS/BAS items. Labels are per Pagliacco et al (2016)
    var items = [

      "I worry about making mistakes",                                                // BIS2
      "Criticism or scolding hurts me quite a bit",                                   // BIS3
      "I feel pretty worried or upset when I think or know somebody is angry at me",  // BIS4
      "I feel worried when I think I have done poorly at something important",        // BIS6
      "When I get something I want, I feel excited and energized",                    // RWD1
      "When I’m doing well at something I love to keep at it",                        // RWD2
      "It would excite me to win a contest",                                          // RWD4
      "When I see an opportunity for something I like I get excited right away",      // RWD5
      "When I want something I usually go all-out to get it",                         // DRIVE1
      "I go out of my way to get things I want",                                      // DRIVE2
      "If I see a chance to get something I want I move on it right away",            // DRIVE 3
      "When I go after something I use a no-holds-barred approach"                    // DRIVE4

    ];

    // Define bis_bas response scale.
    var scale = [

       "Very false<br>for me",               // scored as 1
       "Somewhat false<br>for me",           // scored as 2
       "Somewhat true<br>for me",            // scored as 3
       "Very true<br>for me"                 // scored as 4

     ];

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
    .bis_bas-container {
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

    .bis_bas-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .bis_bas-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .bis_bas-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .bis_bas-resp input {
      position: relative;
    }

    .bis_bas-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 96px;
    }

    .bis_bas-resp:last-child input:after {
      display: none;
    }

    .bis_bas-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .bis_bas-footer input[type=submit] {
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
    html += '<p style="font-size:17px;max-width:1000px;">Each item of this questionnaire is a statement that a person may either agree with or disagree with.  For each item, indicate how much you agree or disagree with what the item says.<br><br>Please be as accurate and honest as you can be. Respond to each item as if it were the only item. That is, don\'t worry about being \"consistent\" in your responses.</p>';

    // Begin form.
    html += '<form id="jspsych-survey-bis_bas">';

    // Initialize survey container.
    html += '<div class="bis_bas-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every six items).
      if (i % 6 == 0) {
        html += '<div class="bis_bas-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="bis_bas-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='bis_bas-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      index = [0,1,2,3];
      for (let j of index) {
        html += `<div class='bis_bas-resp'><input type="radio" name="bis_bas-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="bis_bas-footer"><input type="submit" id="jspsych-survey-bis_bas" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-bis_bas').addEventListener('submit', function(event) {

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
          "bis_bas": question_data
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
