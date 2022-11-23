const API_KEY = 'eeaaf21820d9a097b7a45e491cd6344b';

/**
 * Returns object with results of request
 *
 * @param {string} url Url you want to fetch
 * @return {object} object with results info for a given request url
 */
 async function getRequestResults(url, abortController) {
    try {
        const response = await fetch(url, { signal: abortController.signal });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Что-то пошло не так. Пожалуйста, попробуйте позже');
        }
    } catch (err) {
        if (err instanceof Error) showErrorMessage(err);
    }
}

/**
 * Show artists search results on the page
 *
 * @param {object} artistsObject object representing info about found artists
 */
function showArtistsResults(artistsObject) {
    const artistsContainer = document.getElementById('js-big-tile-container-artists');
    for (let artist of artistsObject.results.artistmatches.artist) {
        const artistTemplate =
            `<figure class="big-tile">
            <img class="big-tile__img" src="${(artist.image[artist.image.length - 1]['#text']) ? artist.image[artist.image.length - 1]['#text'] : 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'}" alt="Icon of a star represents empty artist pic" width="300" height="300">
            <div class="big-tile__caption">
            <figcaption><a class="big-tile__headline-link" href="#">${artist.name}</a></figcaption>
            <span class="big-tile__small-paragraph">${artist.listeners} listeners</span>
            </div>
        </figure>`;
        artistsContainer.insertAdjacentHTML('beforeend', artistTemplate);
    }
}

/**
 * Show albums search results on the page
 *
 * @param {object} albumsObject object representing info about found albums
 */
function showAlbumsResults(albumsObject) {
    const albumsContainer = document.getElementById('js-big-tile-container-albums');
    for (let album of albumsObject.results.albummatches.album) {
        const albumTemplate =
            `<figure class="big-tile">
            <img class="big-tile__img" src="${(album.image[album.image.length - 1]['#text']) ? album.image[album.image.length - 1]['#text'] : 'https://lastfm.freetls.fastly.net/i/u/300x300/c6f59c1e5e7240a4c0d427abd71f3dbb.png'}" alt="Picture of an album cover" width="300" height="300">
            <div class="big-tile__caption">
            <figcaption><a class="big-tile__headline-link" href="#">${album.name}</a></figcaption>
            <span class="big-tile__small-paragraph">${album.artist}</span>
            </div>
        </figure>`;
        albumsContainer.insertAdjacentHTML('beforeend', albumTemplate);
    }
}

/**
 * Adds covers and duration info to the given tracks object and return new js tracks object
 *
 * @param {object} tracksObject js object representing info about given top tracks
 * @return {object} js object representing info about given top tracks enriched with covers and duration info
 */
