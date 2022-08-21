// import Slider from 'react-slick';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import 'react-multi-carousel/lib/styles.css';
import Testimony from './Testimony';
// import image from "../components/layout/images/harry.png"


const TestimonySlider = ({ title }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
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
      img: 'https://smileyhuts.com/images/harry.png',
      title: 'We experienced home stay like never before.It was our short trip to Calgary for my wife and I, and we really loved the warm and comfortable experience provided.I would definitely recommend Smiley Huts for all Canadians',
      name: "Steve",
      city: "Vancouver"
    },
    {
      img: 'https://smileyhuts.com/images/shabana.png',
      title: 'I had been wanting to do a road trip but the stay expenses never allowed a student like me to even think about it. With Smiley Huts, I can travel wherever I want without worrying about the price of the stay. Smiley Huts, you rock!',
      name: "Harry",
      city: "Toronto"
    },
    {
      img: 'https://smileyhuts.com/images/steve.png',
      title: 'Expenses are never decreasing. With a family of 4, we can hardly image travelling across the country. Smiley Huts not only made it affordable, it gave my children a different view of the world.',
      name: "Katherine",
      city: "Nova Scotia"
    },
    {
      img: 'https://smileyhuts.com/images/SimiZhou.jpg',
      title: 'My friend was in hospital and I had to immediately travel to Montreal. It was an emergency and I had no where to go. Thanks to Smiley Huts, they made the booking easy and affordable at such a short notice - ',
      name: "Simi Zhou",
      city: "Richmond"
    },
  ];
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
      {/* <h1>{title}</h1> */}
      {itemData.map((item, idx) => {
        return <Testimony title={title} indexVal={idx} value={item} />;
      })}
    </Carousel>
  );
};
export default TestimonySlider;
