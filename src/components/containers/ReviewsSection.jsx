import { useCallback, useRef, useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Review } from "../elements";
import firebase from '../../database/firebase/config';
import { orderByProperty } from '../../lib/utils';

const ReviewsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    firebase.db.collection('Testimonials').onSnapshot(query => {
      const list = query.docs.map(doc => {
        const {
          active,
          company,
          description,
          name,
          position,
          urlImage,
          urlRRSS
        } = doc.data();

        return {
          active,
          company,
          description,
          name,
          position,
          urlImage,
          urlRRSS
        };
      }).filter(x => !!x.active);

      setTestimonials(orderByProperty(list, 'name'));
    })
  }, [])

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{
          delay: 4000,
        }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {testimonials.length > 0 && testimonials?.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="slider-item">
              <Review review={{
                name: testimonial.name,
                meta: `${testimonial.position} en ${testimonial.company}`,
                text: testimonial.description,
                image: testimonial.urlImage
              }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev} />
      <button className="swiper-button-next" onClick={handleNext} />
    </div>
  );
};

export default ReviewsSection;