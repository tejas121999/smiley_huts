import './testimony.css';
import mapImg from './layout/images/phone.png';

const Testimony = ({ title, indexVal, value }) => {
  console.log("value", value)
  return (
    <>
      <div className="testimony-main">
        <h1 style={{ marginBottom: '50px' }}>{title}</h1>
        <div className="testimony-container">
          <div className="testimony-text">
            <p>
              {value.title}
            </p>
            <p style={{ fontWeight: 'bold' }}>{value.name}</p>
            <p>{value.city}</p>
          </div>
          <div className="testimony-img">
            <img
              src={value.img}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Testimony;
