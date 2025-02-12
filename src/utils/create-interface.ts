import readline from 'readline';

export const createInterface = () => {
	return readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
};
