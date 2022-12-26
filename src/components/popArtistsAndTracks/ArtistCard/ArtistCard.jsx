import React from 'react';
import { hashCode } from '../../../utils/common';

/**
 * Returns React component for the given artist
 * @param  {object} props props with the array of artists
 * @return {JSX.Element} React component for the given artist
 */
export function ArtistCard(props) {
    return (
        <figure className="artist-card">
            <img className="artist-card__img" src={props.artist.imgUrl} alt="Artist" width="500" height="500" />
            <figcaption><a className="artist-card__caption" href="/">{props.artist.name}</a></figcaption>
            <ul className="artist-card__tags">
                {props.artist.tags.map((tag) => {
                    return <li key={tag} className="artist-card__tag"><a className="artist-card__link" href="/">{tag}</a></li>;
                })}
            </ul>
        </figure>);
}