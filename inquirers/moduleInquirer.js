import inquirer from 'inquirer';
import { getExistingModules } from '../utils/pathUtils';
import { handle } from '../handlers/moduleHandler';

const validate = input =>
  /^([A-Za-z\-\_\d])+$/.test(input) ||
  'Name may only include letters, numbers, underscores and hashes.';

const QUESTIONS = [
  {
    name: 'module',
    type: 'input',
    message: 'Module name:',
    validate,
  },
];

const prompt = () =>
  inquirer.prompt(QUESTIONS).then(answers => {
    if (getExistingModules().indexOf(answers.module) !== -1) {
      console.log('Duplicated module name!');
    } else {
      handle(answers);
    }
  });

export { prompt };
