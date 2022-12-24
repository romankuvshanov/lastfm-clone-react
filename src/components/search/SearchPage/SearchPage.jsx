import React, { useEffect, useState } from 'react';
import { SearchNav } from '../SearchNav/SearchNav';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchArtistsResult } from '../SearchArtistsResult/SearchArtistsResult';
import { SearchAlbumsResult } from '../SearchAlbumsResult/SearchAlbumsResult';
import { SearchTracksResult } from '../SearchTracksResult/SearchTracksResult';
import { ErrorMessage } from '../../common/ErrorMessage/ErrorMessage';
import { getSearchRequestResults } from '../../../utils/search';

/**
 * Returns React component with whole search page
 * @return {JSX.Element} React component with the whole search page
 */
export function SearchPage() {
    const [searchRequest, setSearchRequest] = useState();
    const [showOptions, setShowOptions] = useState('js-top-results-button');
    const [requestResults, setRequestResults] = useState();
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (searchRequest !== undefined) {
            setRequestResults();
            getSearchRequestResults(searchRequest)
                .then((res) => setRequestResults(res))
                .catch(() => setHasError(true));
        }
    }, [searchRequest]);

    return (
        <>
            {searchRequest && <h1 className="search-page-headline" id="js-search-page-headline">Search results for “{searchRequest}”</h1>}
            <SearchNav setShowOptions={setShowOptions}></SearchNav>
            <section className="search-results-container">
                <div className="search-results">
                    <SearchForm setSearchRequest={setSearchRequest}></SearchForm>
                    {hasError ? <ErrorMessage></ErrorMessage> :
                        searchRequest &&
                        <div className="artists-albums-tracks-container" id="js-artists-albums-tracks-container">
                            {(showOptions === 'js-top-results-button' || showOptions === 'js-artists-button') && <SearchArtistsResult artists={requestResults?.artists}></SearchArtistsResult>}

                            {(showOptions === 'js-top-results-button' || showOptions === 'js-albums-button') && <SearchAlbumsResult albums={requestResults?.albums}></SearchAlbumsResult>}

                            {(showOptions === 'js-top-results-button' || showOptions === 'js-tracks-button') && <SearchTracksResult tracks={requestResults?.tracks}></SearchTracksResult>}
                        </div>
                    }
                </div>
            </section>
        </>);
}