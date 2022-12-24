import React from 'react';

/**
 * Returns React component with the searched track
 * @param {object} prop js object with info about found track
 * @return {JSX.Element} React component with the searched track
 */
export function TracksSearchCard(prop) {
    return (
        <div className="track">
            <button className="track__play-button" type="button"><img className="track__play-button-img" src="imgs/play-button.png" alt="Play icon"/></button>
            <img className="track__album-cover" src={prop.track.imgUrl} alt="Album cover" />
                <button className="track__like-button" type="button"><img className="track__like-button-img" src="imgs/heart-icon.png" alt="Like button" /></button>
                <span className="track_song-title">{prop.track.songTitle}</span>
                <span className="track_artist-title">{prop.track.artistName}</span>
                <span className="track_artist-duration">{prop.track.duration}</span>
        </div>);
}