async function enrichTracksWithCoversAndDuration(tracksObject, abortController) {
    const tracksObjectClone = structuredClone(tracksObject);
    await Promise.all(tracksObjectClone.results.trackmatches.track
        .map(track => fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${track.artist}&track=${track.name}&format=json&autocorrect=1`, { signal: abortController.signal })
            .then((response) => response.json())
            .then((response) => {
                if (!response.error) {
                    if (response.track.duration === '0')
                        track.duration = '';
                    else
                        track.duration = `${new Date(+response.track.duration).getMinutes()}:${new Date(+response.track.duration).getSeconds().toString().padStart(2, '0')}`;
                    if (response.track?.album?.image || response.track?.album?.image === '') track.cover = response.track?.album?.image[response.track?.album?.image.length - 1]['#text'];
                    else track.cover = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
                }
            })))
        .then(() => { return Promise.resolve(tracksObjectClone) })
        .catch((err) => {
            if (err instanceof Error) showErrorMessage(err);
        });

    return tracksObjectClone;
}

/**
 * Show tracks search results on the page
 *
 * @param {object} tracksObject object representing info about found tracks
 */
function showTracksResults(tracksObject) {
    const tracksContainer = document.getElementById('js-tracks-container');
    for (let track of tracksObject.results.trackmatches.track) {
        if (!(track.cover)) track.cover = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
        if (!(track.duration)) track.duration = '';
        const trackTemplate =
            `<div class="track">
            <button class="track__play-button" type="button"><img class="track__play-button-img" src="imgs/play-button.png"></button>
            <img class="track__album-cover" src="${track.cover}">
            <button class="track__like-button" type="button"><img class="track__like-button-img" src="imgs/heart-icon.png"></button>
            <span class="track_song-title">${track.name}</span>
            <span class="track_artist-title">${track.artist}</span>
            <span class="track_artist-duration">${track.duration}</span>
        </div>`;
        tracksContainer.insertAdjacentHTML('beforeend', trackTemplate);
    }
}

/**
 * Shows error message to the user
 *
 */
function showErrorMessage(error) {
    if (error.name !== 'AbortError') {
        if (!document.getElementsByClassName('error-message').length) {
            const searchForm = document.getElementById('js-search-form');
            searchForm.insertAdjacentHTML('afterend', '<p class="error-message error-message_search-page">Something went wrong. Please, try again later...</p>');
            document.getElementById('js-artists-albums-tracks-container').style.display = 'none';
        }
    }
}

/**
 * Hides loading message for artist search result section
 *
 */
function hideLoadingMessageArtists() {
    const tracksLoadingMessage = document.getElementById('js-big-tile-container-artists').querySelector('.loading-message');
    tracksLoadingMessage.style.display = 'none';
}

/**
 * Hides loading message for albums search result section
 *
 */
function hideLoadingMessageAlbums() {
    const tracksLoadingMessage = document.getElementById('js-big-tile-container-albums').querySelector('.loading-message');
    tracksLoadingMessage.style.display = 'none';
}

/**
 * Hides loading message for albums search result section
 *
 */
function hideLoadingMessageTracks() {
    const tracksLoadingMessage = document.getElementById('js-tracks-container').querySelector('.loading-message');
    tracksLoadingMessage.style.display = 'none';
}

/**
 * Shows page headline with search query
 *
 * @param {string} query Your search query
 */
function showHeadlineWithQuery(query) {
    const headline = document.getElementById('js-search-page-headline');
    headline.innerText = `Search results for "${query}"`;
    headline.style.display = 'block';
}

/**
 * Shows albums artists tracks container
 *
 */
function showAlbumsArtistsTracksContainer() {
    const albumsArtistsTracksContainer = document.getElementById('js-artists-albums-tracks-container');
    albumsArtistsTracksContainer.style.display = 'block';
}

/**
 * Clears any previous results on the page if any exists
 *
 */
function clearAnyPreviousResults() {
    for (let item of document.getElementsByClassName('error-message')) item.remove();
    const loaderHTML =
        `<div class="loading-message">
        <div class="lds-dual-ring"></div>
        <p>Loading... Please, wait</p>
    </div>`;
    document.getElementById('js-big-tile-container-artists').innerHTML = loaderHTML;
    document.getElementById('js-big-tile-container-albums').innerHTML = loaderHTML;
    document.getElementById('js-tracks-container').innerHTML = loaderHTML;
}

/**
 * Updates visual display of actual search menu item
 * 
 * @param {MouseEvent} event Event that caused function call
 */
function updateActiveMenuElement(event) {
    for (let item of document.getElementsByClassName('search-results-nav__link'))
        item.classList.remove('search-results-nav__link--active');
    event.currentTarget.classList.add('search-results-nav__link--active');
}

let controller = new AbortController();
let isLoading = false;
const searchButton = document.getElementById('js-search-form__search-button');
searchButton.addEventListener('click', () => {
    if (isLoading) {
        if (controller) controller.abort();
        controller = new AbortController();   
    }
    isLoading = true;
    const searchInput = document.getElementById('js-search-query');
    showHeadlineWithQuery(searchInput.value);
    showAlbumsArtistsTracksContainer();
    clearAnyPreviousResults();
    

    const artistsObject = getRequestResults(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchInput.value}&api_key=${API_KEY}&format=json&limit=8`, controller)
        .catch((err) => showErrorMessage(err));
    const albumsObject = getRequestResults(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchInput.value}&api_key=${API_KEY}&format=json&limit=8`, controller)
        .catch((err) => showErrorMessage(err));
    const tracksObject = getRequestResults(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchInput.value}&api_key=${API_KEY}&format=json&limit=10`, controller).catch((err) => showErrorMessage(err))
        .then((tracksObject) => enrichTracksWithCoversAndDuration(tracksObject, controller))
        .catch((err) => showErrorMessage(err));

    Promise.all([artistsObject, albumsObject, tracksObject])
        .then(([artistsObject, albumsObject, tracksObject]) => {
            showAlbumsArtistsTracksContainer();
            clearAnyPreviousResults();
            hideLoadingMessageArtists();
            showArtistsResults(artistsObject);
            hideLoadingMessageAlbums();
            showAlbumsResults(albumsObject);
            hideLoadingMessageTracks();
            showTracksResults(tracksObject);
            isLoading = false;
        })
        .catch((err) => showErrorMessage(err));
});

// Prevents default form behaviour
const searchForm = document.getElementById('js-search-form');
searchForm.addEventListener('submit', (event) => event.preventDefault());

// Block of code for handling search menu items logic
const topResultsButton = document.getElementById('js-top-results-button');
topResultsButton.addEventListener('click', (event) => {
    updateActiveMenuElement(event);
    document.getElementById('js-container-artists').style.display = 'block';
    document.getElementById('js-container-albums').style.display = 'block';
    document.getElementById('js-container-tracks').style.display = 'block';
});

const topArtistsButton = document.getElementById('js-artists-button');
topArtistsButton.addEventListener('click', (event) => {
    updateActiveMenuElement(event);
    document.getElementById('js-container-artists').style.display = 'block';
    document.getElementById('js-container-albums').style.display = 'none';
    document.getElementById('js-container-tracks').style.display = 'none';
});

const topAlbumsButton = document.getElementById('js-albums-button');
topAlbumsButton.addEventListener('click', (event) => {
    updateActiveMenuElement(event);
    document.getElementById('js-container-artists').style.display = 'none';
    document.getElementById('js-container-albums').style.display = 'block';
    document.getElementById('js-container-tracks').style.display = 'none';
});

const topTracksButton = document.getElementById('js-tracks-button');
topTracksButton.addEventListener('click', (event) => {
    updateActiveMenuElement(event);
    document.getElementById('js-container-artists').style.display = 'none';
    document.getElementById('js-container-albums').style.display = 'none';
    document.getElementById('js-container-tracks').style.display = 'block';
});