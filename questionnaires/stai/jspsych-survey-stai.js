/**
 * jspsych-survey-stai
 * a jspsych plugin for the state trait anxiety inventory
 */

jsPsych.plugins['survey-stai'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-stai',
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
    // Define STAI questionnaire.
    //---------------------------------------//

    // Define STAI items.
    var items = [
      "I feel pleasant.",
      "I feel nervous and restless.",
      "I feel satisfied with myself.",
      "I wish I could be as happy as others seem to be.",
      "I feel like a failure.",
      "I feel rested.",
      "I am 'calm, cool, and collected'.",
      "I feel that difficulties are piling up so that I cannot overcome them.",
      "I worry too much over something that doesn't really matter.",
      "I am happy.",
      "I have disturbing thoughts.",
      "I lack self-confidence.",
      "I feel secure.",
      "I make decisions easily.",
      "I feel inadequate.",
      "I am content.",
      "Some unimportant thought runs through my mind and bothers me.",
      "I take disappointments so keenly that I can't put them out of my mind.",
      "I am a steady person.",
      "I get in a state of tension or turmoil as I think over my recent concerns and interest."
    ];

    // Define STAI response scale.
    var scale = ["Almost<br>never",
                 "<br>Sometimes",
                 "<br>Often",
                 "Almost<br>always"];

   // Define reverse scoring.
   var reverse = [true, false, true, false, false, true, true, false, false, true,
                  false, false, true, true, false, true, false, false, true, false];

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

    // Add instructions.
    html += '<p style="font-size:17px;">Read each statement and then choose the answer to indicate how you generally feel.<p>';

    // Begin form.
    html += '<form id="jspsych-survey-stai">';

    // Initialize survey container.
    html += '<div class="stai-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every five items).
      if (i % 5 == 0) {
        html += '<div class="stai-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="stai-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='stai-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [4,3,2,1];
      } else {
        var index = [1,2,3,4];
      }

      for (let j of index) {
        html += `<div class='stai-resp'><input type="radio" name="STAI-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="stai-footer"><input type="submit" id="jspsych-survey-stai" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-stai').addEventListener('submit', function(event) {

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
          "stai": question_data
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
