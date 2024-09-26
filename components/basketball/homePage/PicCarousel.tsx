"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const images = [
  "carousel1.jpg",
  "carousel2.jpg",
  "carousel3.jpg",
  "season23-24picture.jpg",
];
interface PicCarouselProps {}
const PicCarousel: React.FC<PicCarouselProps> = () => {
  return (
    <div className="mt-10">
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <img
            src="season23-24picture.jpg"
            className="w-full h-[36rem] object-cover rounded-md"
          />
          <p className="legend">NBA player Moses Moody attended the SVCSA Season 23-24 Finals in person</p>
        </div>
        <div>
          <img
            src="carousel2.jpg"
            className="w-full h-[36rem] object-fill rounded-md"
          />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img
            src="carousel3.jpg"
            className="w-full h-[36rem] object-fill rounded-md"
          />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default PicCarousel;
