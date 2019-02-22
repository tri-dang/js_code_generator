import inquirer from 'inquirer';
import {
  getExistingModules,
  getExistingModelsOfModule,
  getExistingApisOfModel,
} from '../utils/pathUtils';

const QUESTIONS = [
  [
    {
      name: 'module',
      type: 'list',
      message: 'Which module?',
      choices: getExistingModules(),
    },
  ],
  input => [
    {
      name: 'model',
      type: 'list',
      message: 'Which model?',
      choices: getExistingModelsOfModule(input),
    },
  ],
  input => [
    {
      name: 'apiType',
      type: 'list',
      message: 'Which api?',
      choices: getExistingApisOfModel(input),
    },
  ],
];

const prompt = () =>
  inquirer.prompt(QUESTIONS[0]).then(firstAnswers => {
    inquirer.prompt(QUESTIONS[1](firstAnswers)).then(secondAnswers => {
      inquirer
        .prompt(QUESTIONS[2]({ ...firstAnswers, ...secondAnswers }))
        .then(answers => {
          console.log({ ...firstAnswers, ...secondAnswers, ...answers });
        });
    });
  });

export { prompt };
