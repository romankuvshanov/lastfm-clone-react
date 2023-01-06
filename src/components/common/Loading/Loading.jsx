import React from 'react';

/**
 * Returns React component with the loading message
 * @return {JSX.Element} React component with the loading message
 */
export function Loading() {
    return (
        <div className="loading-message">
            <div className="lds-dual-ring"></div>
            <p>Loading... Please, wait</p>
        </div>);
}