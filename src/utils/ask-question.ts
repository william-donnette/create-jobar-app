export const askQuestion = (rl: any, question: string) => {
	return new Promise((resolve) => {
		rl.question(question, (answer: string) => {
			resolve(answer);
		});
	});
};
