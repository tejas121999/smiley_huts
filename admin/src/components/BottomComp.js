import { useNavigate } from 'react-router-dom';

import ourStory from './layout/images/EASY AND FUN WITH OVERLAY.png';
const BottomComp = () => {
  const navigate = useNavigate();
  return (
    <div className="bottom" style={{ width: '100%' }}>
      <div className="botttom-img" style={{ width: '100%' }}>
        <img src={ourStory} alt="" style={{ width: '100%' }} />
      </div>
      <div className="black-over">
        <h1>Smiley Huts make</h1>
        <h1> work Stays Easy and Fun!</h1>
        <p>
          Come experience a revolution in home stays. Join Us Today!
        </p>
        <button
          className="become-member-button btn-green"
          onClick={() => window.location.href = '/register'}
          style={{ height: '6vh', width: '25%', borderRadius: '5px', border: 'none' }}
        >
          Become a Member
        </button>
      </div>
    </div>
  );
};
export default BottomComp;
