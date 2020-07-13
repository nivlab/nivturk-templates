/**
 * jspsych-survey-audit
 *
 */

jsPsych.plugins['survey-audit'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'survey-audit',
    description: '',
    parameters: {
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
    // Define survey HTML.
    //---------------------------------------//

    // Initialize HTML
    var html = '';

    // Inject CSS
    html += `<style>
    .audit-header {
      margin: auto;
      top: 5%;
      width: 80vw;
      padding: 0 0 0 0;
      background-color: #fff;
      font-size: 90%;
      text-align: center;
    }
    input[type="radio"] {
      margin: 0 6px 0 0;
    }
    label {
      padding: 0 16px 0 20px;
      display: inline-block;
    }
    .audit-container {
      margin: auto;
      width: 80vw;
      background-color: #F8F8F8;
      padding: 5px 0 5px 15px;
      border-radius: 5px;
    }
    .audit-prompt {
      float: left;
      width: 50%;
      margin-top: 6px;
      margin-bottom: 6px;
      font-size: 90%;
      text-align: left;
    }
    .audit-resp {
      float: left;
      width: 50%;
      margin-top: 6px;
      margin-bottom: 6px;
      font-size: 85%;
      text-align: left;
    }
    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    .audit-footer {
      margin: auto;
      top: 95%;
      width: 100%;
      padding: 0 0 0 0;
      background-color: #fff;
      text-align: right;
    }
    .audit-footer input[type=submit] {
      background-color: #F0F0F0;
      color: black;
      padding: 8px 20px;
      border: none;
      border-radius: 4px;
      float: right;
      margin-top: 2px;
      margin-right: 0px;
      margin-bottom: 20px;
    }
    @media screen and (max-width: 600px) {
      .audit-prompt, .audit-resp, input[type=submit] {
        width: 100%; margin-top: 0;
      }
    };
    </style>`;

    // Add header
    html += `
    <div class=audit-header>
        <p>Because alcohol use can affect your health and can interfere with certain medications and treatments, it is important that we ask some questions about your use of alcohol. Please choose the option that best describes your answer to each question.</p>
    </div>`

    // Begin form
    html += '<form id="jspsych-survey-audit">'

    // Add AUDIT
    html += '<div class="audit-container">';

    // Add item #1
    html += '<div class="row">';
    html += '<div class="audit-prompt"><label for="Q01">How often do you have a drink containing alcohol?</label></div>';
    html += '<div class="audit-resp">';
    html += '<label><input type="radio" name="Q01" value="0" required>Never</label><br>';
    html += '<label><input type="radio" name="Q01" value="1" required>Monthly or less</label><br>';
    html += '<label><input type="radio" name="Q01" value="2" required>2-4 times a month</label><br>';
    html += '<label><input type="radio" name="Q01" value="3" required>2-3 times a week</label><br>';
    html += '<label><input type="radio" name="Q01" value="4" required>4 or more times a week</label>';
    html += '</div></div><hr color="#fff">';

    // Add item #2
    html += '<div class="row">';
    html += '<div class="audit-prompt"><label for="Q02">How many drinks containing alcohol do you have on a typical day when you are drinking?</label></div>';
    html += '<div class="audit-resp">';
    html += '<label><input type="radio" name="Q02" value="0" required>1 or 2</label><br>';
    html += '<label><input type="radio" name="Q02" value="1" required>3 or 4</label><br>';
    html += '<label><input type="radio" name="Q02" value="2" required>5 or 6</label><br>';
    html += '<label><input type="radio" name="Q02" value="3" required>7 to 9</label><br>';
    html += '<label><input type="radio" name="Q02" value="4" required>10 or more</label>';
    html += '</div></div><hr color="#fff">';

    // Add items #3-8.
    items = [
      "How often do you have six or more drinks on one occasion?",
      "How often during the last year have you found that you were not able to stop drinking once you had started?",
      "How often during the last year have you failed to do what was normally expected from you because of drinking?",
      "How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
      "How often during the last year have you had a feeling of guilt or remorse after drinking?",
      "How often during the last year have you been unable to remember what happened the night before because you had been drinking?"
    ]

    for (var i = 0; i < items.length; i++) {
      const qid = ("0" + `${i+3}`).slice(-2);
      html += '<div class="row">';
      html += `<div class="audit-prompt"><label for="Q${qid}">${items[i]}</label></div>`;
      html += '<div class="audit-resp">';
      html += `<label><input type="radio" name="Q${qid}" value="0" required>Never</label><br>`;
      html += `<label><input type="radio" name="Q${qid}" value="1" required>Less than monthly</label><br>`;
      html += `<label><input type="radio" name="Q${qid}" value="2" required>Monthly</label><br>`;
      html += `<label><input type="radio" name="Q${qid}" value="3" required>Weekly</label><br>`;
      html += `<label><input type="radio" name="Q${qid}" value="4" required>Daily or almost daily</label>`;
      html += '</div></div><hr color="#fff">';
    }

    // Add items #9-10.
    items = [
      "Have you or someone else been injured as a result of your drinking?",
      "Has a relative or friend or a doctor or another health worker been concerned about your drinking or suggested you cut down?"
    ]

    for (var i = 0; i < items.length; i++) {
      const qid = ("0" + `${i+9}`).slice(-2);
      html += '<div class="row">';
      html += `<div class="audit-prompt"><label for="Q${qid}">${items[i]}</label></div>`;
      html += '<div class="audit-resp">';
      html += `<label><input type="radio" name="Q${qid}" value="0" required>No</label><br>`;
      html += `<label><input type="radio" name="Q${qid}" value="2" required>Yes, but not in the last year</label><br>`;
      html += `<label><input type="radio" name="Q${qid}" value="4" required>Yes, during the last year</label>`;
      html += '</div></div>';
      if (i == 0) { html += '<hr color="#fff">'; }
    }

    // End form
    html += '</div>';

    // Add submit button
    html += `
    <div class="audit-footer">
        <input type="submit" id="jspsych-survey-audit-next" class="jspsych-btn jspsych-survey-audit" value="${trial.button_label}"></input>
    </div>`;

    // End form
    html += '</form>'

    // Display HTML
    display_element.innerHTML = html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    // Scroll to top of screen.
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    // Preallocate space.
    var key_events = [];
    var mouse_events = [];
    var radio_events = [];

    // Add event listener.
    document.addEventListener("click", function(event){
      const response_time = performance.now() - startTime
      if (event.screenX > 0) {
        mouse_events.push( response_time );
      } else {
        key_events.push( response_time );
      }
      if (event.target.type == "radio") {
        radio_events.push( response_time )
      }
    });

    display_element.querySelector('#jspsych-survey-audit').addEventListener('submit', function(event) {

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
          "radio_events": radio_events,
          "key_events": key_events,
          "mouse_events": mouse_events,
          "responses": question_data
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
