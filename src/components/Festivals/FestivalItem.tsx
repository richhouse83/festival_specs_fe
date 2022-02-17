import { BaseSyntheticEvent, useState } from "react"
import { Button } from '@mantine/core'
import { Link } from "react-router-dom"
import * as api from '../../utils/api'

export interface Festival {
  festival_name: string;
  festival_key?: string;
  start_date: Date;
  end_date: Date;
}

export function FestivalItem ({ festival, setFestivals }: {festival: Festival, setFestivals: Function}) {
  const [confirmation, setConfirmation] = useState(false);

  const handleDelete = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    if (confirmation) {
      await api.deleteFestivalByName(festival.festival_name);
      setFestivals((prev: Festival[]) => {
        const newFestivals = [...prev].filter((festivalToCheck: Festival) => festival.festival_key !== festivalToCheck.festival_key);
        return newFestivals;
      })
      return;
    }
    setConfirmation(true);
  }

  return (
    <tr key={festival.festival_key}>
        <td><Link to={`/festival_specs_fe/festivals/${festival.festival_name}/stages`}>{festival.festival_name}</Link></td>
        <td>{new Date (festival.start_date).toDateString()}</td>
        <td>{new Date (festival.end_date).toDateString()}</td>
      <td><Button onClick={handleDelete}>{!confirmation ? 'Delete' : 'Confirm'}</Button>
      {confirmation && <Button onClick={() => setConfirmation(false)}>X</Button>}</td>
    </tr>
  )
}