import React from 'react';
import { SiteNav } from './SiteNav/SiteNav';

/**
 * Returns React component with the footer section
 * @return {JSX.Element} React component with the footer section
 */
export function Footer() {
    const languages = ['Deutsch', 'Español', 'Français', 'Italiano', '日本語', 'Polski', 'Português', 'Русский', 'Svenska', 'Türkçe', '简体中文'];
    const bottomNavLinks = ['Terms of Use', 'Privacy Policy', 'Legal Policies', 'Cookies Policy', 'Jobs at ViacomCBS', 'Last.fm Music'];
    const siteNavElems = [
        {
            title: 'COMPANY',
            links: ['About Last.fm', 'Contact us', 'Jobs']
        },
        {
            title: 'HELP',
            links: ['Track My Music', 'Community Support', 'Community Guidelines', 'Help']
        },
        {
            title: 'GOODIES',
            links: ['Download Scrobbler', 'Developer API', 'Free Music Downloads', 'Merchandise']
        },
        {
            title: 'ACCOUNT',
            links: ['Inbox', 'Settings', 'Last.fm Pro', 'Logout']
        },
        {
            title: 'FOLLOW US',
            links: ['Facebook', 'Twitter', 'Instagram', 'YouTube']
        },
    ]

    return (
        <footer className="footer">
            <nav className="site-nav">
                {siteNavElems.map((navElem) => {
                    return (<SiteNav key={navElem.title} navElem={navElem}></SiteNav>);
                })}
            </nav>
            <section className="bottom-nav">
                <div>
                    <nav className="bottom-nav__lang-nav">
                        <ul>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link bottom-nav__lang-link--active"
                                href="/">English</a></li>
                            {languages.map((language) => {
                                return (<li key={language} className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">{language}</a></li>);
                            })}
                        </ul>
                    </nav>
                    <a className="bottom-nav__timezone-link" href="/">Time zone: <span
                        className="bottom-nav__timezone-current">Asia/Yekaterinburg</span></a>
                    <div className="bottom-nav__legal-nav-container">
                        <a className="bottom-nav__legal-nav_link" href="/">CBS Interactive</a>
                        <p className="bottom-nav__legal-nav_paragraph">© 2022 Last.fm Ltd. All rights reserved</p>
                        <nav className="bottom-nav__legal-nav">
                            <ul className="bottom-nav__legal-nav_links">
                                {bottomNavLinks.map((link) => {
                                    return (<li key={link} className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">{link}</a></li>);
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="bottom-nav__audioscrobbler">
                    <p className="bottom-nav__sign">Audioscrobbler</p>
                    <img src="imgs/iconmonstr-last-fm-1-cropped.svg" alt="Last.fm short logo" width="37" height="20" />
                </div>
            </section>
        </footer>);
}