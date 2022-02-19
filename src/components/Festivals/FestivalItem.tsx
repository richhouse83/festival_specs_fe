import { BaseSyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ActionMenu } from "../ActionMenu"
import { Festival } from "../Interfaces"
import * as api from '../../utils/api'

export function FestivalItem ({ festival, setFestivals }: {festival: Festival, setFestivals: Function}) {
  const navigate = useNavigate();

  const navigation = () => navigate(`/festival_specs_fe/festivals/${festival.festival_name}/stages`)

  const handleDelete = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    await api.deleteFestivalByName(festival.festival_name);
    setFestivals((prev: Festival[]) => {
      const newFestivals = [...prev].filter((festivalToCheck: Festival) => festival.festival_key !== festivalToCheck.festival_key);
      return newFestivals;
    })
  }

  return (
    <tr key={festival.festival_key} >
        <td onClick={navigation}>{festival.festival_name}</td>
        <td onClick={navigation}>{new Date (festival.start_date).toDateString()}</td>
        <td onClick={navigation}>{new Date (festival.end_date).toDateString()}</td>
      <td className='action-cell'><ActionMenu handleDelete={handleDelete} /></td>
    </tr>
  )
}