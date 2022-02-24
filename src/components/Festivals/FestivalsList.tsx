import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { Table } from "@mantine/core";
import * as api from "../../utils/api";
import { FestivalForm } from "./FestivalForm";
import { FestivalItem } from "./FestivalItem";
import { Festival } from "../Interfaces";

export function FestivalsList({ setReturnLink }: {setReturnLink: Function}) {
  const [festivals, setFestivals] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const festivalRows = festivals.map((festival: Festival) => <FestivalItem festival={festival} key={festival.festival_key} setFestivals={setFestivals}/>)

  useEffect(() => {
    setReturnLink('');
    api
      .getAllFestivals()
      .then((festivals: any) => {
        setFestivals(festivals);
        setIsLoading(false);
      })
  }, [setReturnLink])

  return (
    <>
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Festival Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{festivalRows}</tbody>
    </Table>
      <BeatLoader loading={isLoading} />
      <FestivalForm setFestivals={setFestivals} festivals={festivals}/>
    </>
  )
}