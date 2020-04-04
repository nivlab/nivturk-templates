# questionnaires

This folder contains template jsPsych code for self-report questionnaires.

## jspsych-survey-template

Unless otherwise specified, the questionnaires in this folder requires the `jspsych-survey-template` plugin. This plugin is a custom extension of the core `jspsych-survey-likert` plugin, which improves on survey aesthetics and feedback. It requires the user to specify:

- `items`: the survey items
- `scale`: the survey response scales
- `reverse`: whether an item should be reverse-scored
- `instructions`: the survey instructions prompt

In the majority of the subfolders here are the parameters (items, scale, etc.) for the corresponding survey, which can be directly plugged into `jspsych-survey-template`. A handful of surveys (e.g. affective slider) do not fit the standard template and require custom plugin solutions. Those questionnaires have separate jsPsych code in their respective subfolders.

## Notes

Though the majority of these plugins have been tested, we encourage users to double-check survey information and outputs for typos, scoring errors, and other bugs.
