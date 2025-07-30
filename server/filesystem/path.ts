import fs from "fs";
import os from "os";
import path from "path";

export function resolvePath(relatePath: string): string {
    const filePrefix = 'file://'
    let newPath = relatePath
    if (newPath.startsWith(filePrefix)) {
        newPath = newPath.replace(filePrefix, '')
    }
    if (newPath.startsWith("~/")) {
        const homeDir = os.homedir()
        newPath = newPath.replace("~/", homeDir + path.sep)
    } else if (newPath.startsWith("./")) {
        newPath = newPath.replace("./", process.cwd() + path.sep)
    } else if (newPath.startsWith("workdir://")) {
        newPath = newPath.replace("workdir://", process.cwd() + path.sep)
    }
    return newPath
}


export function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
}
