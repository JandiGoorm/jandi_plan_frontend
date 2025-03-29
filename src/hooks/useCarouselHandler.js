import { useCallback, useEffect, useState } from "react";

const useCarouselHandler = (emblaApi, setCurrent, autoplay) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();

    if (autoplay) {
      autoplay.reset();
    }
  }, [autoplay, emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();

    if (autoplay) {
      autoplay.reset();
    }
  }, [autoplay, emblaApi]);

  const onSelect = useCallback(
    (emblaApi) => {
      if (!emblaApi) return;
      updateScrollButtons();

      if (!setCurrent) return;
      setCurrent(emblaApi.selectedScrollSnap());
    },
    [setCurrent, updateScrollButtons]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    onPrevButtonClick,
    onNextButtonClick,
    canScrollPrev,
    canScrollNext,
  };
};

export default useCarouselHandler;
