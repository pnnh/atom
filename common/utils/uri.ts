import parseUri from 'parse-uri'

// URL地址转换为对象
export function stringToUri(value: string) {
    return parseUri(value)
}

// 校验是否合法URL地址
export function isValidUrl(address: string) {
    try {
        new URL(address);
        return true;
    } catch (err) {
        return false;
    }
}

// Sanitize src url before usage to prevent XSS (client-side validation)
export function sanitizeUrl(src: string | undefined): string {
    if (!src) return '';
    // Only allow http/https URLs or relative paths beginning with '/'
    if (/^(https?:\/\/)/i.test(src)) return src;
    if (/^\/[^/]/.test(src)) return src;
    // Fallback to empty string or default image
    return '';
}
