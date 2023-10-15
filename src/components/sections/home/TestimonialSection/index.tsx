import { FC, useRef } from 'react';
import Slider from '@ant-design/react-slick';

import SliderButton from '@components/atoms/SliderButton';
import TestimonialCard from '@components/molecules/TestimonialCard';

import { testimonials } from '@constants/testimonialSectionDetails';

export interface TestimonialSectionProps {}

const TestimonialSection: FC<TestimonialSectionProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const arrowRef = useRef<any>(null);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    ref: arrowRef,
  };

  return (
    <div className="p-12 tablet:p-10 desktop:pt-12 desktop:px-28 tablet:pb-24">
      <div className="relative">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} text={testimonial.text} />
          ))}
        </Slider>
        <SliderButton
          onClick={() => {
            if (arrowRef?.current != null) arrowRef.current.slickPrev();
          }}
          isPrev
        />
        <SliderButton
          onClick={() => {
            arrowRef?.current?.slickNext();
          }}
          isPrev={false}
        />
      </div>
    </div>
  );
};

export default TestimonialSection;
