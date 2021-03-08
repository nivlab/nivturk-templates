//---------------------------------------//
// Define parameters.
//---------------------------------------//

// Define item set.
const item_set = 1;               // Available [1,2,3]

// Define test form.
const test_form = 1;              // Available [1,2,3]

// Define distractor set.
const distractor = 'md';          // Available [md, pd]

// Define timing parameters.
const block_duration = 480000;    // 8 minutes
const trial_duration = 30000;     // 30 seconds

//---------------------------------------//
// Define MARS task.
//---------------------------------------//

// Define path to stimuli.
const img_path = '../static/img/is' + item_set + '/tf' + test_form + '/';

// Define stimulus set order.
if ( test_form == 1 ) {
  var ss = [3,1,2];
} else if ( test_form == 2 ) {
  var ss = [2,3,1];
} else if ( test_form == 3 ) {
  var ss = [1,2,3];
}

// Initialize timeline.
var MARS = [];

// Iteratively
for (let i = 0; i < 80; i++) {

  // Define trial.
  const trial = {
    type: 'mars',
    stimulus: img_path + `tf${test_form}_${i+1}_M_ss${ss[i%3]}.jpeg`,
    choices: [
      img_path + `tf${test_form}_${i+1}_T1_ss${ss[i%3]}_${distractor}.jpeg`,
      img_path + `tf${test_form}_${i+1}_T2_ss${ss[i%3]}_${distractor}.jpeg`,
      img_path + `tf${test_form}_${i+1}_T3_ss${ss[i%3]}_${distractor}.jpeg`,
      img_path + `tf${test_form}_${i+1}_T4_ss${ss[i%3]}_${distractor}.jpeg`,
    ],
    correct: 0,
    countdown: true,
    feedback: true,
    trial_duration: trial_duration,
    randomize_choice_order: true,
    data: { item_set: item_set, test_form: test_form, distractor: distractor }
  }

  // Define conditional node.
  const trial_node = {
    timeline: [trial],
    conditional_function: function() {

      // Extract time since end of instructions.
      const start_time = jsPsych.data.get().filter({trial_type: 'instructions'}).last().values()[0].time_elapsed;

      // Extract time since end of last trial.
      const finish_time = jsPsych.data.get().last().values()[0].time_elapsed;

      // Evaluate elapsed time.
      if ( finish_time - start_time < block_duration ) {
        return true;
      } else {
        return false;
      }

    }
  }

  // Push trial.
  MARS.push(trial_node);

}
