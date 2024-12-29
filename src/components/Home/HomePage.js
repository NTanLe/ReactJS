import video from '../../assets/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  // console.log(account, isAuthenticated);
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source
          src={video}
          type="video/webm"
        />
      </video>
      <div className='homepage-content'>
        <div className='title-1'>  {t('homepage.title1')}</div>
        <div className='title-2'> {t('homepage.title2')}</div>
        <div className='title-3'> {isAuthenticated === false ?
          <button onClick={() => navigate('/login')}>Get started-it's free</button>
          : <button onClick={() => navigate('/user')}>Doing quiz now</button>} </div>

      </div>
    </div>
  )
}
export default HomePage;