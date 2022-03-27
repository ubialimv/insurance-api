import client, { Registry } from 'prom-client';
import { name, version } from '../../package.json';
import environments from '../shared/environments';

const register = new Registry();

register.setDefaultLabels({
  application: name,
  application_version: version,
  env: environments.NODE_ENV
});

client.collectDefaultMetrics({ register });

export default register;
