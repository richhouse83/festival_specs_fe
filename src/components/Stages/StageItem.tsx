import { BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButtons } from '../DeleteButtons';
import { deleteStage } from '../../utils/api';

export interface Stage {
  stage_name: string;
  stage_key: string;
  capacity: number;
  location: string;
}

export function StageItem({
  festivalName,
  stage,
  setStages,
}: {
  festivalName: string | undefined;
  stage: Stage;
  setStages: Function;
}) {
  const handleDelete = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    await deleteStage(festivalName, stage.stage_name);
    setStages((prev: Stage[]) => {
      const newStages = [...prev].filter(
        (stageToCheck: Stage) =>
          stage.stage_key !== stageToCheck.stage_key
      );
      return newStages;
    });
  };

  return (
    <tr>
      <td>
        <Link
          to={`/festival_specs_fe/festivals/${festivalName}/stages/${stage.stage_name}/artists`}
        >
          {stage.stage_name}
        </Link>
      </td>
      <td>{stage.capacity}</td>
      <td>{stage.location}</td>
      <td><DeleteButtons handleDelete={handleDelete}/></td>
    </tr>
  );
}