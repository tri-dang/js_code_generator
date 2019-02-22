import fs from 'fs';
import {
  modulesPath,
  getModulePath,
  getTemplatePath,
} from '../utils/pathUtils';
import { copyFolderRecursiveSync } from '../utils/fileUtils';

const handle = props => {
  copyFolderRecursiveSync(getTemplatePath('module'), modulesPath, props);
  fs.renameSync(getModulePath('module'), getModulePath(props.module));
};

export { handle };
