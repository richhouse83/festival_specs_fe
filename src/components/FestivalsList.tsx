import { useState, useEffect } from "react";
// import { ClipLoader } from "react-spinners";
import * as api from "../utils/api";

export function FestivalsList() {
  const [festivals, setFestivals] = useState([])

  useEffect(() => {
    api
      .getAllFestivals()
      .then((festivals: any) => {
        setFestivals(festivals);
      })
  })

  return (
    <ul>
      {festivals.map((festival: any) => <li key={festival.festival_key}>{festival.festival_name}</li>)}
    </ul>
  )
}