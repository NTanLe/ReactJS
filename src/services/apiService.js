import axios from '../utils/axiosCustomize';
const postCreateUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return axios.post('api/v1/participant', data);
}
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return axios.put('api/v1/participant', data);
}
const getAllUsers = () => {
  return axios.get('api/v1/participant/all');
}
const deleteUser = (id) => {
  return axios.delete('api/v1/participant', { data: { id: id } });
}

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email: email, password: password, delay: 2000 });
}
const postRegister = (email, username, password) => {
  return axios.post(`api/v1/register`, { email: email, username: username, password: password });
}
export { postCreateUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postRegister }