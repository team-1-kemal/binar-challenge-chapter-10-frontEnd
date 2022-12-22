import axios from 'axios';

export default axios.create({
  baseURL: process.env.CORS_API || 'http://localhost:5000',
});
