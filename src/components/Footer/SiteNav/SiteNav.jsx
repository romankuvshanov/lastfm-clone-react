import React from 'react';

/**
 * Returns React component with the site nav element for the footer section
 * @param props js object with navElement info (title and list of link titles)
 * @return {JSX.Element} React component with the site nav element for the footer section
 */
export function SiteNav(props) {
    return (
        <section>
            <h2 className="site-nav__title">{props.navElem.title}</h2>
            <ul>
                {props.navElem.links.map((link) => {
                    return (<li key={link} className="site-nav__list-element"><a className="site-nav__link" href="/">{link}</a></li>);
                })}
            </ul>
        </section>);
}