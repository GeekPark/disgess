import { Promise } from 'es6-promise';

const URL = process.env.API_URL || '//www.geekpark.net/api/v1/';
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

const withToken = token => (
  token === undefined || token === null ? '?' : `?access_token=${token}`
);

const generAPI = token => ({
  user: () => apiFetch(`user.json${withToken(token)}`),

  get: ({ type, id }) => apiFetch(`comments.json${withToken(token)}&commentable_type=${type}&commentable_id=${id}`),

  delete: ({ id }) => apiFetch(`comments/${id}.json${withToken(token)}`, { method: 'DELETE' }),

  like: ({ id }) => apiFetch(`comments/${id}/up.json${withToken(token)}`, { method: 'PUT' }),

  /*
  @params: commentable_id, commentable_type, content, [parent_id]
  */
  add: params => apiFetch(`comments.json${withToken(token)}`, {
    method: 'POST',
    body: generateFormData(params),
  }),
});

export default generAPI;
