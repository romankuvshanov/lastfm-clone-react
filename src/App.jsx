import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { PopTracksAndArtists } from './components/popArtistsAndTracks/PopTracksAndArtists/PopTracksAndArtists';
import { SearchPage } from './components/search/SearchPage/SearchPage';

/**
 * Returns React component with the whole app
 * @return {JSX.Element} React component with the whole app
 */
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<PopTracksAndArtists />}></Route>
                <Route path='/search' element={<SearchPage />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;