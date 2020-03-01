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
      version: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Instrument version',
        default:  'Full',
        description: 'Specifies whether to run the 3-item, 8-item, or full (16-item) version.'
      }
    }
  }
  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define pswq questionnaire.
    //---------------------------------------//

    // Define pswq items
    var all_items = [

      "If I don't have enough time to do everything, I do not worry about it",                // Q1; included in full version
      "My worries overwhelm me",                                                              // Q2; included in 8-item and full version
      "I do not tend to worry about things",                                                  // Q3; to be reverse-scored; included in full version
      "Many situations make me worry",                                                        // Q4; included in 3-item, 8-item, and full version
      "I know I should not worry about things, but I just can't help it",                     // Q5; included in 8-item and full version
      "When I'm under pressure I worry a lot",                                                // Q6; included in 8-item and full version
      "I'm always worrying about something",                                                  // Q7; included in 8-item and full version
      "I find it easy to dismiss worrisome thoughts",                                         // Q8; to be reverse-scored; included in full version
      "As soon as I finish one task, I start to worry about everything else I have to do",    // Q9; included in 8-item and full version
      "I never worry about anything",                                                         // Q10; to be reverse-scored; included in full version
      "When there's nothing more I can do about a concern, I don't worry about it any more",  // Q11; to be reverse-scored; included in full version
      "I have been a worrier all my life",                                                    // Q12; included in 8-item and full version
      "I notice that I have been worrying about things",                                      // Q13; included in 8-item and full version
      "Once I start worrying, I can't stop",                                                  // Q14; included in 3-item and full version
      "I worry all the time",                                                                 // Q15; included in 3-item and full version
      "I worry about projects until they are done"                                            // Q16; included in full version

    ];

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
    for (i = 0; i < item_index.length; i++){
      items.push(all_items[item_index[i]])
    }

    // Define pswq response scale.
    var scale = [

       "Not at all<br>typical<br>of me",              // scored as 0
       "Not very<br>typical<br>of me",                // scored as 1
       "Somewhat<br>typical<br>of me",                // scored as 2
       "Fairly<br>typical<br>of me",                  // scored as 3
       "very<br>typical<br>of me"                     // scored as 4

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
    .pswq-container {
      margin: auto;
      width: 100%;
      display: grid;
      grid-template-columns: 40% 12% 12% 12% 12% 12%;
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

    .pswq-header {
      padding: 18px 0 0px 0;
      text-align: center;
      font-size: 13px;
      line-height: 1.15em;
    }

    .pswq-prompt {
      padding: 12px 0 12px 15px;
      text-align: left;
      font-size: 14px;
      line-height: 1.15em;
      justify-items: center;
    }

    .pswq-resp {
      padding: 12px 0 12px 0;
      font-size: 12px;
      text-align: center;
      line-height: 1.15em;
      justify-items: center;
    }

    .pswq-resp input {
      position: relative;
    }

    .pswq-resp input:after {
        display: block;
        content: " ";
        position: absolute;
        bottom: 6px;
        background: #d8dcd6;
        height: 2px;
        left: 13px;
        width: 96px;
    }

    .pswq-resp:last-child input:after {
      display: none;
    }

    .pswq-footer {
        margin: auto;
        top: 95%;
        width: 100%;
        padding: 0 0 0 0;
        background-color: #fff;
        text-align: right;
    }

    /* Style the submit button */
    .pswq-footer input[type=submit] {
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
    html += '<p style="font-size:17px;max-width:1000px;">Select the option that best describes how typical or characteristic each item is of you.</p>';

    // Begin form.
    html += '<form id="jspsych-survey-pswq">';

    // Initialize survey container.
    html += '<div class="pswq-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every eight items).
      if (i % 8 == 0) {
        html += '<div class="pswq-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="pswq-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='pswq-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      index = [0,1,2,3,4];
      for (let j of index) {
        html += `<div class='pswq-resp'><input type="radio" name="pswq-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="pswq-footer"><input type="submit" id="jspsych-survey-pswq" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-pswq').addEventListener('submit', function(event) {

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
          "pswq": question_data
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
