import styles from "./Button.module.css";

const Button = ({ children, css, onClick }) => (
  <button className={`${styles.btn} ${styles[css]}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
