import fs from 'fs';
import os from 'os';
import path from 'path';
import {execCommand} from './utils/exec-command';

export const installProject = (projectName: string) => {
	const projectPath = path.join(process.cwd(), projectName);
	const packageJson = {
		name: projectName,
		version: '1.0.0',
		private: true,
		description: '',
		main: 'src/index.ts',
		scripts: {
			test: 'nyc mocha --exit --r ts-node/register --r source-map-support/register -r tsconfig-paths/register ./src/**/*.spec.ts',
			dev: 'nodemon -r tsconfig-paths/register src/index.ts',
			build: 'rm -r ./dist && tsc --build && tsc-alias',
			start: 'node ./dist/index.js',
			'open-report':
				"node -e \"const os = require('os'); const path = './coverage/lcov-report/index.html'; if (os.platform() === 'darwin') { require('child_process').execSync('open ' + path); } else if (os.platform() === 'win32') { require('child_process').execSync('start ' + path); } else { require('child_process').execSync('xdg-open ' + path); }\"",
		},
		author: '',
		license: 'ISC',
	};
	fs.writeFileSync(path.join(projectPath, `package.json`), JSON.stringify(packageJson, null, 2) + os.EOL);
	execCommand(`cd ${projectName} && npm i dotenv express jobar`);
	execCommand(
		`cd ${projectName} && npm i -D @istanbuljs/nyc-config-typescript @temporalio/nyc-test-coverage @temporalio/testing @tsconfig/node16 @types/express @types/mocha @types/sinon mocha nodemon nyc sinon ts-node tsc-alias tsconfig-paths typescript uuid`
	);
};
