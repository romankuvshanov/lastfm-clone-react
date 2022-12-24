import React from 'react';
import { PopArtists } from '../PopArtists/PopArtists';
import { PopTracks } from '../PopTracks/PopTracks';

/**
 * Returns React component with the pop tracks and artists block
 * @return {JSX.Element} React component with the pop tracks and artists block
 */
export function PopTracksAndArtists() {
    return (
        <>
            <h1 className="page-headline">Music</h1>
            <section className="hot-rn">
                <h2 className="section-headline">Hot right now</h2>
                <div className="hot-rn__artists-container" id="js-hot-rn__artists-container">
                    <PopArtists></PopArtists>
                </div>
            </section>
            <section className="pop-tracks">
                <h2 className="section-headline">Popular tracks</h2>
                <div className="pop-tracks__song-container" id="js-pop-tracks__song-container">
                    <PopTracks></PopTracks>
                </div>
            </section>
        </>);
}