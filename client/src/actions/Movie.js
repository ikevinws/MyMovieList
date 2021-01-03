import axios from 'axios';
import { toTitleCase } from '../utils/String';

export const addMovie = (movie) => {
    const contentType = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('title', toTitleCase(movie.title));
    formData.append('genre', toTitleCase(movie.genre));
    formData.append('trailerLink', movie.trailerLink);
    formData.append('hours', movie.hours);
    formData.append('minutes', movie.minutes);
    formData.append('description', movie.description);
    formData.append('image', movie.image);
    return axios.post('/api/movies/new', formData, contentType);
};

export const getMovies = (searchQuery, genre, rating, cancelToken) => {
    const query = { searchQuery: toTitleCase(searchQuery), genre: toTitleCase(genre), rating };
    return axios.get(
        '/api/movies',
        {
            params: query
        },
        { cancelToken }
    );
};
