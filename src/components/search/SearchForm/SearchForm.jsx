import React, { useState } from 'react';

/**
 * Returns React component with the search form for the search page
 * @param {object} prop js object with function for search request update for the parent component
 * @return {JSX.Element} React component with the search form for the search page
 */
export function SearchForm(props) {
    const [request, setRequest] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        props.setSearchRequest(request);
    }

    return (
        <form className="search-form" id="js-search-form" onSubmit={handleSubmit}>
            <input className="search-form__search-input" id="js-search-query" name="search-query"
                placeholder="Search for music…" onChange={(event) => setRequest(event.target.value)}/>
            <button className="search-form__search-button" type="reset"><img className="search-form__search-button-img"
                src="imgs/x-icon.png" alt="Icon of the x reset button" width="32" height="32" /></button>
            <button className="search-form__search-button" id="js-search-form__search-button" type="submit"><img
                className="search-form__search-button-img" src="imgs/search-icon-black.png" alt="Icon of the search button"
                width="32" height="32" /></button>
        </form>);
}