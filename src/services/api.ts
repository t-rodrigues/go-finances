import axios from 'axios';

const { GOOGLE_BASE_URL } = process.env;

export const api = axios.create({
  baseURL: GOOGLE_BASE_URL || 'https://www.googleapis.com/oauth2/v2',
});
