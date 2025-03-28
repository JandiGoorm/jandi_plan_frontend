import styles from "./Sliders.module.css";
import { Button, EmptyItem } from "@/components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useEffect, useState } from "react";

const Sliders = ({ items, children, size = "sm", onLastSlide }) => {
  const sliderRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    afterChange: (current) => {
      setCurrentSlide(current);

      // 마지막 슬라이드 감지 & onLastSlide 콜백이 있을 때만 실행
      if (onLastSlide && current + 3 >= items.length) {
        onLastSlide();
      }
    },
  };

  const updateSlidesToShow = () => {
    if (window.innerWidth < 600) {
      setSlidesToShow(1);
    } else if (window.innerWidth < 900) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  };

  useEffect(() => {
    updateSlidesToShow(); // 처음에 설정
    window.addEventListener("resize", updateSlidesToShow); // 화면 크기 변경 시 반영
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      const totalSlides = items.length;
      let slidesToShow = settings.slidesToShow; // 기본값 가져오기

      // 반응형 설정 적용 (현재 뷰포트에 맞는 slidesToShow 찾기)
      if (window.innerWidth < 600) {
        slidesToShow = 1;
      } else if (window.innerWidth < 900) {
        slidesToShow = 2;
      }

      // 버튼 표시 여부 설정
      if (totalSlides > slidesToShow) {
        setShowPrev(currentSlide > 0);
        setShowNext(currentSlide + slidesToShow < totalSlides);
      } else {
        setShowPrev(false);
        setShowNext(false);
      }
    }
  }, [items, currentSlide, settings.slidesToShow]);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(Math.max(currentSlide - slidesToShow, 0));
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(currentSlide + slidesToShow);
    }
  };

  return (
    <div className={styles.container}>
      {showPrev && (
        <Button className={styles.prev_btn} variant="none" onClick={handlePrev}>
          <MdNavigateBefore size={24} />
        </Button>
      )}
      <div
        className={`${styles.slider_container} ${
          size === "sm" ? styles.sm_container : styles.md_container
        }`}
      >
        {items.length === 0 ? (
          <EmptyItem />
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {[...items, ...Array(Math.max(0, 3 - items.length)).fill(null)].map(
              (item, index) => (
                <div
                  key={index}
                  className={`${styles.place_box} ${
                    size === "sm" ? styles.sm_place_box : styles.md_place_box
                  }`}
                >
                  {item ? (
                    children(item)
                  ) : (
                    <div className={styles.empty_slide} />
                  )}
                </div>
              )
            )}
          </Slider>
        )}
      </div>

      {showNext && (
        <Button className={styles.next_btn} onClick={handleNext}>
          <MdNavigateNext size={24} />
        </Button>
      )}
    </div>
  );
};

export default Sliders;
