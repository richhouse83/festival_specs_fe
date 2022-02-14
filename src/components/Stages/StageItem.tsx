import { Link } from 'react-router-dom';

export interface Stage {
  stage_name: string;
  stage_key: string;
  capacity: number;
  location: string;
}

export function StageItem ({ stage, festivalName }: {stage: Stage, festivalName: string | undefined}) {

  return (
    <li><Link to={`/festivals/${festivalName}/stages/${stage.stage_name}/artists`}>{stage.stage_name} {stage.capacity} {stage.location}</Link></li>
  )
}