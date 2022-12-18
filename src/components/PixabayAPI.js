const baseURL = 'https://pixabay.com/api/?';
const options = '&image_type=photo&orientation=horizontal=photo';
const key = '30621712-67ba58dcdbb82dbab3da918bc';
const perPage = 12;

export default function PixabayAPI(querry, page) {
  const URL = `${baseURL}key=${key}&q=${querry}&page=${page}${options}&per_page=${perPage}`;

  return fetch(URL).then(response => {
    return response.json();
  });
}
