import styles from "./Sort.module.css";
import { sort, priorities } from "../../data/appData";

function Sort({ setSortOrder, setTasks, tasks, isAsc }) {
  const handleSort = ({ target: { value } }) => {
    let sorted = [];
    switch (value) {
      case "priority":
        sorted = tasks.sort((a, b) => {
          const valA = priorities[a[value]];
          const valB = priorities[b[value]];
          return valA < valB ? -1 : 1;
        });
        break;
      case ("date", ""):
        sorted = tasks.sort((a, b) =>
          a.date < b.date ? 1 : a.date > b.date ? -1 : 0
        );
        break;
      default:
        sorted = tasks.sort((a, b) =>
          a[value].toLowerCase() < b[value].toLowerCase() ? -1 : 1
        );
        break;
    }

    !isAsc && sorted.reverse();
    setSortOrder(value);
    setTasks(sorted);
  };

  return (
    <label htmlFor="sort">
      Sort By:
      <select id="sort" onChange={handleSort} className={styles.select}>
        <option value="">-- Select --</option>
        {sort.map((val) => (
          <option value={val.toLowerCase()} key={val}>
            {val}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Sort;
