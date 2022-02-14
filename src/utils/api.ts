import axios from 'axios';

const request = axios.create({
  baseURL: "https://festival-specs.herokuapp.com/api",
});

export const getAllFestivals = () => request.get('/festivals').then(({ data: { festivals } }) => festivals);

export const getStagesByFestivalName = (festivalName: string | undefined) => request.get(`festivals/${festivalName}/stages`).then(({ data: { stages }}) => stages);

export const getArtistsByStageName = (festivalName: string | undefined, stageName: string | undefined) => request.get(`festivals/${festivalName}/stages/${stageName}/artists`).then(({data: { artists}}) => artists)