import { useState } from 'react';
import { Artist } from '../Interfaces';
import { ArtistExpandedFields } from './ArtistExpandedFields';

export function ArtistItem ({ artist, festivalName, stageName, dates, setArtistsInView, setArtists }: {artist: Artist, festivalName: string | undefined, stageName: string | undefined, dates: Date[], setArtistsInView:  Function, setArtists: Function}) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded(!expanded);
  return (
    <>
      {!expanded && 
      <tr onClick={handleClick}>
        <td>{artist.artist_name}</td>
        <td>{new Date (artist.date).toDateString()}</td>
        <td>{artist.start_time}</td>
        <td>{artist.end_time}</td>
      </tr>}
      {expanded && 
        <ArtistExpandedFields handleClick={handleClick} artist={artist} festivalName={festivalName} stageName={stageName} dates={dates} setArtistsInView={setArtistsInView} setArtists={setArtists} />
      }
    </>
  )
}