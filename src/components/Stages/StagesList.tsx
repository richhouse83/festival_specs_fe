import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@mantine/core";
// import { ClipLoader } from "react-spinners";
import * as api from "../../utils/api";
import { StageItem, Stage } from './StageItem';
import { StageForm } from "./StageForm";

export function StagesList() {
  const { festivalName } = useParams();
  const [stages, setStages] = useState([])

  const stageRows = stages.map((stage: Stage) => <StageItem stage={stage} key={stage.stage_key} festivalName={festivalName} setStages={setStages}/>);

  useEffect(() => {
    api
      .getStagesByFestivalName(festivalName)
      .then((stages: any) => {
        console.log(stages);
        setStages(stages);
      })
  }, [festivalName])

  return (
    <>
      <p>{festivalName}</p>
      { stages.length ? 
      <Table highlightOnHover>
        <thead>
        <tr>
          <th>Stage Name</th>
          <th>Capacity</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{stageRows}</tbody>
      
      </Table>
      :
      <p>No Stages Currently Created</p>}
      <StageForm festivalName={festivalName} stages={stages} setStages={setStages} />
    </>
  )
}