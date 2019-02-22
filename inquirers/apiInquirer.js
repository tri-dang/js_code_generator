import inquirer from 'inquirer';
import { getExistingModules } from '../utils/pathUtils';
import { getHosts } from '../utils/hostUtils';
import { handle } from '../handlers/apiHandler';

const validate = input =>
  /^([A-Za-z\-\_\d])+$/.test(input) ||
  'Name may only include letters, numbers, underscores and hashes.';

const QUESTIONS = [
  {
    name: 'module',
    type: 'list',
    message: 'Which module?',
    choices: getExistingModules(),
    validate,
  },
  {
    name: 'service',
    type: 'list',
    message: 'Which service do you want to call to?',
    choices: getHosts(),
    validate,
  },
  {
    name: 'model',
    type: 'input',
    message: 'Model: ',
    validate,
  },
  {
    name: 'namespace',
    type: 'input',
    message: 'API namespace (e.g v1/admin)?',
  },
  {
    name: 'apiType',
    type: 'checkbox',
    message: 'Which api call do you want to add?',
    choices: ['create', 'get', 'update', 'list'],
  },
];

const prompt = () =>
  inquirer.prompt(QUESTIONS).then(answers => {
    handle(answers);
  });

export { prompt };
