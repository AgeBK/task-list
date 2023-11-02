import { useState } from "react";
import CRUDTask from "../CRUDTask/CRUDTask";
import Button from "../Button/Button";
import Sort from "../Sort/Sort";
import edit from "../../svg/edit.svg";
import remove from "../../svg/remove.svg";
import { defaultTasks, priorities } from "../../data/appData";
import styles from "./Tasks.module.css";

const Task = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(defaultTasks);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const [isHover, setIsHover] = useState([]);

  const handleEditDelete = (e, val, isDelete) => {
    isDelete ? setDeleteIndex(val) : setEditIndex(val);
    toggleTaskView(e);
  };

  const toggleTaskView = (e) => {
    if (e.target === e.currentTarget) {
      if (showAddTask) {
        setEditIndex(null);
        setDeleteIndex(null);
      }
      setShowAddTask(!showAddTask);
    }
  };

  const formatDate = (val) => val.split(",")[0];

  const updateProgress = (ind, progress) => {
    let progressVal = "To do";
    switch (progress) {
      case "To do":
        progressVal = "In progress";
        break;
      case "In progress":
        progressVal = "Done";
        break;
      default:
        break;
    }
    const updatedTask = tasks.map((val, index) =>
      ind === index ? { ...val, progress: progressVal } : val
    );
    setTasks(updatedTask);
  };

  const reverseTaskOrder = () => {
    // sortOrder && handleSort(sortOrder);
    const reversed = tasks.reverse();
    setTasks(reversed);
    setIsAsc(!isAsc);
  };

  const handleHover = (index, val) => {
    const arr = [...isHover];
    arr[index] = val;
    setIsHover(arr);
  };

  const TaskHdr = ({ ind, val }) =>
    ind === 0 && (
      <>
        <div className={styles.hdr}>{val}</div>
        {sortOrder === val.toLowerCase() && (
          <span
            className={`${styles.arrow} ${isAsc ? styles.up : styles.down}`}
            onClick={reverseTaskOrder}
          ></span>
        )}
      </>
    );

  return (
    <section
      className={`${styles.container} ${showAddTask ? styles.addTaskMode : ""}`}
    >
      <header className={styles.header}>
        <h1>Task List</h1>
        <Sort
          // handleSort={handleSort}
          setSortOrder={setSortOrder}
          setTasks={setTasks}
          tasks={tasks}
          isAsc={isAsc}
        />
        <Button css="addTask" onClick={toggleTaskView}>
          <span>+</span>
          Add Task
        </Button>
      </header>
      {showAddTask && (
        <CRUDTask
          toggleTaskView={toggleTaskView}
          handleEditDelete={handleEditDelete}
          setTasks={setTasks}
          tasks={tasks}
          editIndex={editIndex}
          deleteIndex={deleteIndex}
        />
      )}
      <main className={styles.taskList}>
        {tasks.map(({ task, notes, priority, date, progress }, ind) => (
          <div className={styles.taskCont} key={ind}>
            <div className={styles.task}>
              <TaskHdr ind={ind} val="Task" />
              <div
                className={styles.title}
                onMouseEnter={() => handleHover(ind, true)}
                onMouseLeave={() => handleHover(ind, false)}
                onClick={(e) => handleEditDelete(e, ind, false)}
              >
                {task}
              </div>
              {notes && (
                <div
                  className={`${styles.notesCont} ${
                    isHover[ind] ? styles.block : ""
                  }`}
                >
                  <div className={styles.notes}>
                    <span
                      className={`${styles.arrow} ${styles.up} ${styles.noteTip}`}
                    ></span>
                    {notes}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.priority}>
              <TaskHdr ind={ind} val="Priority" />
              <div
                className={`${styles.title} ${styles[priority.toLowerCase()]}`}
              >
                {priority}
              </div>
            </div>
            <div className={styles.date}>
              <TaskHdr ind={ind} val="Date" />
              <div>{formatDate(date)}</div>
            </div>
            <div className={styles.progress}>
              <TaskHdr ind={ind} val="Progress" />
              <Button onClick={() => updateProgress(ind, progress)}>
                {progress}
              </Button>
            </div>
            <div className={styles.progressCircle}>
              <div
                className={`${styles.circle} ${
                  styles[progress.replace(" ", "").toLowerCase()]
                }`}
              >
                <div className={styles.inner}></div>
              </div>
            </div>
            <div className={styles.actions}>
              <TaskHdr ind={ind} val="Actions" />
              <div className={styles.actionImgs}>
                <img
                  src={edit}
                  className={styles.edit}
                  alt="edit"
                  onClick={(e) => handleEditDelete(e, ind, false)}
                />
                <img
                  src={remove}
                  className={styles.remove}
                  alt="remove"
                  onClick={(e) => handleEditDelete(e, ind, true)}
                />
              </div>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default Task;
