/**
 * Returns object with results of request
 *
 * @param {string} url Url you want to fetch
 * @return {object} object with results info for a given request url
 */
export async function getRequestResults(url, abortController) {
    try {
        const response = await fetch(url, {signal: abortController?.signal});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Что-то пошло не так. Пожалуйста, попробуйте позже');
        }
    } catch (err) {
        if (err instanceof Error) throw err;
    }
}

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}