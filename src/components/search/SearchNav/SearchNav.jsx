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

    const navLinks = [
        {
            title: 'Top Results',
            id: 'js-top-results-button',
        },
        {
            title: 'Artists',
            id: 'js-artists-button',
        },
        {
            title: 'Albums',
            id: 'js-albums-button',
        },
        {
            title: 'Tracks',
            id: 'js-tracks-button',
        },
    ];

    return (
        <nav className="search-results-nav">
            <ul>
                {navLinks.map((link) => {
                    return (<li key={link.id} className="search-results-nav__element"><a onClick={handleClick} className={"search-results-nav__link " + (currentActiveNav === link.id ? "search-results-nav__link--active" : null)}
                        href="/" id={link.id}>{link.title}</a></li>);
                })}
            </ul>
        </nav>);
}