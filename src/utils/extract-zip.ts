import AdmZip from 'adm-zip';

export const extractZip = (zipPath: string, extractTo: string, verbose: boolean = false) => {
	try {
		if (verbose) {
			console.log(`📂 Extracting ${zipPath}...`);
		}
		const zip = new AdmZip(zipPath);
		zip.extractAllTo(extractTo, true);
		if (verbose) {
			console.log(`✅ Extracted to ${extractTo}`);
		}
	} catch (error: any) {
		throw new Error('❌ Error extracting ZIP:' + error.message);
	}
};
