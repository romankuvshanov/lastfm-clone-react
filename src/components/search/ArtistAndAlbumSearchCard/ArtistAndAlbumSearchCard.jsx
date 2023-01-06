import React from 'react';

/**
 * Returns React component with the artist or album search card
 * @param {object} prop js object representing info about found artist or album
 * @return {JSX.Element} React component with the artist or album search card
 */
export function ArtistAndAlbumSearchCard(prop) {
    return (
        <figure className="big-tile">
            <img className="big-tile__img" src={prop.tile.imgUrl} alt="Icon of a star represents empty artist pic" width="300" height="300" />
            <div className="big-tile__caption">
                <figcaption><a className="big-tile__headline-link" href="/">{prop.tile.headline}</a></figcaption>
                <span className="big-tile__small-paragraph">{prop.tile.paragraph}</span>
            </div>
        </figure>);
}