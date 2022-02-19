import { BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionMenu } from '../ActionMenu';
import { Stage } from '../Interfaces'
import { deleteStage } from '../../utils/api';

export function StageItem({
  festivalName,
  stage,
  setStages,
}: {
  festivalName: string | undefined;
  stage: Stage;
  setStages: Function;
}) {
  const navigate = useNavigate();

  const navigation = () => navigate(`/festival_specs_fe/festivals/${festivalName}/stages/${stage.stage_name}/artists`)

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
      <td onClick={navigation}>{stage.stage_name}</td>
      <td onClick={navigation}>{stage.capacity}</td>
      <td onClick={navigation}>{stage.location}</td>
      <td className='action-cell'><ActionMenu handleDelete={handleDelete}/></td>
    </tr>
  );
}