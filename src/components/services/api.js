import axios from 'axios';

const API_KEY = '31995935-fd6ece510cdf68d7d85791b8f';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const {data} = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

return data;
};