import { Menu } from '@mantine/core';
import { eachDayOfInterval } from 'date-fns';
import { BaseSyntheticEvent } from 'react';
import { Artist } from '../Interfaces';


export function StageDateOrganiser({ dates, artists, setArtistsInView }: { dates: Date[], artists: Artist[], setArtistsInView: Function}) {

  const datesArray = eachDayOfInterval({start: new Date(dates[0]), end: new Date(dates[1])})

  const listArtistsByDate = (event: BaseSyntheticEvent) => {
    const dateToShow = event.target.innerHTML;
    const newArtistsInView = artists.filter(({ date }) => {
      return new Date(date).toISOString() === new Date(dateToShow).toISOString();
    })
    setArtistsInView(newArtistsInView);
  }

  const resetArtists = () => {
    setArtistsInView(artists);
  }


  const dateItems = datesArray.map((date: any) => <Menu.Item key={date} onClick={listArtistsByDate}>{new Date(date).toDateString()}</Menu.Item>)

  return (
    <Menu>
      <Menu.Item onClick={resetArtists}>Show All</Menu.Item>
      {dateItems}
    </Menu>
  );
}