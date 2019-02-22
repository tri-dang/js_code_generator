import inquirer from 'inquirer';
import { prompt as modulePrompt } from './inquirers/moduleInquirer';
import { prompt as apiPrompt } from './inquirers/apiInquirer';
import { prompt as componentPrompt } from './inquirers/componentInquirer';

const TASK_CHOICES = [
  {
    name: 'Module',
    value: modulePrompt,
  },
  {
    name: 'Api Call',
    value: apiPrompt,
  },
  {
    name: 'Component',
    value: componentPrompt,
  },
];

const ACTION_QUESTIONS = [
  {
    name: 'action',
    type: 'list',
    message: 'Which code do you want to generate?',
    choices: TASK_CHOICES,
  },
];

inquirer.prompt(ACTION_QUESTIONS).then(answers => {
  answers.action();
});
