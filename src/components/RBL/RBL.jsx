import styles from "./RBL.module.css";

function RBL({ data, handleChange, isChecked, name }) {
  const priorities = Object.keys(data);
  return (
    <fieldset className={styles.container}>
      <legend className={styles.subHdr}>Priority</legend>
      {priorities.map((val, ind) => (
        <span className={styles.rb} key={ind}>
          <input
            type="radio"
            id={val}
            name={name}
            value={val} 
            onChange={handleChange}
            checked={isChecked === val}
          />
          <label htmlFor={val} tabIndex="0">
            {val}
          </label>
        </span>
      ))}
    </fieldset>
  );
}

export default RBL;
