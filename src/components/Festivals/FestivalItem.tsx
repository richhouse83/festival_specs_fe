import { BaseSyntheticEvent } from "react"
import { Link } from "react-router-dom"
import * as api from '../../utils/api'

export interface Festival {
  festival_name: string;
  festival_key?: string;
  start_date: Date;
  end_date: Date;
}

export function FestivalItem ({ festival, setFestivals }: {festival: Festival, setFestivals: Function}) {

  const handleDelete = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    await api.deleteFestivalByName(festival.festival_name);
    setFestivals((prev: Festival[]) => {
      const newFestivals = [...prev].filter((festivalToCheck: Festival) => festival.festival_key !== festivalToCheck.festival_key);
      return newFestivals;
    })
  }

  return (
    <li key={festival.festival_key}><Link to={`/festivals/${festival.festival_name}/stages`}>{festival.festival_name} {new Date (festival.start_date).toDateString()} {new Date (festival.end_date).toDateString()}</Link><button onClick={handleDelete}>Delete</button></li>
  )
}