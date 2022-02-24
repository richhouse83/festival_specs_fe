/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import { useParams } from 'react-router-dom';
import {TextInput, Checkbox, NumberInput, Button, TextInputProps, CheckboxProps, NumberInputProps} from '@mantine/core'
import { Artist } from '../Interfaces';
import { BeatLoader } from 'react-spinners';
import { DateSelector } from '../DateSelector';
import * as api from '../../utils/api';
import { artistParams } from "../../utils/artistParams";

export function ArtistDetails ({ setReturnLink }: {setReturnLink: Function}) {
  const [artist, setArtist]: [Artist | undefined, Function] = useState();
  const [newArtist, setNewArtist]: [Artist | undefined, Function] = useState()
  const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())])
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const {artistName, stageName, festivalName} = useParams();

  useEffect(() => {
    setReturnLink(`festivals/${festivalName}/stages/${stageName}/artists/${artistName}`)
    api
      .getArtistByName(festivalName, stageName, artistName)
      .then((artistToView: Artist) => {
        setArtist(artistToView);
        setNewArtist(artistToView);
        setIsLoading(false);
      });

    api
      .getFestivalByName(festivalName)
      .then(({ festival: { start_date, end_date } }) => {
        setDates([start_date, end_date]);
      });
    
  }, [artistName, stageName, festivalName])

  const updateParam = (value: any, param: string) => {
    setUpdated(false);
    setNewArtist((prev: Artist) => {
      const changedArtist = {
        ...prev,
        [param]: value,
      };
      return changedArtist;
    })
  }

  const getLabel = (name: string) => name.split('_').map((word) => word.replace(/^\w/, (c) => c.toUpperCase())).join(' ');

  const getTextInputValue = (nameOfParam: string): TextInputProps => {
    const label = getLabel(nameOfParam);
    const value = newArtist?.[nameOfParam as keyof Artist] ? newArtist?.[nameOfParam as keyof Artist].toString() : '';
    const onChange = (event: BaseSyntheticEvent) => updateParam(event.target.value, nameOfParam)
    return {
      label,
      value,
      onChange,
    }
  }

  const getBoxValue = (nameOfParam: string): CheckboxProps => {
    const label = getLabel(nameOfParam);
    const defaultChecked = Boolean(newArtist?.[nameOfParam as keyof Artist] ?? false);
    const onChange = (event: BaseSyntheticEvent) => updateParam(event.target.checked, nameOfParam)
    return {
      label,
      defaultChecked,
      onChange,
    }
  }

  const getNumberInputValue = (nameOfParam: string): NumberInputProps => {
    const label = getLabel(nameOfParam);
    const value = Number(newArtist?.[nameOfParam as keyof Artist] || 0);
    const onChange = (value: number) => updateParam(value, nameOfParam)
    return {
      label,
      value,
      onChange,
    }
 
  }

  const submitForm = (event: BaseSyntheticEvent) => {
    setUpdated(false);
    setUploading(true);
    event.preventDefault();
    return api.updateArtist(festivalName, stageName, artist?.artist_name, newArtist)
      .then((returnedArtist: Artist) => {
        setArtist(returnedArtist)
        setUploading(false);
        setUpdated(true)
      })
  }

  const artistParamsMap = (sectionTitle: string) => {
    const map = [];
      const section = artistParams[sectionTitle as keyof typeof artistParams];
      for (const key in section) {
        switch(section[key as keyof typeof section]) {
          case ('string'):
            map.push(<TextInput key={key} {...getTextInputValue(key)}/>)
            break;
          case ('boolean'):
            map.push(<Checkbox key={key} {...getBoxValue(key)} />)
            break;
          case ('date'):
            map.push(<DateSelector key={key} dates={dates} value={new Date(newArtist?.date || Date.now())} required onChange={(value: Date) => updateParam(value.toISOString(), 'date')}/>)
            break;
          case ('number'):
            map.push(<NumberInput key={key} {...getNumberInputValue(key)} />)
            break;
          default:
            break;          
        }
      }
    return map;
  }

  return (
    <>
      <p>Artist Details</p>
      <BeatLoader loading={isLoading} />
      {!isLoading &&
      <form onSubmit={submitForm} className={'create-form'}>
        <h3 className='details-section-title'>Basic Details</h3>
        {artistParamsMap('basic').map((item) => item)}
        <h3 className='details-section-title'>Stage Info</h3>
        {artistParamsMap('stage').map((item) => item)}
        <h3 className='details-section-title'>Vehicle Info</h3>
        {artistParamsMap('vehicles').map((item) => item)}
        <h3 className='details-section-title'>DJ Equipment</h3>
        {artistParamsMap('DJ').map((item) => item)}
        <div className='button-section'>
          <Button className='create-button' type="submit">Update Artist</Button>
          <BeatLoader loading={uploading} />
          {updated && <p>Artist Updated</p>}
        </div>
      </form>}
    </>
  )
}