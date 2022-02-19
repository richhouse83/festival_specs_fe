import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { FestivalsList } from './components/Festivals/FestivalsList';
import { StagesList } from './components/Stages/StagesList';
import { ArtistsList } from './components/Artists/ArtistsList';
import { ArtistDetails } from './components/Artists/ArtistDetails';

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/festival_specs_fe" element={<FestivalsList />} />
            <Route
              path="/festival_specs_fe/festivals/:festivalName/stages/"
              element={<StagesList />}
            />
            <Route
              path="/festival_specs_fe/festivals/:festivalName/stages/:stageName/artists"
              element={<ArtistsList />}
            />
            <Route
              path="/festival_specs_fe/festivals/:festivalName/stages/:stageName/artists/:artistName"
              element={<ArtistDetails />}
            />
          </Routes>
    </div>
  );
}

export default App;
