import axios from '../api/axios';

export const validateToken = async () => {
  try {
    const res = await axios.get('/auth/validate-token', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.data.valid;
  } catch (err) {
    return false;
  }
};
