import fs from 'fs';
import path from 'path';
import { toUpper, snakeCase, lowerCase, upperFirst } from 'lodash/fp';
import { modulesPath, getTemplatePath, apiPath } from '../utils/pathUtils';
import { writeFileWithTemplate } from '../utils/fileUtils';

const writeFile = props => {
  const modulePath = path.resolve(
    modulesPath,
    props.module,
    'apiCalls',
    `${props.model}s`
  );
  if (!fs.existsSync(modulePath)) {
    fs.mkdirSync(modulePath);
  }
  writeFileWithTemplate(
    apiPath(props),
    getTemplatePath(`api/${props.apiType}.js.hbs`),
    {
      model: props.model,
      apiName: toUpper(snakeCase(props.model)),
      name: lowerCase(props.model),
      underscoredModel: snakeCase(props.model),
      selectorName: upperFirst(props.model),
      ...props,
    }
  );
};

const handle = props => {
  if (Array.isArray(props.apiType)) {
    props.apiType.forEach(value => {
      writeFile({ ...props, apiType: value });
    });
  } else {
    writeFile(props);
  }
};

export { handle };
