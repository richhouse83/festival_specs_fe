import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { FestivalsList } from './components/Festivals/FestivalsList';
import { StagesList } from './components/Stages/StagesList';
import { ArtistsList } from './components/Artists/ArtistsList';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/festival_specs_fe" element={<FestivalsList />} />
          <Route path="/festival_specs_fe/festivals/:festivalName/stages/" element={<StagesList />} />
          <Route path="/festival_specs_fe/festivals/:festivalName/stages/:stageName/artists" element={<ArtistsList />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
