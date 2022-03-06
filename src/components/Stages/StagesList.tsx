import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "@mantine/core";
import { BeatLoader } from "react-spinners";
import * as api from "../../utils/api";
import { StageItem } from './StageItem';
import { Stage } from "../Interfaces";
import { StageForm } from "./StageForm";
import { FestivalCard } from "../Festivals/FestivalCard";

export function StagesList({ setReturnLink }: {setReturnLink: Function}) {
  const { festivalName } = useParams();
  const [stages, setStages] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const stageRows = stages.map((stage: Stage) => <StageItem stage={stage} key={stage.stage_key} festivalName={festivalName} setStages={setStages}/>);

  useEffect(() => {
    setReturnLink(`festivals/${festivalName}/stages`);
    setIsLoading(true);
    api
      .getStagesByFestivalName(festivalName)
      .then((stages: any) =>
        setStages(stages));
        setIsLoading(false);
  }, [festivalName, setReturnLink])

  return (
    <>
      <FestivalCard festivalName={festivalName}/>
      {stages.length ? (
        <>
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
          <BeatLoader loading={isLoading} />
        </>
      ) : (
        <p>No Stages Currently Created</p>
      )}
      <StageForm
        festivalName={festivalName}
        stages={stages}
        setStages={setStages}
      />
    </>
  );
}