import styles from "./Field.module.css";

/**
 *
 * @param {string} label // 라벨
 * @param {React.ReactNode} children // 자식 컴포넌트(Input, Select, Textarea)
 * @param {import("react-hook-form").FieldError} error // 에러 객체
 * @param {boolean} isRequire // 필수 여부
 * @param {string} helperText // 도움말
 * @param {React.HTMLProps<HTMLDivElement>} props // 추가적인 컨테이너 속성
 * @returns
 */
const Field = ({ label, children, error, isRequire, helperText, ...props }) => (
  <div className={styles.container} {...props}>
    {(label || isRequire || helperText) && (
      <div className={styles.header}>
        <label className={styles.label}>
          {isRequire && <p className={styles.require}>*</p>}
          <p>{label}</p>
        </label>
        {helperText && <p className={styles.helper_text}>{helperText}</p>}
      </div>
    )}

    {children}
    {error && <p className={styles.error}>{error.message}</p>}
  </div>
);

export default Field;
