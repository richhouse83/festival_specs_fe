import { useState } from "react";
import { TextInput, Button, NumberInput } from '@mantine/core';
import { BeatLoader } from "react-spinners";
import { useForm } from '@mantine/hooks';
import { Stage } from "../Interfaces";
import { addNewStageToFestival } from "../../utils/api";

export function StageForm({ festivalName, stages, setStages }: { festivalName: string | undefined, stages: Stage[], setStages: Function }) {
  const [errMessage, setErrMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const stageForm: any = useForm({
    initialValues: {
      stage_name: 'New Stage',
      capacity: 0,
      location: 'North East Corner'
    },
    validationRules: {
      stage_name: (name) => stages.every((stageToCheck: Stage) => name !== stageToCheck.stage_name),
      capacity: (value) => value > 0,
    }, 
    errorMessages: {
      stage_name: "Must be unique name",
      capacity: "Must be greater than 0",
    }
  })

  const handleSubmit = async (stageToAdd: Stage) => {
    setErrMessage("");
    setUploading(true);
    let newStage: Stage;
    console.log(stageToAdd);
    try {
      newStage = await addNewStageToFestival(festivalName, stageToAdd);
      setStages((prev: Stage[]) => {
        const newStages = [...prev, newStage];
        return newStages;
      });
    } catch (err) {
      console.error(err);
      setErrMessage("An Error Occurred");
    }
    setUploading(false);
  };

  return (
    <form onSubmit={stageForm.onSubmit((stageToAdd: Stage) => handleSubmit(stageToAdd))}>
      <TextInput required label="Stage Name" placeholder="New Stage" {...stageForm.getInputProps('stage_name')} />
      <NumberInput required label="Capacity" step={50} min={0} {...stageForm.getInputProps('capacity')} />
      <TextInput required label="Location" placeholder="Location In Festival" {...stageForm.getInputProps('location')} />
      <Button type="submit">Create New Stage</Button>
      <br/>
      <BeatLoader color="#FFF" loading={uploading}/>
      {errMessage && <p>{errMessage}</p>}
    </form>
  );
}
