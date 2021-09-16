import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import nbaCourt from "../assets/nba-court.png";
import nflStadium from "../assets/nfl-stadium.png";
import mlbStadium from "../assets/mlb-stadium.png";

import '../pages/home.css';

const ImageCarousel = () => {
  return (
    <div className='carousel-container'>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={3}
        interval="4000"
        isPlaying="true"
        playDirection="forward"
        infinite="true"
      >
        <Slider>
          <Slide index={0}>
            <Image src={nbaCourt} />
          </Slide>
          <Slide index={1}>
            <Image src={nflStadium} />
          </Slide>
          <Slide index={2}>
            <Image src={mlbStadium} />
          </Slide>
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default ImageCarousel;
