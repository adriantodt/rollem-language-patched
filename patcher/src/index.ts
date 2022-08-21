import { createLogger } from './utils/logger';
import { ExitCode } from './utils/exitCode';
import { copyFile, mkdir, readFile, writeFile } from 'fs/promises';
import fetch from 'node-fetch';
import tar from 'tar';
import klaw from 'klaw';
import path from 'path';
import rimraf from 'rimraf';
import { promisify } from 'util';

const logger = createLogger('Patcher');

async function getVersion() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args[0];
  } else {
    const packageJson = JSON.parse(await readFile('./upstream/package.json', 'utf8'));
    const version = packageJson.dependencies['@rollem/language'] as string;
    return /^[~^]/.test(version) ? version.substring(1) : version;
  }
}

async function downloadAndExtract(version: string) {
  let dir = `./.downloaded/${version}`;
  await mkdir(dir, { recursive: true });
  await fetch(`https://registry.npmjs.org/@rollem/language/-/language-${version}.tgz`)
    .then(r => r.body!.pipe(tar.x({ cwd: dir })));
}

function patchPackageJson(json: any): any {
  const whitelistedDependencies = ['lodash', 'chance'];
  delete json.scripts;
  delete json.mocha;
  delete json.devDependencies;
  json.name = '@adriantodt/rollem-language';
  json.dependencies = Object.fromEntries(
    Object.entries(json.dependencies).filter(([key]) => whitelistedDependencies.includes(key)),
  );
  json.contributors = [
    json.author,
    'Adrian Todt <npm@adriantodt.net> (https://adriantodt.net)',
  ];
  delete json.author;
  json.homepage = 'https://github.com/adriantodt/rollem-language-patched';
  json.bugs = {
    url: 'https://github.com/adriantodt/rollem-language-patched/issues',
  }
  return json;
}

async function nukeDist() {
  await promisify(rimraf)('dist');
}

async function copyDownloadedFiles(version: string) {
  for await (const file of klaw(`./.downloaded/${version}/package`)) {
    const relativePath = path.relative(`./.downloaded/${version}/package`, file.path);
    if (file.stats.isDirectory()) {
      await mkdir(`../${relativePath}`, { recursive: true });
      continue;
    }
    if (file.stats.isFile()) {
      if (relativePath === 'package.json') {
        await writeFile(
          '../package.json',
          JSON.stringify(
            patchPackageJson(
              JSON.parse(
                await readFile(file.path, 'utf8'),
              ),
            ),
            null,
            2,
          ),
        );
      } else if (!/(?:\.spec\.(?:d\.ts|js)|.gitignore|.npmignore|README.md)$/.test(relativePath)) {
        await copyFile(file.path, `../${relativePath}`);
      }
    }
  }
}

async function main() {
  const version = await getVersion();
  logger.info(`Downloading @rollem/language v${version}...`);
  await downloadAndExtract(version);
  logger.info(`Patching repository with downloaded files...`);
  await nukeDist();
  await copyDownloadedFiles(version);
  logger.info(`Done.`);
}

main().catch((error) => {
  logger.error('Error:', { error });
  process.exit(ExitCode.SOFTWARE_ERROR);
});
