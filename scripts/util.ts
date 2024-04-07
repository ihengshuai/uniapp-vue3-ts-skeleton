import path from 'path'
import process from 'process'

export const rootDir = process.cwd();

/** 取ci执行目录 */
export const resolvePath = (p = "") => path.resolve(rootDir, p);
