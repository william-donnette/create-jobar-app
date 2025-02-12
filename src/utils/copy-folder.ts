import fse from 'fs-extra';
import {fileExist} from './file-exist';

export const copyFolder = (source: string, destination: string, verbose: boolean = false) => {
	if (!fileExist(source)) {
		throw new Error(`❌ Folder "${source}" not found.`);
	}

	try {
		if (verbose) {
			console.log(`📁 Copying ${source} to ${destination}...`);
		}
		fse.copySync(source, destination, {overwrite: true});
		if (verbose) {
			console.log('✅ Copy completed!');
		}
	} catch (error: any) {
		throw new Error('❌ Error copying files:' + error.message);
	}
};
