'use client'

export function clientSetWindowVariable(key: string, value: any) {
    // In some server-side rendering scenarios, window may be undefined
    if (!window) {
        (globalThis as any)[key] = value;
        return
    }
    (window as any)[key] = value;
}

export function clientGetWindowVariable(key: string): any {
    // In some server-side rendering scenarios, window may be undefined
    if (!window) {
        return (globalThis as any)[key];
    }
    return (window as any)[key];
}
