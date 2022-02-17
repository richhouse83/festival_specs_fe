// import { Link } from 'react-router-dom';

export interface Artist {
  artist_name: string;
  artist_key: string;
  date: string;
  start_time: string;
  end_time: string;
}

export function ArtistItem ({ artist, festivalName, stageName }: {artist: Artist, festivalName: string | undefined, stageName: string | undefined}) {

  return (
    <tr>
      <td>{artist.artist_name}</td>
      <td>{new Date (artist.date).toDateString()}</td>
      <td>{artist.start_time}</td>
      <td>{artist.end_time}</td>
    </tr>
  )
}