import { useState, useEffect } from "react";
// import { ClipLoader } from "react-spinners";
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
      <ul>
          {festivals.map((festival: Festival) => <FestivalItem festival={festival} key={festival.festival_key} setFestivals={setFestivals}/>)}
      </ul>
      <FestivalForm setFestivals={setFestivals} festivals={festivals}/>
    </>
  )
}