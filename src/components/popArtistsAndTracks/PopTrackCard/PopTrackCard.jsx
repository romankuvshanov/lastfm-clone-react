import React from 'react';
import { hashCode } from '../../../utils/common';

/**
 * Returns React component for the given track
 * @param  {Array} props js props object with the info of the given track
 * @return {JSX.Element} React component for the given track
 */
export function PopTrackCard(props) {
    return (
        <div className="song-card">
          <img className="song-card__img" src={props.track.imgUrl} alt="Icon of the song" width="300" height="300" />
          <div className="song-card__text-info">
            <p><a className="song-card__song-title" href="/">{props.track.songTitle}</a></p>
            <p><a className="song-card__artist-title" href="/">{props.track.artistTitle}</a></p>
            <ul className="song-card__tags">{
                props.track.tags.map((tag) => {
                    return (<li key={hashCode(tag)} className="song-card__tag"><a className="song-card__link" href="/">{tag}</a></li>);
                })}
            </ul>
          </div>
        </div>
    );
}