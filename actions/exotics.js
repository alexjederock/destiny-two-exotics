import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export default async () => {
  const { data } = await axios.get(`${API_BASE_URL}/exotics`) // eslint-disable-line no-undef

  return data
}
