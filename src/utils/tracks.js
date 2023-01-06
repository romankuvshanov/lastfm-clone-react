import { API_KEY } from "./constants";

/**
 * Adds covers and top tags to the given tracks object and return new js tracks object
 *
 * @param {object} tracksObject js object representing info about given top tracks
 * @return {object} js object representing info about given top tracks enriched with covers
 */
export async function enrichTracksWithTagsAndCovers(tracksObject) {
    const tracksObjectClone = structuredClone(tracksObject);
    
    await Promise.all(tracksObjectClone.tracks.track.map(track => fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${track.artist.name}&track=${track.name}&format=json&autocorrect=1`)
        .then((response) => response.json())
        .then((response) => {
            if (!response.error) {
                if (response?.track?.toptags?.tag?.length > 0)
                    track.tags = response?.track?.toptags?.tag;
                else
                    track.tags = [{name:'not available'},];
            if (response.track?.album?.image)
                track.covers = response.track?.album?.image;
            else
                track.covers = track?.image;
            }
            else {
                track.tags = [{name:'not available'},];
                track.covers = track?.image;
            }
        })))
        .catch((err) => {
            if (err instanceof Error) throw err;
        });

    return tracksObjectClone;
}

/**
 * Converts tracksObject to tracksArray for JSX component
 *
 * @param {object} tracksObject js object representing info about given top tracks
 * @return {Array} js array representing info about given top tracks ready for JSX component
 */
export function convertTracksObjectToArray(tracksObject) {
    const tracksObjectClone = structuredClone(tracksObject);
    let tracksArray = [];
    for (let track of tracksObjectClone?.tracks?.track) {
        const imgUrl = track?.covers?.[3]?.['#text'];
        const songTitle = track?.name;
        const artistTitle = track?.artist?.name;
        const tags = track?.tags?.map((tag) => tag?.name).slice(0, 3);
        const singleTrack = {
            imgUrl: imgUrl ? imgUrl : 'https://lastfm.freetls.fastly.net/i/u/300x300/4128a6eb29f94943c9d206c08e625904.png',
            songTitle: songTitle,
            artistTitle: artistTitle,
            tags: tags,
        }
        tracksArray.push(singleTrack);
    }

    return tracksArray;
}