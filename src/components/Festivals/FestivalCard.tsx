import { useState, useEffect } from "react";
import { Card, Text } from "@mantine/core";
import { BeatLoader } from "react-spinners";
import { CalendarIcon } from "@modulz/radix-icons";
import { Festival } from "../Interfaces";
import * as api from '../../utils/api';

export function FestivalCard({
  festivalName,
}: {
  festivalName: string | undefined;
}) {
  const [festival, setFestival]: [Festival | undefined, Function] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFestivalByName(festivalName)
      .then(({ festival: retrievedFestival }: {festival: Festival}) => {
        setFestival(retrievedFestival);
      })
      .then(() => setLoading(false))
  }, [festivalName])

  return (
    <div className='card-div'>
      <Card>
        <BeatLoader loading={loading} />
        <Text weight={500}>{festival?.festival_name}</Text>
        <Text><CalendarIcon /> {new Date(festival?.start_date || Date.now()).toDateString()} - {new Date(festival?.end_date || Date.now()).toDateString()}</Text>
      </Card>
    </div>
  );
}
