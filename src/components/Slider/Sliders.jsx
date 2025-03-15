import styles from "./Sliders.module.css";
import {Button} from "@/components";
import { MdNavigateBefore,MdNavigateNext  } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

const Sliders = ({ items, children, size="sm" }) => {
  const sliderRef = useRef(null);

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
      };

      const handlePrev = () => {
        sliderRef.current?.slickPrev();
      };
    
      const handleNext = () => {
        sliderRef.current?.slickNext();
      };

      return(
        <div className={styles.container}>
          <Button className={styles.prev_btn} variant="none" onClick={handlePrev}>
            <MdNavigateBefore size={24} />
          </Button>
          <div
              className={`${styles.slider_container} ${
              size === "sm" ? styles.sm_container : styles.md_container
              }`}
          >
            <Slider ref={sliderRef} {...settings}>
                {items.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.place_box} ${
                        size === "sm" ? styles.sm_place_box : styles.md_place_box
                    }`}
                >
                    {children(item)}
                </div>
                ))}
            </Slider>
          </div>
          <Button className={styles.next_btn} onClick={handleNext}>
            <MdNavigateNext size={24} />
          </Button>
        </div>
      );

}

export default Sliders;