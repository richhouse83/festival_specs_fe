import {useState, BaseSyntheticEvent} from 'react';
import { Festival } from './FestivalItem';
import { addNewFestival } from '../../utils/api';


export function FestivalForm ({setFestivals }: {setFestivals: Function}) {
  const [newFestivalName, setNewFestivalName] = useState('New Festival');
  const [newStartDate, setNewStartDate] = useState('2022-01-01');
  const [newEndDate, setNewEndDate] = useState('2022-01-02')
  const [errMessage, setErrMessage] = useState('');
  const [createMessage, setCreateMessage] = useState('');

  const handleChange = (event: BaseSyntheticEvent, setFunction: Function) => {
    setFunction(event.target.value)
  }

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    setErrMessage('');
    setCreateMessage('Adding Festival...');
    event.preventDefault();
    const festivalToAdd: Festival = {
      festival_name: newFestivalName,
      start_date: new Date(newStartDate),
      end_date: new Date(newEndDate),
    };
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
    setCreateMessage('');
  };

  return (
    <form>
      <input type="text" defaultValue={'New Festival'} onChange={(event) => handleChange(event, setNewFestivalName)} />
      <input type="date" defaultValue={'2022-01-01'} onChange={(event) => handleChange(event, setNewStartDate)}/>
      <input type="date" defaultValue={'2022-01-02'} onChange={(event) => handleChange(event, setNewEndDate)}/>
      <button onClick={handleSubmit}>Create New Festival</button>
      {createMessage && <p>{createMessage}</p>}
      {errMessage && <p>{errMessage}</p>}
    </form>
  )
}