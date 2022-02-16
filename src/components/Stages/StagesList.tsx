import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { ClipLoader } from "react-spinners";
import * as api from "../../utils/api";
import { StageItem, Stage } from './StageItem';

export function StagesList() {
  const { festivalName } = useParams();
  const [stages, setStages] = useState([])

  useEffect(() => {
    api
      .getStagesByFestivalName(festivalName)
      .then((stages: any) => {
        setStages(stages);
      })
  }, [festivalName])

  return (
    <>
      <p>{festivalName}</p>
      { stages.length ? 
      <ul>
          {stages.map((stage: Stage) => <StageItem stage={stage} key={stage.stage_key} festivalName={festivalName}/>)}
      </ul> :
      <p>No Stages Currently Created</p>}
    </>
  )
}