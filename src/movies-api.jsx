import axios from 'axios';
const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const options = {
  headers: {
       Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGEwMzBmMDEyOWJjOGZmZWVlZTMxNWU4ZTFmMmZiOCIsInN1YiI6IjY2MjEwOTA0N2EzYzUyMDE2NDRjMDUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.envicpSMS8-zy2rsHzRYWHQApGqruamuLgerWCSohHY'
  }
};

export async function Data() {
  const response =  await axios.get(url, options);
  return response.data.results;
}

export async function DataReviews(id) {
  const urlReviews =`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const response = await axios.get(urlReviews, options);
  return response.data.results;
}

export async function DataCast(id) {
  const urlCast = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const response = await axios.get(urlCast, options);
  return response.data.cast;
}

export async function DataSearch(value) {
  const urlSeacrh = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(urlSeacrh, options);
  return response.data.results;
}

export async function getData(id) {
  const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const response = await axios.get(urlDetails, options);
  return response.data;
}


