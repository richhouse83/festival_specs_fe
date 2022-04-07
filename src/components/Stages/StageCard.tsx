import { useState, useEffect } from "react";
import { Card, Text, Button, Alert } from "@mantine/core";
import { DoubleArrowDownIcon, DoubleArrowUpIcon, MinusCircledIcon } from "@modulz/radix-icons";
import { Stage } from "../Interfaces";
import { DetailsTable } from "./DetailsTable";
import { ObjectFormItem } from "../ObjectFormItem";

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
  const [toggleDetails, setToggleDetails] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getStageByName(festivalName, stageName)
      .then((retrievedStage: Stage) => {
        setStage(retrievedStage);
      })
      .then(() => setLoading(false))
  }, [festivalName, stageName])

  const handleClick = () => {
    setError(false);
    setLoading(true);
    api.updateStage(festivalName, stageName, stage)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      })
  }

  return (
    <div className='card-div'>
      <Card>
        <Text weight={500}>{stage?.stage_name}</Text>
        <DetailsTable firstColumn='capacity' secondColumn='location' stage={stage} setStage={setStage}/>
        <DetailsTable firstColumn='production_manager' secondColumn='stage_manager' stage={stage} setStage={setStage}/>
        {toggleDetails &&
        <>
          <DetailsTable firstColumn='audio_supplier' secondColumn='lx_supplier' stage={stage} setStage={setStage}/>
          <DetailsTable firstColumn='video_supplier' secondColumn='structure/stage_type/supplier' stage={stage} setStage={setStage}/>
          <DetailsTable firstColumn='djm_type' secondColumn='djm_quantity' stage={stage} setStage={setStage}/>
          <DetailsTable firstColumn='1210_type' secondColumn='1210_quantity' stage={stage} setStage={setStage}/>
          <DetailsTable firstColumn='cdj_type' secondColumn='cdj_quantity' stage={stage} setStage={setStage}/>
          <ObjectFormItem item={stage?.available_risers} itemName='Riser' typeOfValue='number' setProperty={setStage} nameOfProperty='available_risers' />
        </>}
        <div className="card-buttons">
          <Button onClick={() => setToggleDetails((prev) => !prev)} leftIcon={toggleDetails ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />}>{toggleDetails ? 'Less' : 'More'}</Button>
          <Button onClick={() => handleClick()} loading={loading}>Update Stage Info</Button>
        </div>
        {error && <div className="card-buttons">
          <Alert title="Update Failed" color="red" icon={<MinusCircledIcon />}>An error occurred - the stage has not been updated. Please try again later.</Alert>
        </div>}
      </Card>
    </div>
  );
}
