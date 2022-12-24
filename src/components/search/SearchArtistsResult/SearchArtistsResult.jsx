import React from 'react';
import { ArtistAndAlbumSearchCard } from '../ArtistAndAlbumSearchCard/ArtistAndAlbumSearchCard';
import { Loading } from '../../common/Loading/Loading';
import { MoreLink } from '../MoreLink/MoreLink';
import { hashCode } from '../../../utils/common';

/**
 * Returns React component with the search artists results
 * @param {object} prop js object with array of found artists
 * @return {JSX.Element} React component with the search artists results
 */
export function SearchArtistsResult(props) {
    return (
        <div id="js-container-artists">
            <h2 className="search-results__headlines">Artists</h2>
            <div className="big-tile-container" id="js-big-tile-container-artists">
                {props.artists ?
                    props.artists.map((artist) => {
                        return <ArtistAndAlbumSearchCard key={hashCode(artist.headline + artist.paragraph)} tile={artist}></ArtistAndAlbumSearchCard>
                    })
                    : <Loading></Loading>}
            </div>
            <MoreLink linkTitle={"More artists"}></MoreLink>
        </div>);
}