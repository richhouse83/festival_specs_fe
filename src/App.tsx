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
          <Route path="/" element={<FestivalsList />} />
          <Route path="/festivals/:festivalName/stages/" element={<StagesList />} />
          <Route path="/festivals/:festivalName/stages/:stageName/artists" element={<ArtistsList />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
