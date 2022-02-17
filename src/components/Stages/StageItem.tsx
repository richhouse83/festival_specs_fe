import { Link } from 'react-router-dom';

export interface Stage {
  stage_name: string;
  stage_key: string;
  capacity: number;
  location: string;
}

export function StageItem ({ stage, festivalName }: {stage: Stage, festivalName: string | undefined}) {

  return (
    <tr>
      <td><Link to={`/festival_specs_fe/festivals/${festivalName}/stages/${stage.stage_name}/artists`}>{stage.stage_name}</Link></td>
      <td>{stage.capacity}</td>
      <td>{stage.location}</td>
      </tr>
  )
}