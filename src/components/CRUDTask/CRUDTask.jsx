import { useState, useEffect } from "react";
import RBL from "../RBL/RBL";
import { priorities } from "../../data/appData";
import styles from "./CRUDTask.module.css";
import Button from "../Button/Button";

function CRUDTask({
  toggleTaskView,
  handleEditDelete,
  setTasks,
  tasks,
  editIndex,
  deleteIndex,
}) {
  const [taskData, setTaskData] = useState({
    task: "",
    notes: "",
    priority: "Low",
  });
  const [isError, setIsError] = useState(false);
  const checkForVal = (val) => val !== null && val !== undefined;
  const isEdit = checkForVal(editIndex);
  const isDelete = checkForVal(deleteIndex);

  useEffect(() => {
    if (isEdit) {
      const { task, notes, priority } = tasks[editIndex];
      setTaskData({ task, notes, priority });
    }
  }, [editIndex, tasks, isEdit]);

  const handleTaskData = ({ target: { value } }, field) =>
    setTaskData({ ...taskData, [field]: value });

  const addTask = () => {
    const { task, notes, priority } = taskData;
    const newTask = {
      task,
      notes,
      priority,
      date: new Date().toLocaleString(),
      progress: "To do",
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = () => {
    const { task, notes, priority } = taskData;
    const updatedTask = tasks.map((val, ind) =>
      ind === editIndex ? { ...val, task, notes, priority } : val
    );
    setTasks(updatedTask);
  };

  const deleteTask = () => {
    const removedTask = [...tasks];
    removedTask.splice(deleteIndex, 1);
    setTasks(removedTask);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!taskData.task && !isDelete) {
      setIsError(true);
      return;
    }
    isEdit ? editTask() : isDelete ? deleteTask() : addTask();
    handleEditDelete(e, null, isDelete);
  };

  const handleKeyUp = ({ key }) => key === "Enter" && submit();

  const DeleteTask = () => {
    const title = tasks[deleteIndex].task;
    return (
      <div className={styles.delete}>
        <div className={styles.subHdr}>Are you sure you want to delete?</div>
        <div className={styles.subHdr}>{title}?</div>
        <Button css="cancel" onClick={toggleTaskView}>
          Cancel
        </Button>
        <Button css="deleteTask" onClick={submit}>
          Delete
        </Button>
      </div>
    );
  };

  return (
    <section className={styles.container} onClick={toggleTaskView}>
      <div className={styles.addTaskCont}>
        <div
          className={`${styles.addTask} ${isDelete ? styles.deleteTask : ""}`}
        >
          <div className={styles.heading}>
            <h2 className={styles.hdr}>
              {isEdit ? "Edit" : isDelete ? "Delete" : "Add"} Task
            </h2>
            <span className={styles.close} onClick={toggleTaskView}>
              X
            </span>
          </div>
          <form>
            {isDelete ? (
              <DeleteTask />
            ) : (
              <>
                <label className={styles.subHdr} htmlFor="task">
                  Task
                </label>
                <input
                  id="task"
                  className={styles.input}
                  onChange={(e) => handleTaskData(e, "task")}
                  onKeyUp={handleKeyUp}
                  type="text"
                  placeholder="Type your task here..."
                  value={taskData.task}
                  autoFocus
                />
                <label className={styles.subHdr} htmlFor="otherNotes">
                  Other notes:
                </label>
                <textarea
                  id="otherNotes"
                  name="otherNotes"
                  rows="5"
                  className={styles.input}
                  onChange={(e) => handleTaskData(e, "notes")}
                  value={taskData.notes}
                  placeholder="Type any other notes here..."
                ></textarea>
                <RBL
                  data={priorities}
                  handleChange={(e) => handleTaskData(e, "priority")}
                  isChecked={taskData.priority}
                  name="priority"
                />
                <Button css="addTask" onClick={submit}>
                  Save
                </Button>
                <div
                  className={`${styles.error} ${isError ? styles.show : ""}`}
                >
                  Please enter a task title
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default CRUDTask;
