import { useState } from 'react';
import { AppShell } from '@mantine/core';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { FestivalsList } from './components/Festivals/FestivalsList';
import { StagesList } from './components/Stages/StagesList';
import { ArtistsList } from './components/Artists/ArtistsList';
import { ArtistDetails } from './components/Artists/ArtistDetails';
import { MainHeader } from './components/MainHeader';

function App() {
  const [returnLink, setReturnLink] = useState();

  return (
    <AppShell
      header={<MainHeader returnLink={returnLink}/>}
    >
      <div className="App">
            <Routes>
              <Route path='/festival_specs_fe' element={<Link to='/festival_specs_fe/festivals'>Enter</Link>}></Route>
              <Route path="/festival_specs_fe/festivals" element={<FestivalsList setReturnLink={setReturnLink} />} />
              <Route
                path="/festival_specs_fe/festivals/:festivalName/stages/"
                element={<StagesList setReturnLink={setReturnLink} />}
              />
              <Route
                path="/festival_specs_fe/festivals/:festivalName/stages/:stageName/artists"
                element={<ArtistsList setReturnLink={setReturnLink} />}
              />
              <Route
                path="/festival_specs_fe/festivals/:festivalName/stages/:stageName/artists/:artistName"
                element={<ArtistDetails setReturnLink={setReturnLink} />}
              />
            </Routes>
      </div>
    </AppShell>
    );
}

export default App;
