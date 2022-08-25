import { createLogger } from './utils/logger';
import { ExitCode } from './utils/exitCode';
import { copyFile, mkdir, readFile, stat, writeFile } from 'fs/promises';
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
  const dir = `./.downloaded/${version}`;
  await mkdir(dir, { recursive: true });
  await fetch(`https://registry.npmjs.org/@rollem/language/-/language-${version}.tgz`)
    .then(r => r.body!.pipe(tar.x({ cwd: dir })));
}

const whitelistedDependencies = ['lodash', 'chance'];

function patchPackageJson(json: any): any {
  delete json.scripts;
  delete json.mocha;
  delete json.devDependencies;
  delete json.gitHead;
  delete json.publishConfig;
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
  return sortPackageJson(json);
}

const packageJsonKeyOrder = [
  'name', 'version', 'description', 'keywords', 'license', 'author', 'contributors',
  'homepage', 'bugs', 'main', 'module', 'umd:main', 'types', 'files',
  'dependencies', 'devDependencies', 'peerDependencies', 'scripts',
];

function sortPackageJson(json: any) {
  return Object.fromEntries(
    Object.entries(json).sort(([k1], [k2]) => {
      const i1 = packageJsonKeyOrder.indexOf(k1), i2 = packageJsonKeyOrder.indexOf(k2);
      return i1 === -1 ? 1 : i2 === -1 ? -1 : i1 - i2;
    }),
  );
}

async function nukeDist() {
  await promisify(rimraf)('dist');
}

const filesToIgnoreRegExp = /(?:\.spec\.(?:d\.ts|js)|\.gitignore|\.npmignore|README\.md)$/;

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
      } else if (!filesToIgnoreRegExp.test(relativePath)) {
        if (relativePath == 'LICENSE') {
          await writeFile(`../${relativePath}`, await readFile(file.path, 'utf8'));
        } else {
          await copyFile(file.path, `../${relativePath}`);
        }
      }
    }
  }
}

async function downloadIfNotExists(version: string) {
  const stats = await stat(`./.downloaded/${version}`).catch(() => null);
  if (!stats || !stats.isDirectory()) {
    logger.info(`Downloading @rollem/language v${version}...`);
    await downloadAndExtract(version);
  } else {
    logger.info(`Using existing @rollem/language v${version}...`);
  }
}

async function main() {
  const version = await getVersion();
  await downloadIfNotExists(version);
  logger.info(`Patching repository with downloaded files...`);
  await nukeDist();
  await copyDownloadedFiles(version);
  logger.info(`Done.`);
}

main().catch((error) => {
  logger.error('Error:', { error });
  process.exit(ExitCode.SOFTWARE_ERROR);
});
