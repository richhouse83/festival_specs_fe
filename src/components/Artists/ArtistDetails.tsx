/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, BaseSyntheticEvent } from 'react';
import {TextInput, Checkbox, NumberInput, Button, TextInputProps, CheckboxProps, NumberInputProps, Alert} from '@mantine/core'
import { useParams } from 'react-router-dom';
import { Artist, Stage } from '../Interfaces';
import { BeatLoader } from 'react-spinners';
import { DateSelector } from '../DateSelector';
import * as api from '../../utils/api';
import { artistParams } from "../../utils/artistParams";
import { RiserRequirements } from './RiserRequirements';
import { ObjectFormItem } from '../ObjectFormItem';
import { MinusCircledIcon } from '@modulz/radix-icons';

export function ArtistDetails ({ setReturnLink }: {setReturnLink: Function}) {
  const [artist, setArtist]: [Artist | undefined, Function] = useState();
  const [stage, setStage]: [Stage | undefined, Function] = useState();
  const [newArtist, setNewArtist]: [Artist | undefined, Function] = useState()
  const [dates, setDates] = useState([new Date(Date.now()), new Date(Date.now())])
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [showBasicDetails, setShowBasicDetails] = useState(true);
  const [showTouringCrew, setShowTouringCrew] = useState(false);
  const [showStageInfo, setShowStageInfo] = useState(false);
  const [showVehicleInfo, setShowVehicleInfo] = useState(false);
  const [showTouringProd, setShowTouringProd] = useState(false);
  const [showHouseProd, setShowHouseProd] = useState(false);
  const [showFestivalExtras, setShowFestivalExtras] = useState(false);
  const [showDJ, setShowDJ] = useState(false);
  const [showRisers, setShowRisers] = useState(false);
  const {artistName, stageName, festivalName} = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    setReturnLink(`festivals/${festivalName}/stages/${stageName}/artists/${artistName}`)
    api
      .getArtistByName(festivalName, stageName, artistName)
      .then((artistToView: Artist) => {
        setArtist(artistToView);
        setNewArtist(artistToView);
        return api
          .getStageByName(festivalName, stageName)
      })
      .then((retrievedStage: Stage) => {
        setStage(retrievedStage);
        return api
          .getFestivalByName(festivalName)
      })
      .then(({ festival: { start_date, end_date } }) => {
        setDates([start_date, end_date]);
        setIsLoading(false);
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

  const getLabel = (name: string) => name.split('_').map((word) => word.replace(/djm|cdj|dj/, (match) => match.toUpperCase()).replace(/^\w/, (c) => c.toUpperCase())).join(' ');

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
    let error = null;
    const onChange = (value: number) => updateParam(value, nameOfParam)
    return {
      label,
      value,
      error,
      onChange,
    }
 
  }

  const submitForm = (event: BaseSyntheticEvent) => {
    setUpdated(false);
    setUploading(true);
    setError(false);
    event.preventDefault();
    return api.updateArtist(festivalName, stageName, artist?.artist_name, newArtist)
      .then((returnedArtist: Artist) => {
        setArtist(returnedArtist)
        setUploading(false);
        setUpdated(true)
      })
      .catch((err) => {
        console.error(err);
        setUploading(false);
        setError(true);
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
            map.push(<NumberInput min={0} key={key} {...getNumberInputValue(key)} />)
            break;
          default:
            break;          
        }
      }
    return map;
  }

  const ShowButton = ({show, setShow}: {show: boolean, setShow: Function}) => <Button variant='light' compact onClick={() => setShow((prev: boolean) => !prev)}>{show ? '-' : '+'}</Button>

  return (
    <>
      
      <BeatLoader loading={isLoading} />
      {!isLoading &&
      <form onSubmit={submitForm} className={'artist-details-form'}>
        <h2 className='artist-details-section-title'>{newArtist?.artist_name}</h2>
        <h3 className='artist-details-section-title'>Basic Details <ShowButton show={showBasicDetails} setShow={setShowBasicDetails}/></h3>
        {showBasicDetails && artistParamsMap('basic').map((item) => item)}
        <h3 className='artist-details-section-title'>Touring Crew <ShowButton show={showTouringCrew} setShow={setShowTouringCrew}/></h3>
        {showTouringCrew && artistParamsMap('touring_crew').map((item) => item)}
        <h3 className='artist-details-section-title'>Stage Info <ShowButton show={showStageInfo} setShow={setShowStageInfo}/></h3>
        {showStageInfo && artistParamsMap('stage').map((item) => item)}
        <h3 className='artist-details-section-title'>Vehicle Info <ShowButton show={showVehicleInfo} setShow={setShowVehicleInfo}/></h3>
        {showVehicleInfo && artistParamsMap('vehicles').map((item) => item)}
        <h3 className='artist-details-section-title'>Touring Production <ShowButton show={showTouringProd} setShow={setShowTouringProd}/></h3>
        {showTouringProd && <ObjectFormItem item={artist?.touring_production_info} typeOfValue='boolean' setProperty={setNewArtist} nameOfProperty='touring_production_info'/>}
        <h3 className='artist-details-section-title'>House Production <ShowButton show={showHouseProd} setShow={setShowHouseProd}/></h3>
        {showHouseProd && <ObjectFormItem item={artist?.house_production_info} typeOfValue='boolean' setProperty={setNewArtist} nameOfProperty='house_production_info'/>}
        <h3 className='artist-details-section-title'>Festival Extras <ShowButton show={showFestivalExtras} setShow={setShowFestivalExtras}/></h3>
        {showFestivalExtras && <ObjectFormItem item={artist?.festival_extras} typeOfValue='boolean' setProperty={setNewArtist} nameOfProperty='festival_extras'/>}
        <h3 className='artist-details-section-title'>DJ Equipment <ShowButton show={showDJ} setShow={setShowDJ}/></h3>
        {showDJ && artistParamsMap('DJ').map((item) => item)}
        <h3 className='artist-details-section-title'>Risers <ShowButton show={showRisers} setShow={setShowRisers}/></h3>
        {showRisers && <RiserRequirements riserRequirements={artist?.riser_requirements} risersAvailable={stage?.available_risers}/>}
        <div className='button-section'>
          <Button className='create-button' type="submit" loading={uploading}>Update Artist</Button>
          {updated && <p>Artist Updated</p>}
        {error && <Alert title="Update Failed" color="red" icon={<MinusCircledIcon />}>An error occurred - the artist has not been updated. Please try again later.</Alert>}
        </div>
      </form>}
    </>
  )
}