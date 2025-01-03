import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/action/userAction';
import { ImSpinner2 } from "react-icons/im";
import Language from '../Header/Language';
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    //validate


    //call api
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(
        loginSuccess(data)
      );
      toast.success(data.EM, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      navigate('/')
      setIsLoading(false);
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  }
  return (
    <div className='login-container'>
      <div className='header '>
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate('/register')}>Sign up</button>
        <Language />
      </div>
      <div className='title col-3 mx-auto' onClick={() => { navigate('/') }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
        ReactJS
      </div>
      <div className='welcome col-3 mx-auto'>
        Hello, who’s this?
      </div>
      <div className='content-form col-3 mx-auto'>
        <div className='form-group'>
          <label className='form-label'>Email</label>
          <input type='email' className='form-control'
            value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className='form-group'>
          <label className='form-label'>Password</label>
          <input type='password' className='form-control' value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button type='submit' className='btn btn-primary login' onClick={() => handleLogin()} disabled={isLoading}> {isLoading && <ImSpinner2 className="loaderIcon" />}<span> Login</span> </button>
        </div>

      </div>
    </div>
  )
}
export default Login;