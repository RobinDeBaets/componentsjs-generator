#!/usr/bin/env node
import * as fs from 'fs';
import * as minimist from 'minimist';
import { Generator } from '../lib/generate/Generator';
import { ResolutionContext } from '../lib/resolution/ResolutionContext';

function showHelp(): void {
  process.stderr.write(`Generates components files for TypeScript files in a package
Usage:
  componentsjs-generator
  Options:
       -p path/to/package      The directory of the package to look in, defaults to working directory
       -s lib                  Relative path to directory containing source files, defaults to 'lib'
       -c components           Relative path to directory that will contain components files, defaults to 'components'
       -e jsonld               Extension for components files (without .), defaults to 'jsonld'
       -i ignore-classes.json  Relative path to an optional file with class names to ignore
       --help                  Show information about this command
`);
  process.exit(1);
}

const args = minimist(process.argv.slice(2));
if (args.help) {
  showHelp();
} else {
  const generator = new Generator({
    resolutionContext: new ResolutionContext(),
    pathDestination: {
      packageRootDirectory: args.p || process.cwd(),
      originalPath: args.s || 'lib',
      replacementPath: args.c || 'components',
    },
    fileExtension: args.e || 'jsonld',
    level: args.l || 'info',
    ignoreClasses: args.i ?
      // eslint-disable-next-line no-sync
      JSON.parse(fs.readFileSync(args.i, 'utf8')).reduce((acc: Record<string, boolean>, entry: string) => {
        acc[entry] = true;
        return acc;
      }, {}) :
      [],
  });
  generator
    .generateComponents()
    .catch((error: Error) => {
      process.stderr.write(`${error.message}\n`);
      process.exit(1);
    });
}
