import React from 'react';
import { MoreLink } from '../MoreLink/MoreLink';
import { Loading } from '../../common/Loading/Loading';
import { ArtistAndAlbumSearchCard } from '../ArtistAndAlbumSearchCard/ArtistAndAlbumSearchCard';
import { hashCode } from '../../../utils/common';

/**
 * Returns React component with the search albums result
 * @param {object} prop js object with array of found albums
 * @return {JSX.Element} React component with the search albums result
 */
export function SearchAlbumsResult(props) {
    return (
        <div id="js-container-albums">
            <h2 className="search-results__headlines">Albums</h2>
            <div className="big-tile-container" id="js-big-tile-container-albums">
                {props.albums ?
                    props.albums.map((album) => {
                        return <ArtistAndAlbumSearchCard key={hashCode(album.headline + album.paragraph)} tile={album}></ArtistAndAlbumSearchCard>
                    })
                    : <Loading></Loading>}
            </div>

            <MoreLink linkTitle={"More albums"}></MoreLink>
        </div>);
}