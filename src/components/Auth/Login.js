import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { toast } from 'react-toastify';
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    //validate


    //call api
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
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
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);

    }
  }
  return (
    <div className='login-container'>
      <div className='header '>
        <span>Don't have an account yet?</span>
        <button onClick={()=>navigate('/register')}>Sign up</button>
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
          <button type='submit' className='btn btn-primary login' onClick={() => handleLogin()}>Login</button>
        </div>

      </div>
    </div>
  )
}
export default Login;