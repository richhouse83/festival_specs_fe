// import { Link } from 'react-router-dom';

export interface Artist {
  artist_name: string;
  artist_key: string;
}

export function ArtistItem ({ artist, festivalName, stageName }: {artist: Artist, festivalName: string | undefined, stageName: string | undefined}) {

  return (
    <li>{artist.artist_name}</li>
  )
}