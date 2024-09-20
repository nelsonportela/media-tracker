import axios from 'axios';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_SEARCH_MOVIE_URL = `${TMDB_API_BASE_URL}/search/movie`;
const TMDB_SEARCH_TV_URL = `${TMDB_API_BASE_URL}/search/tv`;
const TMDB_GET_MOVIE_URL = `${TMDB_API_BASE_URL}/movie`;
const TMDB_GET_TV_URL = `${TMDB_API_BASE_URL}/tv`;

export class TmdbService {
  constructor(options) {
    this.options = options
  }

  async find(context, _params) {
    const { query } = context;

    if (!query || !query.title || !query.type || (query.type !== 'movie' && query.type !== 'tv')) {
      return { error: 'Missing query arguments' };
    }

    const URL = query.type === 'movie' ? TMDB_SEARCH_MOVIE_URL : TMDB_SEARCH_TV_URL;

    try {
      const { data } = await axios.get(URL, {
        params: {
          query: query.title,
          include_adult: true,

        },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
      });

      return data;
    } catch (error) {
      console.error('Error fetching data from TMDB API:', error);
      return { error: 'Error fetching data from TMDB API', details: error.message };
    }
  }

  async get(id, _params) {
    if (!id) {
      throw new Error('ID is required');
    }

    const { query } = _params;

    if (!query || (query.type !== 'movie' && query.type !== 'tv')) {
      return { error: 'Missing query arguments' };
    }

    const URL = query.type === 'movie' ? TMDB_GET_MOVIE_URL : TMDB_GET_TV_URL;



    try {
      const { data } = await axios.get(`${URL}/${id}`, {
        params: {
          query: query.title,
          include_adult: true,
          append_to_response: 'credits'
        },
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
      });

      return data;
    } catch (error) {
      console.error('Error fetching data from TMDB API:', error);
      return { error: 'Error fetching data from TMDB API', details: error.message };
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
