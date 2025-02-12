import https from 'https';
import path from 'path';
import {downloadFile} from './utils/download-file';

const releaseUrl = 'https://gitlab.com/william-donnette/jobar/-/releases/permalink/latest';

const fetchRedirectedUrl = async (url: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		https
			.get(url, (res: any) => {
				if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
					resolve(res.headers.location); // Récupère l'URL de redirection
				} else {
					reject(new Error(`Failed to get redirected URL: ${res.statusCode}`));
				}
			})
			.on('error', reject);
	});
};

export const downloadLatestRelease = async (projectName: string, verbose: boolean = false): Promise<string> => {
	try {
		if (verbose) {
			console.log('🔍 Fetching latest release URL...');
		}
		const latestReleasePage = await fetchRedirectedUrl(releaseUrl);

		// Extraire la version depuis l'URL de redirection (GitLab suit ce format)
		const versionMatch = latestReleasePage.match(/\/releases\/([^/]+)$/);
		const version = versionMatch ? versionMatch[1] : 'unknown';

		// Construire l'URL du fichier ZIP (GitLab propose généralement ce format)
		const zipUrl = latestReleasePage.replace('/releases/', '/archive/') + `/jobar-${version}.zip`;

		if (verbose) {
			console.log(`📦 Downloading ZIP from: ${zipUrl}`);
		}

		const outputPath = path.join(process.cwd(), `${projectName}/jobar-${version}.zip`);
		await downloadFile(zipUrl, outputPath);

		if (verbose) {
			console.log(`✅ Download completed: ${outputPath}`);
		}

		return version;
	} catch (error: any) {
		throw new Error('❌ Error:' + error.message);
	}
};
