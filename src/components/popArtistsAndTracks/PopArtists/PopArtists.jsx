import React from 'react';
import { useState, useEffect } from "react";
import { API_KEY } from '../../../utils/constants.js';
import { Loading } from '../../common/Loading/Loading';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage.jsx';
import { ArtistCard } from '../ArtistCard/ArtistCard';
import { getRequestResults } from '../../../utils/common';
import { enrichArtistsWithTags } from '../../../utils/artists';
import { convertArtistsObjectToArray } from '../../../utils/artists';
import { hashCode } from '../../../utils/common';

/**
 * Returns React component with the popartists fragment of the page
 * @return {JSX.Element} React component with the popartists fragment of the page
 */
export function PopArtists() {
    const [artistsObject, setArtistsObject] = useState();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        getRequestResults(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`)
            .then((res) => enrichArtistsWithTags(res))
            .then((res) => convertArtistsObjectToArray(res))
            .then((res) => setArtistsObject(res))
            .catch(() => setHasError(true));
    }, []);

    if (hasError) {
        return <ErrorMessage />;
    } else {
        if (artistsObject) {
            return <> {
                artistsObject.map((artist) => {
                    return <ArtistCard key={hashCode(artist.name)} artist={artist} />;
                })}
            </>
        }
        else {
            return <Loading />;
        }
    }
}