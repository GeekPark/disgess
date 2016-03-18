import { Promise } from 'es6-promise';

const URL = '//dev.geekpark.net:3000/api/v1/';
const api = path => `${URL}${path}`;

const result = res => (
  res.status === 200 ? Promise.resolve(res.json()) : Promise.reject(res)
);

export default {
  get({ type, id }) {
    return fetch(
      api(`comments.json?commentable_type=${type}&commentable_id=${id}`)
    ).then(result);
  },

  delete(id) {
    // return fetch(URL, {
    //   method: 'DELETE',
    // });
    // return null;
  },

  add(body, parentID) {
    // return fetch(URL, {
    //   method: 'POST',
    // });
  },
};
