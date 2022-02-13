import axios from 'axios';

const request = axios.create({
  baseURL: "https://festival-specs.herokuapp.com/api",
});

export const getAllFestivals = () => request.get('/festivals').then(({ data: { festivals } }) => festivals);