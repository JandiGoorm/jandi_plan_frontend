import { useCallback, useEffect } from "react";

const useCarouselHandler = (emblaApi, setCurrent) => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(
    (emblaApi) => {
      setCurrent(emblaApi.selectedScrollSnap());
    },
    [setCurrent]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export default useCarouselHandler;
