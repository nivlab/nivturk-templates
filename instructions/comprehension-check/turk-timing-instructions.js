// conditioning instructions
var comprehension_check = {
  type: 'comprehension-check',
  instruction_pages: [
    '<div style="max-width:600px;"><p>In this HIT, you will complete a planet mining task. There will be 9 blocks and each will take approximately 3 minutes to complete.  After the task, you will be given a short questionnaire, which should take another approximately 5 minutes.</p><p>If you do not take any breaks, the HIT as a whole should take roughly 40 minutes.</p></div>',
    '<br><br><br><div style="max-width:600px;"> On each trial, you will be asked to choose one of two planets to mine. Each type of planet is marked by a unique symbol, as you can see below:</div><br><div><img src="/static/images/instruct1.png" width="500"</img></div><br><div style="max-width:600px;"><p>To choose the planet on the left, press the LEFT ARROW KEY on your keyboard. To choose the planet on the right, press the RIGHT ARROW KEY. </p><p>After you have selected a planet to mine, you can collect any gems that appear by pressing the SPACE BAR while the gems are on the screen (like in the image below).</p></div><br><div><img src="/static/images/instruct2.png" width="500"</img></div><br><div style="max-width:600px;"><p>Be quick! Gems are only available for a very short time, and then they will disappear. You can start mining the planet before the gem appears and can press the space bar as many times as you want, but you will only receive a gem if you mine the planet while the gem is on the screen.</p></div>',
    '<br><br><br><div style="max-width:600px;"><p>Gems take different amounts of time to appear on different types of planets, and some planets will have more than one gem. Any gems you collect will be added to your total and will contribute to a bonus at the end of the task.</p><p>Lastly, once you have mined a planet, you will need to wait for your spaceship to be ready to start a new trial. When it is ready you will see the text \'READY\' appear on the screen, like in the image below:</p></div><br><div><img src="/static/images/instruct3.png" width="500"</img></div><br><div style="max-width:600px;"><p>Press any key to progress to the next trial when this screen appears.</p><p>When you press \'Next\' below, we will ask you several quick questions to make sure that you have understood these instructions. You will not be able to proceed until you have answered all questions correctly, so if there is something that is still unclear to you, please go back and review the instructions again.</p></div>'
],
  questions: [{
      prompt: "Which button should you press to select the LEFT planet?",
      options: ["Left arrow key", "A", "L", "Space bar"],
      correct_answer: "Left arrow key",
      required: true,
      horizontal: false
    },{
      prompt: "Which button should you press to collect a gem?",
      options: ["Left arrow key", "A", "L", "Space bar"],
      correct_answer: "Space bar",
      required: true,
      horizontal: false
    }, {
      prompt: "True or false: You can start mining the planet before the gem appears and can press the space bar as many times as you want.",
      options: ["True", "False"],
      correct_answer: "True",
      required: true,
      horizontal: false
    }, {
      prompt: "How can you get the next trial to begin?",
      options: ["Press SPACE after collecting the gem","Press any key when the spaceship is ready","Press A", "Press L"],
      correct_answer: "Press any key when the spaceship is ready",
      required: true,
      horizontal: false
    }, {
      prompt: "How can you increase your bonus?",
      options: ["There is no bonus", "Collect as many gems as possible"],
      correct_answer: "Collect as many gems as possible",
      required: true,
      horizontal: false
    }, {
      prompt: "True or false: On each trial, you can mine the chosen planet as many times as you want, but you will only get a gem if you mine the planet while the gem is on the screen.",
      options: ["True", "False"],
      correct_answer: "True",
      required: true,
      horizontal: false
    }
  ],
  show_clickable_nav: true,
  show_page_number: false,
  randomize_question_order: true,
  failure_text: "Unfortunately, you didn't answer all questions correctly. Please review the instructions and then try again."
};
