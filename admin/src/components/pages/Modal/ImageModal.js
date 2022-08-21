import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './imageModal.css';
import Modal from 'react-bootstrap/Modal';

const ImageModal = props => {
  // const [wordData, setWordData] = useState(null);
  // const [wordData, setWordData] = useState(images[0]);
  // const handleClick = index => {
  //   console.log(index);
  //   const wordSlider = images[index];
  //   setWordData(wordSlider);
  // };
  // const [activeThumb, setActiveThumb] = useState();
  return (
    // <div className="image-model-main ">
    //   <div className="cross">
    //     <svg
    //       onClick={() => setModal(false)}
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //       strokeWidth={2}
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M6 18L18 6M6 6l12 12"
    //       />
    //     </svg>
    //   </div>
    //   <div className="main-image">
    //     {/* <img
    //       src={process.env.REACT_APP_DEV_URL+"/" + wordData?.image}
    //       height="300"
    //       width="500"
    //     /> */}
    //   </div>
    //   <div className="flex_row">
    //     {images
    //       ? images.map((data, i) => (
    //           <div className="thumbnail" key={i}>
    //             <img
    //               className={wordData?.id == i ? 'clicked' : ''}
    //               src={process.env.REACT_APP_DEV_URL + '/' + data.image}
    //               onClick={() => handleClick(i)}
    //               height="70"
    //               width="100"
    //             />
    //           </div>
    //         ))
    //       : null}
    //   </div>
    // </div>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    // style={{ width: '1000px' }}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body style={{ color: 'black' }}>
        <div className="image-model-main">
          <Carousel infiniteLoop={true} autoPlay={false} transitionTime="1000">
            {props.images?.map(image => {
              return (
                <div className="image">
                  <img src={process.env.REACT_APP_DEV_URL + '/' + image} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ImageModal;

{
  /* <Carousel>
{images.map(image => {
  return (
    <div>
      <img src="https://picsum.photos/700/400?img=1" />
    </div>
  );
})}
</Carousel> */
}

// {/* <Modal
// centered
// show={props.show}
// onHide={props.onHide}
// keyboard={false}
// className="image_model_body"
// >
// <Modal.Body>
//     {/* <div className=''>
//         <img src={homeImage} />
//     </div> */}
//     <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
//         {/* <div className="carousel-indicators">
//             <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//             <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
//             <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
//         </div> */}
//         <div className="carousel-inner">
//             <div className="carousel-item active">
//                 <img src={homeImage} className="home_Model_img" />
//                 {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg> */}
//             </div>
//             <div className="carousel-item">
//                 <img src={homeImage} className="home_Model_img" />
//                 {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg> */}
//             </div>
//             <div className="carousel-item">
//                 <img src={homeImage} className="home_Model_img" />
//                 {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777" /></svg> */}
//             </div>
//         </div>
//         <button className="carousel-control-prev Previous_button" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next next_button" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//         </button>
//     </div>
// </Modal.Body>
// </Modal> */}
