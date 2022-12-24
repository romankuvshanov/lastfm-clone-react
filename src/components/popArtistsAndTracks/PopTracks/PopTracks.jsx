import React, { useEffect, useState } from 'react';
import { API_KEY } from '../../../utils/constants';
import { getRequestResults } from '../../../utils/common';
import { enrichTracksWithTagsAndCovers } from '../../../utils/tracks';
import { convertTracksObjectToArray } from '../../../utils/tracks';
import { hashCode } from '../../../utils/common';
import { PopTrackCard } from '../PopTrackCard/PopTrackCard';
import { Loading } from '../../common/Loading/Loading';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage'

/**
 * Returns React component with the popTracks fragment of the page
 * @return {JSX.Element} React component with the popTracks fragment of the page
 */
export function PopTracks() {
    const [tracksObject, setTracksObject] = useState();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        getRequestResults(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&limit=15&format=json`)
            .then((res) => enrichTracksWithTagsAndCovers(res))
            .then((res) => convertTracksObjectToArray(res))
            .then((res) => setTracksObject(res))
            .catch(() => setHasError(true));
    }, []);


    if (hasError) {
        return <ErrorMessage />
    }
    else {
        if (tracksObject) {
            return (<>
                {
                    tracksObject.map((track) => {
                        return <PopTrackCard key={hashCode(track.artistTitle + track.songTitle)} track={track} />
                    })
                }
            </>);
        }
        else {
            return <Loading></Loading>;
        }
    }
}