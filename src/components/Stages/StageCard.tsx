import { useState, useEffect } from "react";
import { Card, Text, Button } from "@mantine/core";
import { BeatLoader } from "react-spinners";
import { Stage } from "../Interfaces";
import { DetailsTable } from "./DetailsTable";
import * as api from '../../utils/api';

export function StageCard({
  festivalName,
  stageName,
}: {
  festivalName: string | undefined;
  stageName: string | undefined;
}) {
  const [stage, setStage]: [Stage | undefined, Function] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStageByName(festivalName, stageName)
      .then((retrievedStage: Stage) => {
        setStage(retrievedStage);
      })
      .then(() => setLoading(false))
  }, [festivalName, stageName])

  const handleClick = () => {
    setLoading(true);
    api.updateStage(festivalName, stageName, stage)
      .then(() => {
        setLoading(false);
      })
  }

  return (
    <div className='card-div'>
      <Card>
        <Text weight={500}>{stage?.stage_name}</Text>
        <DetailsTable firstColumn='capacity' secondColumn='location' stage={stage} setStage={setStage}/>
        <DetailsTable firstColumn='production_manager' secondColumn='stage_manager' stage={stage} setStage={setStage}/>
        <DetailsTable firstColumn='audio_supplier' secondColumn='lx_supplier' stage={stage} setStage={setStage}/>
        <DetailsTable firstColumn='video_supplier' secondColumn='structure' stage={stage} setStage={setStage}/>
        <Button onClick={() => handleClick()}>Update Stage Info</Button>
        <BeatLoader loading={loading} />
      </Card>
    </div>
  );
}
