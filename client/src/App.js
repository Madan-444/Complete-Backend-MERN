import React, { useState } from 'react';
import Layout from './core/Layout'
import img1 from './core/img_snow_wide1.jpg'
import img2 from './core/img_nature_wide2.jpg'
import img3 from './core/img_mountains_wide3.jpg'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: img1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: img2,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: img3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];


function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });
  return (
    <>
    <Layout>
      <div style={{backgroundColor:'black',marginTop:'30px',height:'400px'}}>
      <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
      </div>
      
     
     
    </Layout>
    </>
  );
}

export default App;
