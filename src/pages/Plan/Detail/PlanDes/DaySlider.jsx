import { formatDate } from "date-fns";
import styles from "./DaySlider.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCarouselHandler } from "@/hooks";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Button } from "@/components";

const DaySlider = ({ items, setDay, focusDay }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const { onPrevButtonClick, onNextButtonClick, canScrollPrev, canScrollNext } =
    useCarouselHandler(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla_viewport} ref={emblaRef}>
        <div className={styles.embla_container}>
          <div
            className={focusDay ? styles.embla_slide : styles.focus_embla_slide}
            onClick={() => setDay(null)}
          >
            <p>예약 내역</p>
          </div>

          {items.map((item) => {
            const isFocus = focusDay === item.date;

            return (
              <div
                key={item.day}
                className={
                  isFocus ? styles.focus_embla_slide : styles.embla_slide
                }
                onClick={() => setDay(item.date)}
              >
                <p>
                  {formatDate(item.date, "MM월 dd일")} ({item.day}일차)
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {canScrollPrev && (
        <Button className={styles.prev_btn} onClick={onPrevButtonClick}>
          <MdNavigateBefore size={24} />
        </Button>
      )}

      {canScrollNext && (
        <Button className={styles.next_btn} onClick={onNextButtonClick}>
          <MdNavigateNext size={24} />
        </Button>
      )}
    </section>
  );
};

export default DaySlider;
