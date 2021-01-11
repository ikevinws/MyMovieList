import axios from 'axios';

export const addReview = (movieId, rating, review) => {
    return axios.post('/api/review/new', {
        movieId: movieId,
        review,
        rating
    });
};

export const getMovieReviews = (movieId) => {
    return axios.get(`/api/review/${movieId}`);
};

export const getCurrentUserReview = (movieId) => {
    return axios.get(`/api/review/user/${movieId}`, { withCredentials: true });
};
