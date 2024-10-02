"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

interface PicCarouselProps {}
const PicCarousel: React.FC<PicCarouselProps> = () => {
  return (
    <div className="mt-10">
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div>
          <img
            src="23-24menchampion.jpg"
            alt="carouselPicture"
            className="w-full h-[36rem] object-cover rounded-md"
          />
          <p className="legend">
            NBA Golden State Warriors player Moses Moody attended the SVCSA
            Season 23-24 Finals in person, pictured with the champion team, NK.
          </p>
        </div>
        <div>
          <img
            src="23-24men-opensecondplace.jpg"
            alt="carouselPicture"
            className="w-full h-[36rem] object-cover rounded-md"
          />
          <p className="legend">
            NBA Golden State Warriors player Moses Moody attended the SVCSA
            Season 23-24 Finals in person, pictured with True team.
          </p>
        </div>
        <div>
          <img
            src="23-24women-openchampion.jpg"
            alt="carouselPicture"
            className="w-full h-[36rem] object-cover rounded-md"
          />
          <p className="legend">
            SMG - Women-open Championship for SVCSA Season 23-24{" "}
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default PicCarousel;
