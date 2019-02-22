import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { readTemplate } from './pathUtils';

const writeFileWithTemplate = (source, templatePath, props = {}) => {
  const template = Handlebars.compile(readTemplate(templatePath));
  fs.writeFileSync(
    source,
    `// Generated automatically by codeGenerator v1.0
`
  );
  fs.appendFileSync(source, template(props));
};

const copyFileSync = (source, target, props) => {
  const targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      const basename = path.basename(source);
      if (basename.indexOf('.hbs') !== -1) {
        writeFileWithTemplate(
          path.join(target, basename.substring(0, basename.indexOf('.hbs'))),
          source,
          props
        );
      } else {
        writeFileWithTemplate(path.join(target, basename), source, props);
      }
      return;
    }
  }

  fs.writeFileWithTemplate(targetFile, source, props);
};

const copyFolderRecursiveSync = (source, target, props) => {
  const targetFolder = path.join(target, path.basename(source));

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder, props);
      } else {
        copyFileSync(curSource, targetFolder, props);
      }
    });
  }
};

export { copyFolderRecursiveSync, writeFileWithTemplate };
