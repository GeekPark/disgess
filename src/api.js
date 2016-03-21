import { Promise } from 'es6-promise';

const URL = '//dev.geekpark.net:3000/api/v1/';
const api = path => `${URL}${path}`;

const catchErr = res => {
  console.error(res);
  res.json().then(d => alert(d.detail || d.error));
  return Promise.reject(res);
};

const result = res => (
  /20[0-9]/.test(res.status) ? Promise.resolve(res.json()) : Promise.reject(res)
);

const apiFetch = (url, param = null) => fetch(api(url), param).then(result).catch(catchErr);

const generateFormData = form => {
  const f = new FormData();
  Object.keys(form).forEach(key => f.append(key, form[key]));
  return f;
};

export default {
  get: ({ type, id }) => apiFetch(`comments.json?commentable_type=${type}&commentable_id=${id}`),

  delete: ({ token, id }) => apiFetch(`comments/${id}.json?access_token=${token}`, { method: 'DELETE' }),

  like: ({ token, id }) => apiFetch(`comments/${id}.json?access_token=${token}`, { method: 'PATCH' }),

  /*
  @params: commentable_id, commentable_type, content, [parent_id]
  */
  add: params => apiFetch('comments.json', {
    method: 'POST',
    body: generateFormData(params),
  }),
};
