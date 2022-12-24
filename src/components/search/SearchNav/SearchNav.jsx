import React, { useState } from 'react';

/**
 * Returns React component with the navigation block for search page
 * @param {object} prop js object with function for currentActiveNav update for the parent component
 * @return {JSX.Element} React component with the navigation block for search page
 */
export function SearchNav(props) {
    const [currentActiveNav, setCurrentActiveNav] = useState('js-top-results-button');

    function handleClick(event) {
        event.preventDefault();
        setCurrentActiveNav(event.target.id);
        props.setShowOptions(event.target.id);
    }

    return (
        <nav className="search-results-nav">
            <ul>
                <li className="search-results-nav__element"><a onClick={handleClick} className={"search-results-nav__link " + (currentActiveNav === "js-top-results-button" ? "search-results-nav__link--active" : null)}
                    href="/" id="js-top-results-button">Top Results</a></li>
                <li className="search-results-nav__element"><a onClick={handleClick} className={"search-results-nav__link " + (currentActiveNav === "js-artists-button" ? "search-results-nav__link--active" : null)}
                    href="/" id="js-artists-button">Artists</a></li>
                <li className="search-results-nav__element"><a onClick={handleClick} className={"search-results-nav__link " + (currentActiveNav === "js-albums-button" ? "search-results-nav__link--active" : null)}
                    href="/" id="js-albums-button">Albums</a></li>
                <li className="search-results-nav__element"><a onClick={handleClick} className={"search-results-nav__link " + (currentActiveNav === "js-tracks-button" ? "search-results-nav__link--active" : null)}
                    href="/" id="js-tracks-button">Tracks</a></li>
            </ul>
        </nav>);
}