import styles from "./Button.module.css";

/**
 * @typedef {Object} ButtonProps
 * @property {"sm" | "md" | "lg"} [size]
 * @property {boolean} [isInModal] // 모달은 다크모드 일때도, 배경이 흰색이기때문에, 해당값을 받아서 스타일을 변경해줍니다.
 * @property {"solid" |"outline" | "ghost" | "none"}[variant]
 * @property {React.ReactNode} children
 */

/**
 * @typedef {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} CombinedButtonProps
 */

/**
 *
 * @param {CombinedButtonProps} props
 * @returns {JSX.Element}
 */
const Button = ({
  size = "md",
  variant = "solid",
  isInModal = false,
  children,
  ...props
}) => {
  const sizeClass = styles[`btn_${size}`];
  const variantClass = styles[`btn_${variant}`];

  return (
    <button
      className={`${sizeClass} ${variantClass} ${
        isInModal ? styles.modal_btn : styles.btn
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
