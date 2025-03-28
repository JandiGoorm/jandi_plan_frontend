const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const formatISO = (iso) => {
  if (!iso) return "";

  const now = new Date();
  const date = new Date(iso);
  const diff = now.getTime() - date.getTime();

  if (diff < MINUTE) {
    return "방금 전";
  } else if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE)}분 전`;
  } else if (diff < DAY) {
    return `${Math.floor(diff / HOUR)}시간 전`;
  } else if (diff < WEEK) {
    return `${Math.floor(diff / DAY)}일 전`;
  } else if (diff < MONTH) {
    return `${Math.floor(diff / WEEK)}주 전`;
  } else if (diff < YEAR) {
    return `${Math.floor(diff / MONTH)}달 전`;
  } else {
    return `${Math.floor(diff / YEAR)}년 전`;
  }
};

export const formatDay = (iso) => {
  if (!iso) return "";

  const date = new Date(iso);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
};

export const formatPrice = (price) => {
  const number = parseInt(price);

  if (isNaN(number)) {
    return "";
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
