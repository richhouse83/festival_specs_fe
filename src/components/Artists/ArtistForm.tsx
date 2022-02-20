import { useState } from "react";
import { TextInput, Button } from '@mantine/core';
import { BeatLoader } from "react-spinners";
import { useForm } from '@mantine/hooks';
import { eachDayOfInterval } from "date-fns";
import { Artist } from "../Interfaces";
import { addNewArtist } from "../../utils/api";
import { DateSelector } from "../DateSelector";

export function ArtistForm({
  festivalName,
  stageName,
  artists,
  setArtistsInView,
  dates,
}: {
  festivalName: string | undefined;
  stageName: string | undefined;
  artists: Artist[];
  setArtistsInView: Function;
  dates: Date[];
}) {
  const [errMessage, setErrMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const artistForm: any = useForm({
    initialValues: {
      artist_name: "New Artist",
      date: null,
      start_time: "12:00:00",
      end_time: "13:00:00",
    },
    validationRules: {
      artist_name: (name) =>
        artists.every((artistToCheck) => name !== artistToCheck.artist_name),
      date: (date) => !!date,
    },
    errorMessages: {
      artist_name: "Must be unique name",
      date: "Required",
    },
  });

  const handleSubmit = async (artistToAdd: Artist) => {
    setErrMessage("");
    setUploading(true);
    let newArtist: Artist;
    try {
      newArtist = await addNewArtist(festivalName, stageName, artistToAdd);
      setArtistsInView((prev: Artist[]) => {
        const newArtists = [...prev, newArtist];
        return newArtists;
      });
    } catch (err) {
      console.error(err);
      setErrMessage("An Error Occurred");
    }
    setUploading(false);
  };

  return (
    <form
      className="create-form"
      onSubmit={artistForm.onSubmit((artistToAdd: Artist) =>
        handleSubmit(artistToAdd)
      )}
    >
      <TextInput
        required
        label="Artist Name"
        placeholder="New Festival"
        {...artistForm.getInputProps("artist_name")}
      />
      <DateSelector dates={dates} {...artistForm.getInputProps("date")} required />
      <TextInput
        label="Start Time"
        {...artistForm.getInputProps("start_time")}
      />
      <TextInput label="End Time" {...artistForm.getInputProps("end_time")} />
      <Button className="create-button" type="submit">
        Create New Artist
      </Button>
      <br />
      <BeatLoader color="#FFF" loading={uploading} />
      {errMessage && <p>{errMessage}</p>}
    </form>
  );
}
