export const titleVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      staggerChildren: 0.5,
    },
  },
};

export const descContainerVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.5,
      staggerChildren: 0.5,
    },
  },
};

export const lineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
};

export const youtubeContents = [
  {
    owner: "빠니보틀",
    city: "방콕",
    title: "동남아 안 가본 곽튜브와 함께하는 방콕 여행",
    src: "https://www.youtube.com/embed/F2utz6L76D0?si=UB970g9FtXdgovQf",
    linkUrl: "https://www.youtube.com/watch?v=F2utz6L76D0",
  },
  {
    owner: "곽튜브",
    city: "도쿄",
    title: "일본 도쿄, 아키하바라 메이드 카페를 다녀왔습니다 !",
    src: "https://www.youtube.com/embed/84zkJa9xIVA?si=JLjRyCTGHWYWmR_i",
    linkUrl: "https://www.youtube.com/watch?v=84zkJa9xIVA",
  },
  {
    owner: "여행작가 봄비",
    city: "서울",
    title: "서울 꼭 가봐야 할 곳 11",
    src: "https://www.youtube.com/embed/qqkrdK0Gl-s?si=xZMrNple8tdnfmG0",
    linkUrl: "https://www.youtube.com/watch?v=qqkrdK0Gl-s",
  },
];

export const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};
