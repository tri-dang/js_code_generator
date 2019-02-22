import * as env from '../../../src/utils/getFrontendEnv';

const getHosts = () =>
  Object.keys(env).filter(key => key.indexOf('Host') !== -1);

export { getHosts };
