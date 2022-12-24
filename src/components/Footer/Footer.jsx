import React from 'react';

/**
 * Returns React component with the footer section
 * @return {JSX.Element} React component with the footer section
 */
export function Footer() {
    return (
        <footer className="footer">
            <nav className="site-nav">
                <section>
                    <h2 className="site-nav__title">COMPANY</h2>
                    <ul>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">About Last.fm</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Contact us</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Jobs</a></li>
                    </ul>
                </section>
                <section>
                    <h2 className="site-nav__title">HELP</h2>
                    <ul>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Track My Music</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Community Support</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Community Guidelines</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Help</a></li>
                    </ul>
                </section>
                <section>
                    <h2 className="site-nav__title">GOODIES</h2>
                    <ul>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Download Scrobbler</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Developer API</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Free Music Downloads</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Merchandise</a></li>
                    </ul>
                </section>
                <section>
                    <h2 className="site-nav__title">ACCOUNT</h2>
                    <ul>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Inbox</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Settings</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Last.fm Pro</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Logout</a></li>
                    </ul>
                </section>
                <section>
                    <h2 className="site-nav__title">FOLLOW US</h2>
                    <ul>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Facebook</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Twitter</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">Instagram</a></li>
                        <li className="site-nav__list-element"><a className="site-nav__link" href="/">YouTube</a></li>
                    </ul>
                </section>
            </nav>
            <section className="bottom-nav">
                <div>
                    <nav className="bottom-nav__lang-nav">
                        <ul>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link bottom-nav__lang-link--active"
                                href="/">English</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Deutsch</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Español</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Français</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Italiano</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">日本語</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Polski</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Português</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Русский</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Svenska</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">Türkçe</a></li>
                            <li className="bottom-nav__lang-link-elem"><a className="bottom-nav__lang-link" href="/">简体中文</a></li>
                        </ul>
                    </nav>
                    <a className="bottom-nav__timezone-link" href="/">Time zone: <span
                        className="bottom-nav__timezone-current">Asia/Yekaterinburg</span></a>
                    <div className="bottom-nav__legal-nav-container">
                        <a className="bottom-nav__legal-nav_link" href="/">CBS Interactive</a>
                        <p className="bottom-nav__legal-nav_paragraph">© 2022 Last.fm Ltd. All rights reserved</p>
                        <nav className="bottom-nav__legal-nav">
                            <ul className="bottom-nav__legal-nav_links">
                                <li className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">Terms of
                                    Use</a></li>
                                <li className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">Privacy
                                    Policy</a></li>
                                <li className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">Legal
                                    Policies</a></li>
                                <li className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">Cookies
                                    Policy</a></li>
                                <li className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">Jobs at
                                    ViacomCBS</a></li>
                                <li className="bottom-nav__legal-nav_link-elem"><a className="bottom-nav__legal-nav_link" href="/">Last.fm
                                    Music</a></li>
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