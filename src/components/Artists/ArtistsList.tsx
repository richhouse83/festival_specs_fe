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
import { StageCard } from "../Stages/StageCard";

export function ArtistsList({ setReturnLink }: {setReturnLink: Function}) {
  const { festivalName, stageName } = useParams();
  const [artists, setArtists]: [Artist[], Function] = useState([])
  const [artistsInView, setArtistsInView] = useState([]);
  const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())])
  const [isLoading, setIsLoading] = useState(true);

  const artistRows = artistsInView.map((artist: Artist) => <ArtistItem key={artist.artist_key} artist={artist} setArtistsInView={setArtistsInView} setArtists={setArtists} festivalName={festivalName} stageName={stageName} dates={dates}/>)
       

  useEffect(() => {
    setReturnLink(`festivals/${festivalName}/stages/${stageName}/artists`);
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
  }, [festivalName, stageName, setReturnLink])

  return (
    <>
      <StageCard festivalName={festivalName} stageName={stageName}/>
      <div>
        Choose Date: <CalendarIcon /><DateOrganiser dates={dates} artists={artists} setArtistsInView={setArtistsInView} />
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
      <ArtistForm festivalName={festivalName} stageName={stageName} artists={artists} setArtists={setArtists} setArtistsInView={setArtistsInView} dates={dates}/>
    </>
  );
}