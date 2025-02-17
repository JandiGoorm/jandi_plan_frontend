import styles from "./Sliders.module.css";
import {Button} from "@/components";
import { MdNavigateBefore,MdNavigateNext  } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Sliders = ({ items, children, size="sm" }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
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

      return(
        <div
            className={`${styles.slider_container} ${
            size === "sm" ? styles.sm_container : styles.md_container
            }`}
        >
            <Slider {...settings}>
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
      );

}

export default Sliders;