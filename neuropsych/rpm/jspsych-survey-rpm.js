/**
 * jspsych-survey-rpm
 * Sam Zorowitz
 *
 * plugin for running the Raven's progressive matrices
 *
 **/

jsPsych.plugins['survey-rpm'] = (function() {
  var plugin = {};

  plugin.info = {
    name: 'survey-rpm',
    description: '',
    parameters: {
      randomize_question_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize question order',
        default: false,
        description: 'If true, the order of the questions will be randomized'
      },
      randomize_option_order: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Randomize option order',
        default: true,
        description: 'If true, the order of the options will be randomized'
      },
      survey_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Survey duration',
        default: 360000,
        description: 'How long to show survey before it ends.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      }
    }
  }
  plugin.trial = function(display_element, trial) {

    // Plug-in setup
    var plugin_id_name = "jspsych-survey-rpm";
    var plugin_id_selector = '#' + plugin_id_name;
    var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }

    // ---------------------------------- //
    // Section 1: Define Prompts          //
    // ---------------------------------- //

    // Define prompts.
    const prompts = ['01','02','03','04','05','06','07','08','09'];

    // Define response options.
    const options = [
      ['01a','01b','01c','01d','01e','01f'],
      ['02a','02b','02c','02d','02e','02f'],
      ['03a','03b','03c','03d','03e','03f','03g','03h'],
      ['04a','04b','04c','04d','04e','04f','04g','04h'],
      ['05a','05b','05c','05d','05e','05f','05g','05h'],
      ['06a','06b','06c','06d','06e','06f','06g','06h'],
      ['07a','07b','07c','07d','07e','07f','07g','07h'],
      ['08a','08b','08c','08d','08e','08f','08g','08h'],
      ['09a','09b','09c','09d','09e','08f','09g','09h']
    ]

    // Define correct options.
    const correct = ['01e','02e','03h','04b','05e','06f','07g','08a','09b']

    // ---------------------------------- //
    // Section 2: Define HTML             //
    // ---------------------------------- //

    // Initialize HTML
    var html = "";

    // Insert CSS
    html += `<style>
    .survey-rpm-wrap {
      height: 100vh;
      width: 100vw;
    }
    .survey-rpm-prompt {
      position: relative;
      left: calc(50% - 200px);
      width: 400px;
      margin-bottom: 30px;
    }
    .survey-rpm-prompt img {
      position: relative;
      width: 400px;
      height: auto;
    }
    .survey-rpm-responses {
      display: grid;
      grid-template-rows: 50% 50%;
      grid-gap: 10px;
      position: relative;
      left: calc(50% - 300px);
      width: 600px;
      margin-bottom: 100px;
    }
    .survey-rpm-responses[items='6'] {
      grid-template-columns: 33% 33% 33%;
    }
    .survey-rpm-responses[items='8'] {
      grid-template-columns: 25% 25% 25% 25%;
    }
    .survey-rpm-responses .survey-rpm-option {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .survey-rpm-responses .survey-rpm-option label {
      position: relative;
      margin: 0 auto;
    }
    .survey-rpm-responses .survey-rpm-option label img {
      width: 100px;
      height: auto;
    }
    .survey-rpm-responses .survey-rpm-option label img:hover {
      opacity: 0.7;
    }
    .survey-rpm-responses .survey-rpm-option input[type='radio'] {
      position: relative;
      margin: 0 auto;
      width: 13px;
      height: 13px;
    }
    </style>`;

    // Add factory machine parts (back).
    html += '<div class="survey-rpm-wrap">';

    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';

    // Initialize form element
    html += '<form id="jspsych-survey-rpm-form">';

    // Randomize question order.
    var item_order = [];
    for (var i=0; i < prompts.length; i++) {
       item_order.push(i);
    }
    if (trial.randomize_question_order) {
       item_order = jsPsych.randomization.shuffle(item_order);
    }

    item_order.forEach( function(i) {

      // Insert prompt.
      html += '<div class="survey-rpm-prompt">';
      html += `<img src="../static/img/rpm_${prompts[i]}_top.png"></img>`;
      html += '</div>';

      // Randomize option order.
      var option_order = options[i];
      if (trial.randomize_option_order) {
         option_order = jsPsych.randomization.shuffle(option_order);
      }

      // Insert responses.
      html += `<div class="survey-rpm-responses" id="survey-rpm-${i}" items="${option_order.length}">`;
      for (var j=0; j < option_order.length; j++) {
        html += '<div class="survey-rpm-option">';
        html += `<label for="${option_order[j]}"><img src="../static/img/rpm_${option_order[j]}.png"></img></label>`;
        html += `<input type="radio" name="${prompts[i]}" id="${option_order[j]}" value="${option_order[j]}" required>`
        html += '</div>';
      }
      html += '</div>';

    })

    // add submit button
    html += '<input type="submit" id="'+plugin_id_name+'-next" class="'+plugin_id_name+' jspsych-btn"' + (trial.button_label ? ' value="'+trial.button_label + '"': '') + '"></input>';

    // End HTML
    html += '</form>';
    html += '</div></div>';

    // Display HTML
    display_element.innerHTML = html;

    // ---------------------------------- //
    // Section 2: jsPsych Functions       //
    // ---------------------------------- //

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    // Detect submit button press
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();
      end_trial();
    });

    // function to end trial when it is time
    var end_trial = function() {

      // Measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // Gather responses
      var responses = [];
      var num_errors = 0;
      for (var i=0; i<prompts.length; i++) {

        // Find checked option of matching question.
        var match = display_element.querySelector('#survey-rpm-'+i);
        var match = match.querySelector("input[type=radio]:checked");

        // Identify checked option.
        if(match == null) {
          var val = '-1';
        } else {
          var val = match.value;
        }

        // Store response
        responses.push(val)

        // Check accuracy
        if ( correct[i] != val ) {
          num_errors++;
        }

      }

      // store data
      var trial_data = {
        "responses": responses,
        "num_errors": num_errors,
        "rt": response_time
      };

      // clear html
      display_element.innerHTML += '';

      // next trial
      jsPsych.finishTrial(trial_data);

    }

    // end trial if trial_duration is set
    if (trial.survey_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.survey_duration);
    }

    var startTime = performance.now();
  };

  return plugin;
})();
