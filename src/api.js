import { Promise } from 'es6-promise';

const URL = '//dev.geekpark.net:3000/api/v1/';
const api = path => `${URL}${path}`;

const catchErr = res => {
  console.error(res);
  res.json().then(d => alert(d.detail));
};

const result = res => (
  res.status === 200 ? Promise.resolve(res.json()) : Promise.reject(res)
);

const apiFetch = (url, param = null) => fetch(api(url), param).then(result).catch(catchErr);

const generateFormData = form => {
  const f = new FormData();
  Object.keys(form).forEach(key => f.append(key, form[key]));
  return f;
};

export default {
  get: ({ type, id }) => apiFetch(`comments.json?commentable_type=${type}&commentable_id=${id}`),

  delete() {
    // return fetch(URL, {
    //   method: 'DELETE',
    // });
    // return null;
  },

  /*
  @params: commentable_id, commentable_type, content, [parent_id], [ancestry]
  */
  add: params => apiFetch('comments.json', {
    method: 'POST',
    body: generateFormData(params),
  }),
};
