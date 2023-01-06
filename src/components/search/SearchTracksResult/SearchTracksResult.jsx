import React from 'react';
import { Loading } from '../../common/Loading/Loading';
import { MoreLink } from '../MoreLink/MoreLink';
import { TracksSearchCard } from '../TracksSearchCard/TracksSearchCard';
import { hashCode } from '../../../utils/common';

/**
 * Returns React component with the search tracks results block
 * @param {object} prop js object with array of found tracks
 * @return {JSX.Element} React component with the search tracks results block
 */
export function SearchTracksResult(props) {
    return (
        <div id="js-container-tracks">
            <h2 className="search-results__headlines">Tracks</h2>
            <div id="js-tracks-container">
                {props.tracks ? props.tracks.map((track) => {
                    return <TracksSearchCard key={hashCode(track.songTitle + track.artistName)} track={track}></TracksSearchCard>
                }) : <Loading></Loading>}
            </div>
            <MoreLink linkTitle={"More tracks"}></MoreLink>
        </div>);
}