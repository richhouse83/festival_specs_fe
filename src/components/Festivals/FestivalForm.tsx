import { useState } from "react";
import { TextInput, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { BeatLoader } from "react-spinners";
import { useForm } from '@mantine/hooks';
import { Festival } from "../Interfaces";
import { addNewFestival } from "../../utils/api";

export function FestivalForm({ festivals, setFestivals }: { festivals: Festival[], setFestivals: Function }) {
  const [errMessage, setErrMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const festivalForm: any = useForm({
    initialValues: {
      festival_name: 'New Festival',
      start_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
    },
    validationRules: {
      festival_name: (name) => festivals.every((festivalToCheck) => name !== festivalToCheck.festival_name),
      start_date: (date) => date <= festivalForm.values.end_date,
      end_date: (date) => date >= festivalForm.values.start_date,
    },
    errorMessages: {
      festival_name: "Must be unique name",
      start_date: "Must be before or equal to Festival End Date",
      end_date: "Must be after or equal to Festival Start Date"
    }
  })

  const handleSubmit = async (festivalToAdd: Festival) => {
    setErrMessage("");
    setUploading(true);
    let newFestival: Festival;
    try {
      newFestival = await addNewFestival(festivalToAdd);
      setFestivals((prev: Festival[]) => {
        const newFestivals = [...prev, newFestival];
        return newFestivals;
      });
    } catch (err) {
      console.error(err);
      setErrMessage("An Error Occurred");
    }
    setUploading(false);
  };

  return (
    <form className='create-form' onSubmit={festivalForm.onSubmit((festivalToAdd: Festival) => handleSubmit(festivalToAdd))}>
      <TextInput required label="Festival Name" placeholder="New Festival" {...festivalForm.getInputProps('festival_name')} />
      <DatePicker required label="Start Date" {...festivalForm.getInputProps('start_date')} />
      <DatePicker required label="End Date" {...festivalForm.getInputProps('end_date')} />
      <div className='button-section'>
        <Button className="create-button" type="submit">
          Create New Festival
        </Button>
      </div>
      <br/>
      <BeatLoader color="#FFF" loading={uploading}/>
      {errMessage && <p>{errMessage}</p>}
    </form>
  );
}
