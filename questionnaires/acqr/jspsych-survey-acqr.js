/**
 * jspsych-survey-acqr
 * a jspsych plugin for the ACQ-R
 */

jsPsych.plugins['survey-acqr'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-acqr',
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
    // Define acqr questionnaire.
    //---------------------------------------//

    // Define acqr items.
    var items = [
      "I can usually put worrisome thoughts out of my mind easily.",
      "I am able to control my level of anxiety.",
      "I can usually relax when I want.",
      "I am unconcerned if I become anxious in a difficult situation, because I am confident in my ability to cope with my symptoms.",
      "When I am anxious, I find it hard to focus on anything other than my anxiety.",
      "When I am frightened by something, there is generally nothing I can do.",
      "Whether I can successfully escape a frightening situation is always a matter of chance with me.",
      "There is little I can do to change frightening events.",
      "The extent to which a difficult situation resolves itself has nothing to do with my actions.",
      "If something is going to hurt me, it will happen no matter what I do.",
      "Most events that make me anxious are outside my control.",
      "How well I cope with difficult situations depends on whether I have outside help.",
      "When I am put under stress, I am likely to lose control.",
      "When I am under stress, I am not always sure how I will react.",
      "I usually find it hard to deal with difficult problems."
    ];

    // Define acqr response scale.
    var scale = ["Strongly<br>Disagree",
                 "Moderately<br>Disagree",
                 "Slightly<br>Disagree",
                 "Slightly<br>Agree",
                 "Moderately<br>Agree",
                 "Strongly<br>Agree"]

   // Define reverse scoring.
   var reverse = [false, false, false, false, true, true, true, true, true, true,
                  true, true, true, true, true];

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
    html += '<p style="font-size:17px;">Please read each statement below carefully and indicate how much you think each statement is typical of you.<p>';

    // Begin form.
    html += '<form id="jspsych-survey-acqr">';

    // Initialize survey container.
    html += '<div class="acqr-container">';

    // Iteratively add items.
    for (var i = 0; i < items.length; i++) {

      // Add response headers (every seven items).
      if (i % 5 == 0) {
        html += '<div class="acqr-header"></div>';
        for (var j = 0; j < scale.length; j++) {
          html += `<div class="acqr-header">${scale[j]}</div>`;
        }
      }

      // Initialize row.
      html += '<div class="row-wrapper">';

      // Define item number.
      var num = ("0" + `${item_order[i]}`).slice(-2);

      // Display prompt.
      html += `<div class='acqr-prompt'>${items[item_order[i]]}</div>`;

      // Display responses.
      if ( reverse[item_order[i]] ) {
        var index = [5,4,3,2,1,0];
      } else {
        var index = [0,1,2,3,4,5];
      }

      for (let j of index) {
        html += `<div class='acqr-resp'><input type="radio" name="acqr-Q${num}" value="${j}" required></div>`;
      }

      // End row.
      html += '</div>';

    }

    // End survey container.
    html += '</div>';

    // Add submit button
    html += `<div class="acqr-footer"><input type="submit" id="jspsych-survey-acqr" value="${trial.button_label}"></input></div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    display_element.querySelector('#jspsych-survey-acqr').addEventListener('submit', function(event) {

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
          "acqr": question_data
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
