import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@mantine/core";
import { BeatLoader } from "react-spinners";
import * as api from "../../utils/api";
import { ArtistItem } from "./ArtistItem";
import { Artist } from "../Interfaces";
import { DateOrganiser } from "./DateOrganiser";
import { CalendarIcon } from "@modulz/radix-icons";
import { ArtistForm } from "./ArtistForm";

export function ArtistsList() {
  const { festivalName, stageName } = useParams();
  const [artists, setArtists] = useState([])
  const [artistsInView, setArtistsInView] = useState([]);
  const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())])
  const [isLoading, setIsLoading] = useState(true);

  const artistRows = artistsInView.map((artist: Artist) => <ArtistItem artist={artist} key={artist.artist_key} festivalName={festivalName} stageName={stageName}/>)
       

  useEffect(() => {
    api
      .getArtistsByStageName(festivalName, stageName)
      .then((artists: any) => {
        setArtists(artists);
        setArtistsInView(artists);
        setIsLoading(false);
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
        <CalendarIcon /><DateOrganiser dates={dates} artists={artists} setArtistsInView={setArtistsInView} />
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
      <BeatLoader loading={isLoading} />
      <ArtistForm festivalName={festivalName} stageName={stageName} artists={artists} setArtistsInView={setArtistsInView} dates={dates}/>
    </>
  );
}