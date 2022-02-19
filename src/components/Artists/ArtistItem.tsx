import { useState } from 'react';
import { Artist } from '../Interfaces';
import { ArtistExpandedFields } from './ArtistExpandedFields';

export function ArtistItem ({ artist, festivalName, stageName }: {artist: Artist, festivalName: string | undefined, stageName: string | undefined}) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded(!expanded);
  return (
    <>
      <tr onClick={handleClick}>
        <td>{artist.artist_name}</td>
        <td>{new Date (artist.date).toDateString()}</td>
        <td>{artist.start_time}</td>
        <td>{artist.end_time}</td>
      </tr>
      {expanded && 
      <tr>
        <ArtistExpandedFields artist={artist} festivalName={festivalName} stageName={stageName} />
      </tr>}
    </>
  )
}