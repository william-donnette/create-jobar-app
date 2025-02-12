import fs from 'fs';
import https from 'https';

export const downloadFile = (url: string, outputPath: string) => {
	return new Promise<void>((resolve, reject) => {
		const file = fs.createWriteStream(outputPath);
		https
			.get(url, (res: any) => {
				res.pipe(file);
				file.on('finish', () => {
					file.close();
					resolve();
				});
			})
			.on('error', (err: any) => {
				fs.unlink(outputPath, () => {}); // Supprime le fichier en cas d'erreur
				reject(err);
			});
	});
};
