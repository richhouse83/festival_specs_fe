/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import {TextInput, Checkbox, TextInputProps, Button} from '@mantine/core'
import { DatePicker } from '@mantine/dates';
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

  const getTextInputValue = (nameOfValue: string): TextInputProps => {
    const label = nameOfValue.split('_').map((word) => word.replace(/^\w/, (c) => c.toUpperCase())).join(' ');
    return {
      label,
      value: newArtist?.[nameOfValue as keyof Artist].toString() || '',
      onChange: (event: BaseSyntheticEvent) => updateParam(event.target.value, nameOfValue),
    }
  }

  const submitForm = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    console.log(newArtist);
  }

  return (
    <>
      <p>Artist Details</p>
      <BeatLoader loading={isLoading} />
      {!isLoading &&
      <form onSubmit={submitForm}>
        <TextInput {...getTextInputValue('artist_name')}/>
        <DatePicker label='Date' value={new Date(newArtist?.date || '2022-01-01')} onChange={(value) => updateParam(value, 'date')}/>
        <TextInput {...getTextInputValue('start_time')}/>
        <TextInput {...getTextInputValue('end_time')}/>
        <Checkbox label='Specs In?' defaultChecked={newArtist?.specs_in} onChange={(value) => updateParam(value, 'specs_in')}/>
        <Checkbox label='Pips Sent?' defaultChecked={newArtist?.pips_sent} />
        <TextInput label='Extras' value={newArtist?.extras} onChange={(event) => updateParam(event.target.value, 'extras')} />
        <Button type="submit">Submit</Button>
      </form>}
    </>
  )
}