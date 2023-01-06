import { API_KEY } from './constants.js';

/**
 * Ads tags to the given artists object and return new js artists object
 *
 * @param {object} artistsObject js object representing info about given top artists
 * @return {object} js object representing info about given top artists enriched with tags
 */
export async function enrichArtistsWithTags(artistsObject) {
    const artistObjectClone = structuredClone(artistsObject);

    await Promise.all(artistObjectClone?.artists?.artist
        .map((artist) => fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist.name}&api_key=${API_KEY}&format=json&autocorrect=1`)
            .then((response) => response.json())
            .then((response) => {
                artist.tags = response?.toptags?.tag;
            })))
        .catch((err) => {
            if (err instanceof Error) throw err;
        });

    return artistObjectClone;
}

/**
 * Converts artistsObject to artistsArray for JSX component
 *
 * @param {object} artistsObject js object representing info about given top artists
 * @return {Array} js array representing info about given top artists ready for JSX component
 */
export function convertArtistsObjectToArray(artistsObject) {
    const artistObjectClone = structuredClone(artistsObject);
    let artistsArray = [];
    for (let artist of artistObjectClone?.artists?.artist) {
        const name = artist?.name;
        const imgUrl = artist?.image?.[4]?.['#text'];
        const tags = artist?.tags?.map((tag) => tag?.name).slice(0, 3);
        const singleArtist = {
            name: name,
            imgUrl: imgUrl ? imgUrl : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png',
            tags: tags,
        }
        artistsArray.push(singleArtist);
    }
    return artistsArray;
}