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
			test: 'nyc mocha --exit --require ts-node/register --require source-map-support/register src/**/*.spec.ts',
			dev: 'nodemon src/index.ts',
			build: 'tsc --build',
			start: 'node lib/index.js',
		},
		author: '',
		license: 'ISC',
	};
	fs.writeFileSync(path.join(projectPath, `package.json`), JSON.stringify(packageJson, null, 2) + os.EOL);
	execCommand(`cd ${projectName} && npm i jobar express dotenv`);
	execCommand(
		`cd ${projectName} && npm i -D @temporalio/testing @tsconfig/node16 @types/express @types/mocha mocha nodemon nyc ts-node typescript`
	);
};
