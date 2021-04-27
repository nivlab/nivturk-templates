/**
 * jspsych-spatial-recall
 * Sam Zorowitz
 *
 * plugin for running one trial of a spatial recall task
 *
 **/

jsPsych.plugins["spatial-recall"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'spatial-recall',
    description: '',
    parameters: {
      sequence: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Sequence',
        array: true,
        description: 'The sequence for the participant to learn (0-indexed).'
      },
      backwards: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Backwards',
        default: false,
        description: 'If participant should report sequence in backwards order.'
      },
      grid_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Grid size',
        default: 4,
        description: 'The number of tiles in each grid row/column.'
      },
      tile_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Tile size',
        default: 64,
        description: 'The size of each grid tile (in pixels).'
      },
      tile_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Tile duration',
        default: 750,
        description: 'How long to show a tile.'
      },
      iti_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ITI duration',
        default: 250,
        description: 'How long between tile presentations.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: 500,
        description: 'How long to hide the stimulus.'
      },
      response_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Response duration',
        default: null,
        description: 'How long to collect responses.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // Error-catching: assert all elements in sequence are valid
    if ( Math.min(...trial.sequence) < 0 || Math.max(...trial.sequence) > trial.grid_size**2 ) {
      throw '"element of `trial.sequence` outside of grid"';
    }

    // ---------------------------------- //
    // Section 1: Define HTML             //
    // ---------------------------------- //

    // Define HTML
    var new_html = '';

    // Insert CSS
    new_html += `<style>
    .spatial-container {
      height: 100vh;
      width: 100vw;
    }
    .spatial-container[status='hide'] {

      /* Hide cursor during sequence presentation */
      cursor: none;

    }
    .spatial-grid {

      /* Grid position */
      position: absolute;
      left: 50%;
      top: 45%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);

      /* Grid layout */
      display: grid;
      grid-template-columns: repeat(${trial.grid_size}, calc(100% / ${trial.grid_size}));
      grid-template-rows: repeat(${trial.grid_size}, calc(100% / ${trial.grid_size}));

      /* Grid border */
      border: 1px solid black;

    }
    .spatial-grid[status='hide'] {

      /* Prevent cursor events during sequence presentation */
      pointer-events: none;

    }
    .spatial-grid[status='complete'] {

      /* Prevent cursor events after maximum number of entries reached */
      cursor: not-allowed;

    }
    .spatial-grid .spatial-grid-tile {

      /* Grid tile size */
      height: ${trial.tile_size}px;
      width: ${trial.tile_size}px;

      /* Grid tile border */
      border: 1px solid black;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;

    }
    .spatial-grid .spatial-grid-tile:hover {

      /* Highlight tile on hover event */
      background-color: #0198E180;

    }
    .spatial-grid .spatial-grid-tile:active {

      /* Highlight tile on click event */
      background-color: #0198E1;

    }
    .spatial-grid .spatial-grid-tile[status='fill'] {

      /* Highlight tile during sequence */
      background-color: #0198E1;

    }
    .spatial-grid[status='complete'] .spatial-grid-tile {

      /* Prevent cursor events after maximum number of entries reached */
      pointer-events: none;

    }
    .spatial-header {

      /* Header position */
      position: absolute;
      left: calc(50%);
      top: calc(45% - ${trial.tile_size}px * ${trial.grid_size} / 2);
      -webkit-transform: translate3d(-50%, -100%, 0);
      transform: translate3d(-50%, -100%, 0);

      /* Header font */
      font-size: 24px;
      line-height: 1.4;
      text-align: center;

    }
    .spatial-header[status='hide'] {

      /* Hide element during sequence presentation */
      display: none;

    }
    .spatial-entry-bar {

      /* Bar position */
      position: absolute;
      left: calc(50% - ${trial.tile_size}px * ${trial.grid_size} / 2 );
      top: calc(45% + ${trial.tile_size}px * ${trial.grid_size} / 2 + 5px);

      /* Bar size */
      width: calc(20px * ${trial.sequence.length});
      height: 20px;

      /* Bar layout */
      display: grid;
      grid-template-columns: repeat(${trial.sequence.length}, calc(100%/${trial.sequence.length}));
      grid-template-rows: 100%;

    }
    .spatial-entry-bar[status='hide'] {

      /* Hide element during sequence presentation */
      display: none;

    }
    .spatial-entry-bar .entry {

      /* Entry indicator size */
      height: 18px;
      width: 18px;

      /* Entry indicator border */
      border: 1px solid grey;
      border-radius: 50%;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;

    }
    .spatial-entry-bar .entry[status='fill'] {

      /* Highlight entry after response given */
      background: #0198E180;

    }
    button[action='clear'], button[action='submit'] {

      /* Button position */
      position: absolute;
      top: calc(45% + ${trial.tile_size}px * ${trial.grid_size} / 2 + 50px);

      /* Button size */
      width: 90px;

      /* Button aesthetics */
      background: #FFFFFF;
      padding: 4px 12px;

      /* Button border */
      border: 1px solid #CCCCCC;
      border-radius: 4px;

      /* Button font */
      font-size: 17px;
      line-height: 1.4;
      text-align: center;

    }
    button[action='clear'] {
      left: calc(50% - ${trial.tile_size}px * ${trial.grid_size} / 2);
    }
    button[action='submit'] {
      right: calc(50% - ${trial.tile_size}px * ${trial.grid_size} / 2);
    }
    button[action='clear']:hover, button[action='submit']:hover {

      /* Highlight button on hover event */
      background: #F5F5F5;
    }
    button[action='clear'][status='hide'], button[action='submit'][status='hide'] {

      /* Hide element during sequence presentation */
      display: none;
      
    }
    </style>`;

    // Open task container.
    new_html += '<div class="spatial-container" id="spatial-container">';

    // Add spatial recall header.
    new_html += '<div class="spatial-header" id="header">';
    new_html += '<p>RECALL' + (trial.backwards ? '<small><br>(BACKWARDS)</small>' : '') + '</p>';
    new_html += '</div>';

    // Add spatial recall grid.
    new_html += '<div class="spatial-grid" id="spatial-grid">';
    for (let i = 0; i < trial.grid_size**2; i++) {
      new_html += `<div class="spatial-grid-tile" id="tile-${i}" data-choice=${i}></div>`;
    }
    new_html += '</div>';

    // Add spatial recall entry indicators.
    new_html += '<div class="spatial-entry-bar" id="entry-bar">';
    for (let i = 0; i < trial.sequence.length; i++) {
      new_html += `<div class="entry" id="entry-${i}"></div>`;
    }
    new_html += '</div>';

    // Add buttons.
    new_html += '<button type="button" id="clear" action="clear">Clear</button>';
    new_html += '<button type="button" id="submit" action="submit">Submit</button>';

    // Close task container.
    new_html += '</div">';

    // Display HTML.
    display_element.innerHTML = new_html;

    // Add event listeners to tiles
    for (let i = 0; i < trial.grid_size**2; i++) {
      display_element.querySelector('#tile-' + i).addEventListener('click', function(e){
        var choice = e.currentTarget.getAttribute('data-choice');
        after_response(choice);
      });
    };

    // Add event listeners to buttons
    display_element.querySelector('#clear').addEventListener('click', function(e){
      clear_responses();
    });
    display_element.querySelector('#submit').addEventListener('click', function(e){
      end_trial();
    });

    // ---------------------------------- //
    // Section 2: Sequence presentation   //
    // ---------------------------------- //

    // function to toggel display elements
    function toggle_elements(status) {

        // Hide elements
        display_element.querySelector('#header').setAttribute('status', status);
        display_element.querySelector('#entry-bar').setAttribute('status', status);
        display_element.querySelector('#clear').setAttribute('status', status);
        display_element.querySelector('#submit').setAttribute('status', status);

        // Hide cursor
        display_element.querySelector('#spatial-container').setAttribute('status', status);

        // Hide mouse events
        display_element.querySelector('#spatial-grid').setAttribute('status', status);

    }

    // function to display sequence to participant
    function present_sequence(trial) {

      // hide elements
      toggle_elements('hide');

      // define epoch time
      const epoch = trial.tile_duration + trial.iti_duration;

      // define presentation event times
      trial.sequence.forEach((j, i) => {

        // highlight tile
        jsPsych.pluginAPI.setTimeout(function() {
          display_element.querySelector('#tile-' + j).setAttribute('status', 'fill');
        }, trial.stimulus_duration + epoch * i);

        // clear tile
        jsPsych.pluginAPI.setTimeout(function() {
          display_element.querySelector('#tile-' + j).setAttribute('status', '');
        }, trial.stimulus_duration + epoch * i + trial.tile_duration);

      });

      // start response phase
      jsPsych.pluginAPI.setTimeout(function() {

        // unhide elements
        toggle_elements('');

        // record start time
        start_time = performance.now();

        // end trial if time limit is set
        if (trial.response_duration !== null) {
          jsPsych.pluginAPI.setTimeout(function() {
            end_trial();
          }, trial.response_duration);
        }

      }, trial.stimulus_duration + epoch * trial.sequence.length);

    }

    // present sequence
    var start_time = performance.now();
    present_sequence(trial);

    // ---------------------------------- //
    // Section 3: Response handling       //
    // ---------------------------------- //

    // initialize response
    var responses = [];

    // function to handle responses by the subject
    function after_response(choice) {

      // store response
      responses.push( parseInt(choice) );

      // update entry indicators
      for (let i = 0; i<Math.min(responses.length, trial.sequence.length); i++) {
        display_element.querySelector('#entry-' + i).setAttribute('status', 'fill');
      }

      // update cursor (if maximum number of entries)
      if (responses.length >= trial.sequence.length) {
        display_element.querySelector('#spatial-grid').setAttribute('status', 'complete');
      }

    };

    // function to clear current responses
    function clear_responses() {

      // update entry indicators
      for (let i = 0; i<Math.min(responses.length, trial.sequence.length); i++) {
        display_element.querySelector('#entry-' + i).setAttribute('status', '');
      }

      // update cursor
      if (responses.length >= trial.sequence.length) {
        display_element.querySelector('#spatial-grid').setAttribute('status', '');
      }

      // clear repsonses
      responses = [];

    }

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // measure response time
      var end_time = performance.now();
      var rt = end_time - start_time;

      // gather the data to store for the trial
      var trial_data = {
        sequence: trial.sequence,
        responses: responses,
        rt: rt
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

  };

  return plugin;
})();
