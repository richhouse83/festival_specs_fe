import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@mantine/core";
// import { ClipLoader } from "react-spinners";
import * as api from "../../utils/api";
import { ArtistItem, Artist } from "./ArtistItem";

export function ArtistsList() {
  const { festivalName, stageName } = useParams();
  const [artists, setArtists] = useState([])

  const artistRows = artists.map((artist: Artist) => <ArtistItem artist={artist} key={artist.artist_key} festivalName={festivalName} stageName={stageName}/>)
       

  useEffect(() => {
    api
      .getArtistsByStageName(festivalName, stageName)
      .then((artists: any) => {
        setArtists(artists);
      })
  }, [festivalName, stageName])

  return (
    <Table highlightOnHover>
      <thead>
      <tr>
          <th>Artist Name</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>{artistRows}</tbody>
    </Table>
  )
}