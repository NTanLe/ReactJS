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
const getQuizByUser = () => {
  return axios.get('api/v1/quiz-by-participant')
}
const getDataQuiz = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`)
}
const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data })
}
const postCreateNewQuiz = (description, name, type, image) => {
  const data = new FormData();
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', type);
  data.append('quizImage', image);
  return axios.post(`api/v1/quiz`, data)
}
const getAllQuizForAdmin = () => {
  return axios.get('api/v1/quiz/all');
}
const deleteQuizForAdmin = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
}
const putQuizForAdmin = (id, description, name, type, image) => {
  const data = new FormData();
  data.append('id', id);
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', type);
  data.append('quizImage', image);
  return axios.put(`api/v1/quiz`, data)
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append('quiz_id', quiz_id);
  data.append('description', description);
  data.append('questionImage', questionImage);

  return axios.post(`api/v1/question`, data)
}
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
  return axios.post(`api/v1/answer`, { description, correct_answer, question_id })
}

const postAssignQuiz = (quizId, userId) => {
  return axios.post(`api/v1/quiz-assign-to-user`, { quizId, userId })
}

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data })
}

const logout = (email, refresh_token) => {
  return axios.post(`api/v1/logout`, { email, refresh_token })
}
const getOverview = () => {
  return axios.get(`api/v1/overview`)
}
export { postCreateUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postRegister, getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin, deleteQuizForAdmin, putQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, postAssignQuiz, getQuizWithQA, postUpsertQA, logout, getOverview } 