export const langEn = 'en'
export const langZh = 'zh'
export const langZhant = 'zhant' // Traditional Chinese
export const defaultLanguage = langEn
export const supportedLanguages = [langEn, langZh, langZhant]

export function isSupportedLanguage(lang: string): boolean {
    return supportedLanguages.includes(lang)
}

export function isLangEn(lang: string): boolean {
    if (!lang) {
        return false
    }
    return lang === langEn || lang.startsWith(`${langEn}-`)
}

export function isLangZh(lang: string): boolean {
    if (!lang) {
        return false
    }
    return lang === langZh || lang.startsWith(`${langZh}-`)
}

export function getLangDefault(lang: string): string {
    if (isSupportedLanguage(lang)) {
        return lang
    }
    return defaultLanguage
}

export function getLanguageFromPathname(pathname: string): string | undefined {
    const segments = pathname.split('/')
    if (segments.length > 1 && isSupportedLanguage(segments[1])) {
        return segments[1]
    }
    return undefined
}

export function replaceLanguageInPathname(pathname: string, lang: string): string {
    if (!isSupportedLanguage(lang)) {
        lang = defaultLanguage
    }
    // if (pathname === '/') {
    //     if (lang === defaultLanguage) {
    //         return '/'
    //     } else {
    //         return `/${lang}`
    //     }
    // }
    const segments = pathname.split('/')
    if (segments.length > 1 && isSupportedLanguage(segments[1])) {
        segments[1] = lang
    } else {
        segments.splice(1, 0, lang)
    }
    const newPath = segments.join('/')
    if (newPath.endsWith('/'))
        return newPath.substring(0, newPath.length - 1) // 去掉最后的斜杠
    return newPath
}

export function localText(lang: string, zhText: string, enText: string): string {
    if (isLangEn(lang)) {
        return enText
    } else if (isLangZh(lang)) {
        return zhText
    } else {
        return enText // Default to English if language is not recognized
    }
}
