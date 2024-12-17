import * as fs from "fs";
import * as zlib from "zlib"

const compressFile = (inputFile) => {
    try {
        fs.createReadStream(inputFile).pipe(zlib.createGzip().pipe(fs.createWriteStream(inputFile + '.gz')));
        return true;
    } catch (error) {
        console.log("Error: ", error)
        return false;
    }
}

const decompressFile = (inputFile) => {
    try {
        fs.createReadStream(inputFile).pipe(zlib.createGunzip().pipe(fs.createWriteStream(inputFile.slice(0, -3))));
        return true;
    } catch (error) {
        console.log("Error: ", error)
        return false;
    }
}

export { compressFile, decompressFile };



