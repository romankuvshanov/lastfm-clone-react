// Here goes my js code for index.html

const API_KEY = 'eeaaf21820d9a097b7a45e491cd6344b';

/**
 * Returns js object with 12 top artists
 *
 * @return {object} js object representing info about 12 top artists
 */
async function getTopArtists() {
    let url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`;
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Что-то пошло не так. Пожалуйста, попробуйте позже');
        }
    } catch (err) {
        if (err instanceof Error) showErrorMessage();
    }
}

/**
 * Ads tags to the given artists object and return new js artists object
 *
 * @param {object} artistsObject js object representing info about given top artists
 * @return {object} js object representing info about given top artists enriched with tags
 */
async function enrichArtistsWithTags(artistsObject) {
    const artistObjectClone = structuredClone(artistsObject);

    await Promise.all(artistObjectClone.artists.artist
        .map(artist => fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist.name}&api_key=${API_KEY}&format=json&autocorrect=1`)
            .then((response) => response.json())
            .then((response) => {
                artist.tags = response.toptags.tag;
            })))
        .catch((err) => {
            if (err instanceof Error) showErrorMessage();
        });

    return artistObjectClone;
}

/**
 * Adds artists to the page
 *
 * @param {object} artistsObject object representing info about given top artists
 */
function addArtistsToThePage(artistsObject) {
    const artistsContainer = document.getElementById('js-hot-rn__artists-container');
    for (let artist of artistsObject.artists.artist) {
        const artistTemplate =
            `<figure class="artist-card">
            <img class="artist-card__img" src="${artist.image[artist.image['length'] - 1]['#text']}" alt="Photo of the artist" width="300" height="300">
            <figcaption><a class="artist-card__caption" href="#">${artist.name}</a></figcaption>
            <ul class="artist-card__tags">
            <li class="artist-card__tag"><a class="artist-card__link" href="#">${artist.tags[0].name}</a></li>
            <li class="artist-card__tag"><a class="artist-card__link" href="#">${artist.tags[1].name}</a></li>
            <li class="artist-card__tag"><a class="artist-card__link" href="#">${artist.tags[2].name}</a></li>
            </ul>
        </figure>`;
        artistsContainer.insertAdjacentHTML('beforeend', artistTemplate);
    }
}

/**
 * Returns js object with 18 top tracks
 *
 * @return {object} js object representing info about 18 top tracks
 */
async function getTopTracks() {
    let url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=18`;
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Что-то пошло не так. Пожалуйста, попробуйте позже');
        }
    } catch (err) {
        if (err instanceof Error) showErrorMessage();
    }
}

/**
 * Adds covers and top tags to the given tracks object and return new js tracks object
 *
 * @param {object} tracksObject js object representing info about given top tracks
 * @return {object} js object representing info about given top tracks enriched with covers
 */
async function enrichTracksWithTagsAndCovers(tracksObject) {
    const tracksObjectClone = structuredClone(tracksObject);

    await Promise.all(tracksObjectClone.tracks.track.map(track => fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${track.artist.name}&track=${track.name}&format=json&autocorrect=1`)
        .then((response) => response.json())
        .then((response) => {
            track.tags = response.track.toptags.tag;
            if (response.track?.album?.image)
                track.covers = response.track?.album?.image;
            else
                track.covers = track.image;
        })))
        .catch((err) => {
            if (err instanceof Error) showErrorMessage();
        });

    return tracksObjectClone;
}

/**
 * Adds tracks to the page
 *
 * @param {object} tracksObject object representing info about given top tracks
 */
function addTracksToThePage(tracksObject) {
    const tracksContainer = document.getElementById('js-pop-tracks__song-container');
    for (let track of tracksObject.tracks.track) {
        const trackTemplate =
            `<div class="song-card">
            <img class="song-card__img" src="${track.covers[track.covers['length'] - 1]['#text']}" alt="Icon of the song" width="300" height="300">
            <div class="song-card__text-info">
            <p><a class="song-card__song-title" href="#">${track.name}</a></p>
            <p><a class="song-card__artist-title" href="#">${track.artist.name}</a></p>
            <ul class="song-card__tags">
                <li class="song-card__tag"><a class="song-card__link" href="#">${track.tags[0].name}</a></li>
                <li class="song-card__tag"><a class="song-card__link" href="#">${track.tags[1].name}</a></li>
                <li class="song-card__tag"><a class="song-card__link" href="#">${track.tags[2].name}</a></li>
            </ul>
            </div>
        </div>`;
        tracksContainer.insertAdjacentHTML('beforeend', trackTemplate);
    }
}

/**
 * Shows error message to the user
 */
function showErrorMessage() {
    const artistsContainer = document.getElementById('js-hot-rn__artists-container');
    const tracksContainer = document.getElementById('js-pop-tracks__song-container');
    artistsContainer.innerHTML = '<p class="error-message">Something went wrong. Please, try again later...</p>';
    tracksContainer.innerHTML = '<p class="error-message">Something went wrong. Please, try again later...</p>';
}

/**
 * Hides loading message for artists section
 *
 */
function hideLoadingMessageArtists() {
    const artistsLoadingMessage = document.querySelector('#js-hot-rn__artists-container .loading-message');
    artistsLoadingMessage.style.display = 'none';
}

/**
 * Hides loading message for tracks section
 *
 */
function hideLoadingMessageTracks() {
    const tracksLoadingMessage = document.querySelector('#js-pop-tracks__song-container .loading-message');
    tracksLoadingMessage.style.display = 'none';
}

const topArtists = getTopArtists().then((res) => enrichArtistsWithTags(res)).catch(showErrorMessage);
const topTracks = getTopTracks().then((res) => enrichTracksWithTagsAndCovers(res)).catch(showErrorMessage);

Promise.all([topArtists, topTracks]).then(([topArtists, topTracks]) => {
    hideLoadingMessageArtists();
    hideLoadingMessageTracks();
    addArtistsToThePage(topArtists);
    addTracksToThePage(topTracks);
}).catch(showErrorMessage);