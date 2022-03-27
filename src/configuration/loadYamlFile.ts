import { readFileSync } from 'fs';
import * as YAML from 'js-yaml';

const loadYamlFile = (file: string): any => {
  try {
    const loadedFile = YAML.load(readFileSync(file, 'utf8'));
    return loadedFile;
  } catch (error) {
    return undefined;
  }
};

export default loadYamlFile;
