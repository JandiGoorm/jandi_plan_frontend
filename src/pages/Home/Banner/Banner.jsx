import { Loading } from "@/components";
import { APIEndPoints } from "@/constants";
import { useAxios } from "@/hooks";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import BannerOverlay from "./BannerOverlay";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const { fetchData, response, loading } = useAxios();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 6000,
    }),
  ]);

  useEffect(() => {
    fetchData({
      method: "GET",
      url: APIEndPoints.BANNER,
    });
  }, [fetchData]);

  if (loading) return <Loading isSection={true} style={{ height: "40rem" }} />;
  return (
    <section className={styles.embla}>
      <div className={styles.embla_viewport} ref={emblaRef}>
        <div className={styles.embla_container}>
          {response?.items.map((item) => (
            <div className={styles.embla_slide} key={item.bannerId}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles.embla_image}
              />
            </div>
          ))}
        </div>
      </div>

      <BannerOverlay
        currentIndex={currentIndex}
        allBanners={response?.items}
        emblaApi={emblaApi}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};

export default Banner;
