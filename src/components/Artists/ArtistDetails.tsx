/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import {TextInput, Checkbox} from '@mantine/core'
import { DatePicker, TimeInput } from '@mantine/dates';
import { Artist } from '../Interfaces';
import { BeatLoader } from 'react-spinners';
import { getArtistByName } from '../../utils/api';

export function ArtistDetails () {
  const [artist, setArtist]: [Artist | undefined, Function] = useState();
  const [newArtist, setNewArtist]: [Artist | undefined, Function] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const {artistName, stageName, festivalName} = useParams();

  useEffect(() => {
    getArtistByName(festivalName, stageName, artistName)
      .then((artistToView: Artist) => {
        setArtist(artistToView);
        setNewArtist(artistToView);
        setIsLoading(false);
        console.log(Date.parse(artist?.start_time || '00:00:00'));
      })
    
  }, [artistName, stageName, festivalName])

  const updateParam = (value: any, param: string) => {
    setNewArtist((prev: Artist) => {
      const changedArtist = {
        ...prev,
        [param]: value,
      };
      return changedArtist;
    })
  }

  return (
    <>
      <p>Artist Details</p>
      <BeatLoader loading={isLoading} />
      {!isLoading &&
      <form>
        <TextInput label='Artist Name'  value={newArtist?.artist_name} onChange={(event) => updateParam(event.target.value, 'artist_name')}/>
        <DatePicker label='Date' value={new Date(newArtist?.date || '2022-01-01')} onChange={(event) => updateParam(event, 'date')}/>
        <TextInput label='Start Time' value={newArtist?.start_time} onChange={(event) => updateParam(event.target.value, 'start_time')}/>
        <TextInput label='End Time' value={newArtist?.end_time} onChange={(event) => updateParam(event.target.value, 'end_time')}/>
        <Checkbox label='Specs In?' defaultChecked={newArtist?.specs_in} />
        <Checkbox label='Pips Sent?' defaultChecked={newArtist?.pips_sent} />
        <TextInput label='Extras' value={newArtist?.extras} onChange={(event) => updateParam(event.target.value, 'extras')} />
      </form>}
    </>
  )
}