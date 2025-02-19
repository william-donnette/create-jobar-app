#!/usr/bin/env node

import chalk from 'chalk';
import {Command} from 'commander';
import path from 'path';
import semver from 'semver';
import packageJson from '../package.json';
import {downloadLatestRelease} from './download-latest-release';
import {installProject} from './install-project';
import {resetProject} from './reset-project';
import {checkForLatestVersion} from './utils/check-latest-version';
import {copyFolder} from './utils/copy-folder';
import {execCommand} from './utils/exec-command';
import {extractZip} from './utils/extract-zip';
import {fileExist} from './utils/file-exist';
import {isUsingYarn} from './utils/is-using-yarn';

const main = async () => {
	let projectName: string | undefined;
	const program = new Command(packageJson.name)
		.version(packageJson.version)
		.arguments('<project-directory>')
		.usage(`${chalk.green('<project-directory>')} [options]`)
		.action((name) => {
			projectName = name;
		})
		.option('--verbose', 'print additional logs')
		.option('--template <template-name>', 'specify a template for the created project')
		.allowUnknownOption()
		.on('--help', () => {
			console.log(`    Only ${chalk.green('<project-directory>')} is required.`);
			console.log();
			console.log(`    A custom ${chalk.cyan('--template')} can be one of:`);
			console.log(
				`      - you can choose a template in this example repository: ${chalk.cyan(
					'https://github.com/william-donnette/jobar/tree/main/examples'
				)}`
			);
			console.log();
			console.log(`    If you have any problems, do not hesitate to file an issue:`);
			console.log(`      ${chalk.cyan('https://gitlab.com/william-donnette/jobar/-/issues/new')}`);
			console.log();
		})
		.parse(process.argv);

	if (typeof projectName === 'undefined') {
		console.error('Please specify the project directory:');
		console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
		console.log();
		console.log('For example:');
		console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-jobar-app')}`);
		console.log();
		console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
		process.exit(1);
	}

	if (projectName.includes('/')) {
		console.error('Please do not use "/" in your project name, this can lead to unexpected behavior.');
		process.exit(1);
	}

	checkForLatestVersion()
		.catch(() => {
			try {
				return execCommand('npm view create-jobar-app version').toString().trim();
			} catch (e) {
				return null;
			}
		})
		.then((latest) => {
			if (latest && semver.lt(packageJson.version, latest)) {
				console.log();
				console.error(
					chalk.yellow(
						`You are running \`create-jobar-app\` ${packageJson.version}, which is behind the latest release (${latest}).\n\n` +
							'We recommend always using the latest version of create-jobar-app if possible.'
					)
				);
				console.log();
			} else {
				const useYarn = isUsingYarn();
				// @ts-ignore
				createApp(projectName, program.verbose, program.template, useYarn);
			}
		});
};
main().catch(() => {
	console.error('Internal Error');
});

const createApp = async (projectName: string, verbose = false, template = 'hello-world', useYarn = false) => {
	const projectPath = process.cwd() + `/${projectName.trim()}`;
	try {
		if (fileExist(projectPath)) {
			console.error(`❌ An other folder with the name ${projectName} already exist in this folder.`);
			process.exit(1);
		}

		execCommand(`mkdir ${projectName}`);

		const version = await downloadLatestRelease(projectName, verbose);
		const zipPath = path.join(projectPath, `jobar-${version}.zip`);

		extractZip(zipPath, projectPath, verbose);

		const templatePath = path.join(projectPath, `jobar-${version}/examples/${template}`);

		if (!fileExist(templatePath)) {
			console.error(
				`❌ The template ${template} doesn't exist. Check this repository to see all the examples allowed: https://github.com/william-donnette/jobar/tree/main/examples`
			);
			resetProject(projectName);
			process.exit(1);
		}

		copyFolder(templatePath, projectPath, verbose);

		if (verbose) {
			console.log('🗑️ Removing all unnecessary resources');
		}
		execCommand(`cd ${projectName} && rm -r jobar-${version} jobar-${version}.zip package.json package-lock.json`);

		if (verbose) {
			console.log('🚀 Installing dependencies...');
		}
		installProject(projectName);

		console.log(`🎉 Installed version of Jobar ${template}: ${version}`);
	} catch (error) {
		if (verbose) {
			console.error(error);
		}
		process.exit(1);
	} finally {
		process.exit(0);
	}
};
