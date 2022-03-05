import { useState, BaseSyntheticEvent } from 'react';
import { Artist } from '../Interfaces';
import { ArtistExpandedFields } from './ArtistExpandedFields';
import { ActionMenu } from '../ActionMenu';
import * as api from '../../utils/api';

export function ArtistItem ({ artist, festivalName, stageName, dates, setArtistsInView, setArtists }: {artist: Artist, festivalName: string | undefined, stageName: string | undefined, dates: Date[], setArtistsInView:  Function, setArtists: Function}) {
  const [expanded, setExpanded] = useState(false);

  const filterArtists = (prev: Artist[]) => {
    const newArtists = [...prev].filter((artistToCheck: Artist) =>  artistToCheck.artist_key !== artist.artist_key);
    return newArtists;
  }

  const handleDelete = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    await api.deleteArtist(festivalName, stageName, artist.artist_name);
    setArtistsInView(filterArtists);
    setArtists(filterArtists);
  }

  const handleClick = () => setExpanded(!expanded);
  return (
    <>
      {!expanded && 
      <tr>
        <td onClick={handleClick}>{artist.artist_name}</td>
        <td onClick={handleClick}>{new Date (artist.date).toDateString()}</td>
        <td onClick={handleClick}>{artist.start_time}</td>
        <td onClick={handleClick}>{artist.end_time}</td>
        <td><ActionMenu handleDelete={handleDelete}/></td>
      </tr>}
      {expanded && 
        <ArtistExpandedFields handleClick={handleClick} artist={artist} festivalName={festivalName} stageName={stageName} dates={dates} setArtistsInView={setArtistsInView} setArtists={setArtists} />
      }
    </>
  )
}