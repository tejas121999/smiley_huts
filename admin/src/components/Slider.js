// import Slider from 'react-slick';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import 'react-multi-carousel/lib/styles.css';
// import image from "../components/layout/images/LOCATIONS"
const SliderComp = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const itemData = [
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/banff.png',
      title: 'banff',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/Calgary.png',
      title: 'Calgary',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/Montreal.png',
      title: 'Montreal',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/NiagraFalls.png',
      title: 'NiagraFalls',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/PriceEdwardIsland.png',
      title: 'PriceEdwardIsland',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/Toronto.png',
      title: 'Toronto',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/Vancouver.png',
      title: 'Vancouver',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/VictoriaBC.png',
      title: 'VictoriaBC',
    },
    {
      img: 'https://smileyhuts.com/images/LOCATIONS/Whistler.png',
      title: 'Whistler',
    },
  ];

  console.log("images =====", itemData.img)
  return (
    <Carousel
      showDots={false}
      responsive={responsive}
      autoPlay={false}
      ssr={true}
      infinite={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >

      {itemData.map((item, index) => {
        return (

          <div className="slide-item" key={index}>
            <div className="item-img">
              <img src={item.img} alt="" />
              <div className="item-text">{item.title}</div>
            </div>
          </div>

        );
      })}

    </Carousel>
  );
};
export default SliderComp;
