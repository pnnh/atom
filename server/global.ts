// 因为在Next.js Dev模式下，因为HMR的缘故，导致同一个模块会被加载多次，
// 这样会导致模块级别的单例变量无法在不同模块实例间共享，每次执行都会重置，进而引发各种问题。
// 所以这里使用global来保存全局变量，只能在server端运行。
export function serverSetGlobalVariable(key: string, value: any) {
    (global as any)[key] = value;
}

export function serverGetGlobalVariable(key: string): any {
    return (global as any)[key];
}
