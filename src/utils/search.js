import { API_KEY } from "./constants";
import { getRequestResults } from "./common";

/**
 * Returns array with the search request results for artists, albums and tracks
 *
 * @param {request} string Search request
 * @param {AbortController} abortController AbortController for cancelling the request
 * @return {Object} Object with three arrays with the search request results for artists, albums and tracks
 */
export async function getSearchRequestResults(request, abortController) {
    const artistsObject = getRequestResults(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${request}&api_key=${API_KEY}&format=json&limit=8`, abortController)
        .catch((err) => {
            throw err;
        });
    
    const albumsObject = getRequestResults(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${request}&api_key=${API_KEY}&format=json&limit=8`, abortController)
        .catch((err) => {
            throw err;
        });
    const tracksObject = getRequestResults(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${request}&api_key=${API_KEY}&format=json&limit=10`, abortController)
        .then((tracksObject) => enrichTracksWithCoversAndDuration(tracksObject, abortController))
        .catch((err) => {
            throw err;
        });

    return Promise.all([artistsObject, albumsObject, tracksObject])
        .then(([artistsObject, albumsObject, tracksObject]) => {
            return ({
                artists: convertArtistsObjectToArray(artistsObject),
                albums: convertAlbumsObjectToArray(albumsObject),
                tracks: convertTracksObjectToArray(tracksObject),
            });
        })
        .catch((err) => {
            throw err;
        });
}

/**
 * Adds covers and duration info to the given tracks object and return new js tracks object
 *
 * @param {object} tracksObject js object representing info about given top tracks
 * @param {AbortController} abortController AbortController for cancelling the request
 * @return {object} js object representing info about given top tracks enriched with covers and duration info
 */
async function enrichTracksWithCoversAndDuration(tracksObject, abortController) {
    const tracksObjectClone = structuredClone(tracksObject);
    await Promise.all(tracksObjectClone?.results?.trackmatches?.track
        .map(track => fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${track.artist}&track=${track.name}&format=json&autocorrect=1`, {signal: abortController?.signal})
            .then((response) => response.json())
            .then((response) => {
                if (!response.error) {
                    if (response?.track?.duration === '0')
                        track.duration = '';
                    else
                        track.duration = `${new Date(+response?.track?.duration).getMinutes()}:${new Date(+response?.track?.duration).getSeconds().toString().padStart(2, '0')}`;
                    if (response.track?.album?.image || response.track?.album?.image === '') track.cover = response.track?.album?.image[response.track?.album?.image.length - 1]['#text'];
                    else track.cover = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
                }
            })))
        .then(() => { return Promise.resolve(tracksObjectClone) })
        .catch((err) => {
            throw err;
        });

    return tracksObjectClone;
}

/**
 * Converts artistsObject to artistsArray for JSX component
 *
 * @param {object} artistsObject js object representing info about given found artists
 * @return {Array} js array representing info about given found artists ready for JSX component
 */
function convertArtistsObjectToArray(artistsObject) {
    const artistObjectClone = structuredClone(artistsObject);
    let artistsArray = [];
    for (let artist of artistObjectClone?.results?.artistmatches?.artist) {
        const headline = artist?.name;
        const paragraph = artist?.listeners;
        const imgUrl = artist?.image?.[4]?.['#text'];
        const singleArtist = {
            headline: headline,
            imgUrl: imgUrl ? imgUrl : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png',
            paragraph: paragraph,
        }
        artistsArray.push(singleArtist);
    }
    return artistsArray;
}

/**
 * Converts albumsObject to albumsArray for JSX component
 *
 * @param {object} albumsObject js object representing info about given found albums
 * @return {Array} js array representing info about given found albums ready for JSX component
 */
function convertAlbumsObjectToArray(albumsObject) {
    const albumsObjectClone = structuredClone(albumsObject);
    let albumsArray = [];
    for (let album of albumsObjectClone?.results?.albummatches?.album) {
        const headline = album?.name;
        const paragraph = album?.artist;
        const imgUrl = album?.image?.[3]?.['#text'];
        const singleAlbum = {
            headline: headline,
            imgUrl: imgUrl ? imgUrl : 'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png',
            paragraph: paragraph,
        }
        albumsArray.push(singleAlbum);
    }
    return albumsArray;
}

/**
 * Converts tracksObject to tracksArray for JSX component
 *
 * @param {object} tracksObject js object representing info about given found tracks
 * @return {Array} js array representing info about given found tracks ready for JSX component
 */
function convertTracksObjectToArray(tracksObject) {
    const tracksObjectClone = structuredClone(tracksObject);
    let tracksArray = [];
    for (let track of tracksObjectClone?.results?.trackmatches?.track) {
        const songTitle = track?.name;
        const artistName = track?.artist;
        const duration = track?.duration;
        const imgUrl = track?.cover;
        const singleTrack = {
            songTitle: songTitle,
            imgUrl: imgUrl ? imgUrl : 'https://lastfm.freetls.fastly.net/i/u/300x300/4128a6eb29f94943c9d206c08e625904.png',
            artistName: artistName,
            duration: duration,
        }
        tracksArray.push(singleTrack);
    }
    return tracksArray;
}