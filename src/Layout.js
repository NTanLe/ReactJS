import { Route, Routes } from "react-router-dom";
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from 'react';
const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      <h1>404. Page Not Found</h1>
    </div>
  )
};
const Layout = (props) => {
  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='user' element={
            <PrivateRoute>
              <ListQuiz />
            </PrivateRoute>
          } />
        </Route>
        <Route path='quiz/:id' element={<DetailQuiz />} />
        <Route path='admin' element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path='manage-user' element={<ManageUser />} />
          <Route path='manage-quizzes' element={<ManageQuiz />} />
          <Route path='manage-questions' element={<Questions />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Suspense>
  )
}
export default Layout;  