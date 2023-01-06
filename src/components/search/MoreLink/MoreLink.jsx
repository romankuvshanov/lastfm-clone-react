import React from 'react';

/**
 * Returns React component with the link for more search results
 * @param {object} prop js object with linkTitle
 * @return {JSX.Element} React component with the link for more search results
 */
export function MoreLink(props) {
    return (
        <div className="search-results__more-container">
            <a className="search-results__more-link" href="/">{props.linkTitle}</a>
            <img className="search-results__more-img" src="imgs/arrow-small-right.png" alt="Right arrow icon" />
        </div>);
}