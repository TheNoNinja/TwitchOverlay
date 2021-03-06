export function getParameterByName(name: string, url = window.location.href): string | null {
    name = name.toString().replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}