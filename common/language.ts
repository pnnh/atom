export const langEn = 'en'
export const langZh = 'zh'
export const defaultLanguage = langEn
export const supportedLanguages = [langEn, langZh]

export function isSupportedLanguage(lang: string): boolean {
    return supportedLanguages.includes(lang)
}

export function isLanguageEn(lang: string): boolean {
    if (!lang) {
        return false
    }
    return lang === langEn || lang.startsWith(`${langEn}-`)
}

export function isLanguageZh(lang: string): boolean {
    if (!lang) {
        return false
    }
    return lang === langZh || lang.startsWith(`${langZh}-`)
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
    if (pathname === '/') {
        if (lang === defaultLanguage) {
            return '/'
        } else {
            return `/${lang}/`
        }
    }
    const segments = pathname.split('/')
    if (segments.length > 1 && isSupportedLanguage(segments[1])) {
        segments[1] = lang
    } else {
        segments.splice(1, 0, lang)
    }
    return segments.join('/')
}
