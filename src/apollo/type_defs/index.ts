import fs from 'fs';
import path from 'path';

export async function loadGraphqlTypeDefs() {
  return fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.graphql'))
    .map(f => fs.readFileSync(path.resolve( __dirname, f )).toString())
    .join('\n');
}