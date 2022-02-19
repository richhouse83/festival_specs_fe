import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@mantine/core";
// import { ClipLoader } from "react-spinners";
import * as api from "../../utils/api";
import { ArtistItem } from "./ArtistItem";
import { Artist } from "../Interfaces";
import { StageDateOrganiser } from "../Stages/StageDateOrganiser";
import { CalendarIcon } from "@modulz/radix-icons";

export function ArtistsList() {
  const { festivalName, stageName } = useParams();
  const [artists, setArtists] = useState([])
  const [artistsInView, setArtistsInView] = useState([]);
  const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())])

  const artistRows = artistsInView.map((artist: Artist) => <ArtistItem artist={artist} key={artist.artist_key} festivalName={festivalName} stageName={stageName}/>)
       

  useEffect(() => {
    api
      .getArtistsByStageName(festivalName, stageName)
      .then((artists: any) => {
        setArtists(artists);
        setArtistsInView(artists);
      })

      api
      .getFestivalByName(festivalName)
      .then(({festival: {
        start_date,
        end_date,
      }}) => {
        setDates([start_date, end_date])
      });
  }, [festivalName, stageName])

  return (
    <>
      <p>{stageName}</p>
      <div>
        <CalendarIcon /><StageDateOrganiser dates={dates} artists={artists} setArtistsInView={setArtistsInView} />
      </div>
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
    </>
  );
}