import {lstatSync, readdirSync, realpathSync, readFileSync} from 'fs';
import {join, resolve} from 'path';

const appDirectory = realpathSync(process.cwd());
const modulesPath = resolve(appDirectory, 'src/modules');
const getModulePath = module => resolve(modulesPath, module);

const getTemplatePath = template =>
  resolve(appDirectory, 'scripts/codeGenerator/templates', template);

const readTemplate = path => readFileSync(path, {encoding: 'utf8'});

const apiPath = ({module, model, apiType}) =>
  resolve(modulesPath, module, 'apiCalls', `${model}s`, `${apiType}.js`);

const isDirectory = source => lstatSync(source).isDirectory();
const isFile = source => lstatSync(source).isFile();

const getChildren = (source, checking) =>
  readdirSync(source)
    .map(name => ({
      path: join(source, name),
      name,
    }))
    .filter(({path}) => checking(path))
    .map(({name}) => name);

const getDirectories = source => getChildren(source, isDirectory);
const getFiles = source => getChildren(source, isFile);

const modelsPathOfModule = moduleName =>
  resolve(modulesPath, moduleName, 'apiCalls');

const getExistingModelsOfModule = ({module}) =>
  getDirectories(modelsPathOfModule(module));

const getExistingApisOfModel = ({module, model}) =>
  getFiles(resolve(modelsPathOfModule(module), model));

const getExistingModules = () => getDirectories(modulesPath);

export {
  appDirectory,
  modulesPath,
  getModulePath,
  getTemplatePath,
  readTemplate,
  apiPath,
  getExistingModules,
  getExistingModelsOfModule,
  getExistingApisOfModel,
};
