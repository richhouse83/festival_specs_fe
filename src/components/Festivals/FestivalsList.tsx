import { useState, useEffect } from "react";
// import { ClipLoader } from "react-spinners";
import { Table } from "@mantine/core";
import * as api from "../../utils/api";
import { FestivalForm } from "./FestivalForm";
import { FestivalItem, Festival } from "./FestivalItem";

export function FestivalsList() {
  const [festivals, setFestivals] = useState([])

  useEffect(() => {
    api
      .getAllFestivals()
      .then((festivals: any) => {
        setFestivals(festivals);
      })
  }, [])

  return (
    <>
    <Table>
      <thead>
        <tr>
          <th>Festival Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{festivals.map((festival: Festival) => <FestivalItem festival={festival} key={festival.festival_key} setFestivals={setFestivals}/>)}</tbody>
    </Table>
      <FestivalForm setFestivals={setFestivals} festivals={festivals}/>
    </>
  )
}