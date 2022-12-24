import React from 'react';

/**
 * Returns React component with the header section
 * @return {JSX.Element} React component with the header section
 */
export function Header() {
    return (
        <header className="nav-bar">
            <a href="/" className="nav-bar__logo"><img src="imgs/last-fm-logo-vector-cropped.svg" alt="Last.fm logo" width="104" height="40" /></a>
            <nav>
                <ul className="nav-bar__links">
                    <li className="nav-bar__link-item"><a href="search.html" className="nav-bar__link-text"><img src="imgs/search-icon.png" alt="Search icon" width="14" height="14" /></a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text">Home</a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text">Live</a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text">Music</a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text">Charts</a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text">Events</a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text">Features</a></li>
                    <li className="nav-bar__link-item"><a href="/" className="nav-bar__link-text"><img className="nav-bar__avatar" src="imgs/avatar.webp" alt="User avatar icon" width="32" height="32" /></a></li>
                </ul>
            </nav>
        </header>);
}