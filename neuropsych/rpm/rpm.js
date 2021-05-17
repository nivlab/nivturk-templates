//------------------------------------//
// Define parameters.
//------------------------------------//

// Define test form.
const test_form = 2;              // Available [1,2]

// Define timing parameters.
const trial_duration = 30000;     // 30 seconds

// Define image directory.
const img_dir = '../static/img';

//------------------------------------//
// Define RPM instructions.
//------------------------------------//

// Raven's progressive matrices instructions
var rpm_instructions = {
  type: 'instructions',
  pages: [
    "<h3>PUZZLE TASK</h3><p style='width: 60vw; text-align: center'>On the next page, you will be presented with 9 puzzles. For each puzzle, your task is to <b>identify the missing piece</b> from the options appearing below the puzzle.</p><p style='width: 60vw; text-align: center'>You will have <b>6 minutes</b> to complete the task. Not everyone finishes in time<br>or answers every question correctly - just do the best you can.</p><p>Click next to start the task.</p>"
  ],
  show_clickable_nav: true,
  button_label_previous: 'Prev',
  button_label_next: 'Next',
  on_finish: function(trial) {
    pass_message('starting rpm');
  }
}

//------------------------------------//
// Define RPM task.
//------------------------------------//

// Define test forms.
if ( test_form == 1 ) {

  var rpm_info = [
    {
      stimulus: img_dir + '/a11.png',
      choices: [...Array(6).keys()].map(i => img_dir + '/a11_' + (i+1) + '.png'),
      correct: 4,
      col_wrap: 3
    },
    {
      stimulus: img_dir + '/a24.png',
      choices: [...Array(6).keys()].map(i => img_dir + '/a24_' + (i+1) + '.png'),
      correct: 4,
      col_wrap: 3
    },
    {
      stimulus: img_dir + '/a28.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a28_' + (i+1) + '.png'),
      correct: 7,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/a36.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a36_' + (i+1) + '.png'),
      correct: 1,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/a43.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a43_' + (i+1) + '.png'),
      correct: 4,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/a48.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a48_' + (i+1) + '.png'),
      correct: 5,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/a49.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a49_' + (i+1) + '.png'),
      correct: 6,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/a53.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a53_' + (i+1) + '.png'),
      correct: 0,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/a55.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/a55_' + (i+1) + '.png'),
      correct: 1,
      col_wrap: 4
    },
  ]

} else if (test_form == 2) {

  var rpm_info = [
    {
      stimulus: img_dir + '/b10.png',
      choices: [...Array(6).keys()].map(i => img_dir + '/b10_' + (i+1) + '.png'),
      correct: 2,
      col_wrap: 3
    },
    {
      stimulus: img_dir + '/b16.png',
      choices: [...Array(6).keys()].map(i => img_dir + '/b16_' + (i+1) + '.png'),
      correct: 1,
      col_wrap: 3
    },
    {
      stimulus: img_dir + '/b21.png',
      choices: [...Array(6).keys()].map(i => img_dir + '/b21_' + (i+1) + '.png'),
      correct: 3,
      col_wrap: 3
    },
    {
      stimulus: img_dir + '/b30.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/b30_' + (i+1) + '.png'),
      correct: 3,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/b34.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/b34_' + (i+1) + '.png'),
      correct: 5,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/b44.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/b44_' + (i+1) + '.png'),
      correct: 3,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/b50.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/b50_' + (i+1) + '.png'),
      correct: 5,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/b52.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/b52_' + (i+1) + '.png'),
      correct: 1,
      col_wrap: 4
    },
    {
      stimulus: img_dir + '/b57.png',
      choices: [...Array(8).keys()].map(i => img_dir + '/b57_' + (i+1) + '.png'),
      correct: 0,
      col_wrap: 4
    },
  ]

} else {
  throw 'test form "' + test_form + '" is not valid.'
}

var rpm_task = {
  type: 'rpm',
  countdown: true,
  randomize_choice_order: false,
  trial_duration: null,
  timeline: rpm_info,
  data: {test_form: test_form}
}

//------------------------------------//
// Define quality check.
//------------------------------------//

var score_rpm = function() {

  // Get completion time.
  var rt = jsPsych.data.get().filter({survey: 'rpm'}).select('rt').values[0] / 1000.;

  // Score completion time.
  if (rt < 15) {
    low_quality = true;
  } else {
    low_quality = false;
  }

  return low_quality;
}

var rpm_score = {
  type: 'call-function',
  func: score_rpm,
  on_finish: function(trial) {
    low_quality = jsPsych.data.getLastTrialData().values()[0].value;
  }
}

//------------------------------------//
// Define RPM block
//------------------------------------//

var RPM = {
  timeline: [rpm_instructions, rpm_task, rpm_score]
}
