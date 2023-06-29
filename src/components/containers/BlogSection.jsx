import { useCallback, useRef, useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Blog } from "../elements";
import { Spinner } from "../utils";
import firebase from '../../database/firebase/config';
import { orderByProperty } from "../../lib/utils";

const BlogSection = ({ posts }) => {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState([]);

  const sliderRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    firebase.db.collection('Projects').onSnapshot(query => {
      const list = query.docs.map(doc => {
        const {
          active,
          company,
          creationYear,
          description,
          name,
          platform,
          thumbUrl,
          urlImage
        } = doc.data();

        return {
          id: doc.id,
          active,
          company,
          creationYear,
          description,
          name,
          platform,
          thumbUrl,
          urlImage
        };
      }).filter(x => !!x.active);

      const result = orderByProperty(list, 'creationYear', true);

      setProjects(result);
    });
  }, []);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!mounted)
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );

  if (projects.length === 0) return null;

  return (
    <div className="swiper-holder">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={28}
        slidesPerView={3}
        autoplay={{ delay: 5000 }}
        centerInsufficientSlides={true}
        ref={sliderRef}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {projects.length > 0 &&
          projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="slider-item">
                <Blog
                  post={{
                    title: project.name,
                    date: project.creationYear,
                    thumb: project.thumbUrl,
                    description: project.description
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <button className="swiper-button-prev" onClick={handlePrev}></button>
      <button className="swiper-button-next" onClick={handleNext}></button>
    </div>
  );
};

export default BlogSection;
