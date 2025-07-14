
import fs from "fs";

export function resolvePath(path: string): string {
    const filePrefix = 'file://'
    let newPath = path
    if (newPath.startsWith(filePrefix)) {
        newPath = newPath.replace(filePrefix, '')
    }
    if (newPath.startsWith("~/")) {
        newPath = newPath.replace("~/", process.env['HOME'] + "/")
    } else if (newPath.startsWith("./")) {
        newPath = newPath.replace("./", process.cwd() + "/")
    } else if (newPath.startsWith("workdir://")) {
        newPath = newPath.replace("workdir://", process.cwd() + "/")
    }
    return newPath
}


export function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
}
