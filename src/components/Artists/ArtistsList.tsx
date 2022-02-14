import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
import * as api from "../../utils/api";
import { ArtistItem, Artist } from "./ArtistItem";

export function ArtistsList() {
  const { festivalName, stageName } = useParams();
  const [artists, setArtists] = useState([])

  useEffect(() => {
    api
      .getArtistsByStageName(festivalName, stageName)
      .then((artists: any) => {
        setArtists(artists);
      })
  }, [festivalName, stageName])

  return (
    <ul>
        {artists.map((artist: Artist) => <ArtistItem artist={artist} key={artist.artist_key} festivalName={festivalName} stageName={stageName}/>)}
    </ul>
  )
}