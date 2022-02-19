import axios from 'axios';
import { Festival, Stage } from '../components/Interfaces';

const request = axios.create({
  baseURL: "https://festival-specs.herokuapp.com/api",
});

export const getAllFestivals = () => request.get('/festivals').then(({ data: { festivals } }) => festivals);

export const getFestivalByName = (festivalName: string | undefined) => request.get(`/festivals/${festivalName}`).then(({data: festival}) => festival);

export const getStagesByFestivalName = (festivalName: string | undefined) => request.get(`/festivals/${festivalName}/stages`).then(({ data: { stages }}) => stages);

export const getArtistsByStageName = (festivalName: string | undefined, stageName: string | undefined) => request.get(`/festivals/${festivalName}/stages/${stageName}/artists`).then(({data: { artists}}) => artists)

export const addNewFestival = (newFestival: Festival) => request.post(`/festivals`, newFestival).then(({ data: [festival]}) => festival);

export const deleteFestivalByName = (festivalName: string) => request.delete(`festivals/${festivalName}`);

export const addNewStageToFestival = (festivalName: string | undefined, newStage: Stage) => request.post(`/festivals/${festivalName}/stages`, newStage).then(({data: [stage]}) => stage);

export const deleteStage = (festivalName: string | undefined, stageName: string) => request.delete(`/festivals/${festivalName}/stages/${stageName}`);