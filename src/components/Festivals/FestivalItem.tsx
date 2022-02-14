import { Link } from "react-router-dom"

export interface Festival {
  festival_name: string;
  festival_key: string;
  start_date: Date;
  end_date: Date;
}

export function FestivalItem ({ festival }: {festival: Festival}) {

  return (
    <li key={festival.festival_key}><Link to={`/festivals/${festival.festival_name}/stages`}>{festival.festival_name} {new Date (festival.start_date).toDateString()} {new Date (festival.end_date).toDateString()}</Link></li>
  )
}