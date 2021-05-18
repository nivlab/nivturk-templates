//------------------------------------//
// Define parameters.
//------------------------------------//

// Define test form.
const test_form = 1;              // Available [1,2]

// Define timing parameters.
const trial_duration = 30000;     // 30 seconds

// Define image directory.
const img_dir = '../static/img';

//------------------------------------//
// Define RPM instructions.
//------------------------------------//

var rpm_instructions = {
  type: 'instructions',
  pages: [
    "<p>We are beginning the <b>puzzle task</b>.</p><p>In this task, you will be shown a series of puzzles. For each puzzle, your goal is to<br>identify the missing piece from the options appearing below the puzzle.</p>",
    '<p>There are 9 puzzles in total. You will have <b>30 seconds</b> for each puzzle.</p><p>Try to be as accurate as possible. If you cannot solve the puzzle then you should guess.<br>You will not be penalized for an incorrect answer.</p><p>Press the "next" button to get started.</p>'
  ],
  show_clickable_nav: true,
  button_label_previous: 'Prev',
  button_label_next: 'Next',
}

//------------------------------------//
// Define RPM task.
//------------------------------------//

// Define test forms.
if ( test_form == 1 ) {

  // Define task timeline
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

  // Define images to preload
  var preload_images = [
    img_dir + '/a11.png',
    img_dir + '/a24.png',
    img_dir + '/a28.png',
    img_dir + '/a36.png',
    img_dir + '/a43.png',
    img_dir + '/a48.png',
    img_dir + '/a49.png',
    img_dir + '/a53.png',
    img_dir + '/a55.png',
    [...Array(6).keys()].map(i => img_dir + '/a11_' + (i+1) + '.png'),
    [...Array(6).keys()].map(i => img_dir + '/a24_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a28_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a36_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a43_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a48_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a49_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a53_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/a55_' + (i+1) + '.png')
  ];

} else if (test_form == 2) {

  // Define task timeline
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

  // Define images to preload
  var preload_images = [
    img_dir + '/b10.png',
    img_dir + '/b16.png',
    img_dir + '/b21.png',
    img_dir + '/b30.png',
    img_dir + '/b34.png',
    img_dir + '/b44.png',
    img_dir + '/b50.png',
    img_dir + '/b52.png',
    img_dir + '/b57.png',
    [...Array(6).keys()].map(i => img_dir + '/b10_' + (i+1) + '.png'),
    [...Array(6).keys()].map(i => img_dir + '/b16_' + (i+1) + '.png'),
    [...Array(6).keys()].map(i => img_dir + '/b21_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/b30_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/b34_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/b44_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/b50_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/b52_' + (i+1) + '.png'),
    [...Array(8).keys()].map(i => img_dir + '/b57_' + (i+1) + '.png'),
  ];

} else {
  throw 'test form "' + test_form + '" is not valid.'
}

var rpm_task = {
  type: 'rpm',
  countdown: true,
  randomize_choice_order: true,
  trial_duration: trial_duration,
  timeline: rpm_info,
  data: {test_form: test_form}
}

//------------------------------------//
// Define RPM scoring.
//------------------------------------//

var dot_product = function(x, y) {
  var sum = 0;
  for (let i = 0; i < x.length; i++) { sum += x[i] * y[i]; }
  return sum;
}

var score_rpm = function() {

  // Summarize RPM.
  const rpm_raw = jsPsych.data.get().filter({trial_type: 'rpm'}).select('accuracy').sum();
  const rpm_err = 9 - rpm_raw;
  const rpm_rt = jsPsych.data.get().filter({trial_type: 'rpm'}).select('rt').sum();

  // Fetch accuracy.
  var accuracy = jsPsych.data.get().filter({trial_type: 'rpm'}).select('accuracy').values;
  var errors = accuracy.map(x => 1 - x);

  // Score RPM (Bilker et al. 2012).
  if (test_form == 1) {
    const weights = [0.198,0.216,0.237,0.142,0.374,0.304,0.178,0.458,0.289];
    var rpm_adj = 60 - (rpm_err + Math.exp(1.323 + dot_product(errors, weights)));
  } else if (test_form == 2) {
    const weights = [0.168,0.212,0.247,0.189,0.203,0.135,0.243,0.316,0.193];
    var rpm_adj = 60 - (rpm_err + Math.exp(1.875 + dot_product(errors, weights)));
  }

  return {rpm_raw: rpm_raw, rpm_err: rpm_err, rpm_adj:rpm_adj, rpm_rt: rpm_rt};
}

var rpm_score = {
  type: 'call-function',
  func: score_rpm
}

//------------------------------------//
// Define RPM block
//------------------------------------//

var RPM = {
  timeline: [rpm_instructions, rpm_task, rpm_score]
}
