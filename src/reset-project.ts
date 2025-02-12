import {execCommand} from './utils/exec-command';

export const resetProject = (projectName: string) => {
	execCommand(`rm -r ${projectName}`);
};
