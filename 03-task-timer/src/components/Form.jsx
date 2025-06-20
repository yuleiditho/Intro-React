import React, { useMemo, useState, useEffect } from "react";

function Form() {
  //Cargar tareas desde localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [duration, setDuration] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      switch(filter){
        case "short":
          return task.time < 30;
        case "medium":
          return task.time >= 30 && task.time <= 60;
        case "long":
          return task.time > 60;
      }
      return true;
    });
  }, [tasks, filter]);

  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculado tiempo total...");
    return tasks.reduce((total, task) => total + task.time, 0);
  }, [tasks]); // Solo se recalcula cuando cambian las tareas

  //UseEffect: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Tiempo: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]); // Agregar calcularTiempoTotal como dependencia

  const addTask = () => {
    if (newTask && duration) {
      const newTaskObj = {
        nombre: newTask,
        time: parseInt(duration),
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      setDuration("");
    }
  };

  return (
    <section className="appContainer">
      <h1 className="header">Contador de Tareas</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nombre de la tarea"
          className="taskInput"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duración en minutos"
          className="durationInput"
        />
        <button className="addButton" onClick={addTask}>
          Agregar tarea
        </button>
      </div>

      <div className="filterWrapper">
        <label className="filterLabel">Filtrar por duración: </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filterDropdown"
        >
          <option value="all">Todas</option>
          <option value="short">
            Cortas {"(<"}30 min{")"}
          </option>
          <option value="medium">
            Medianas {"("}30-60 min{")"}
          </option>
          <option value="long">
            Largas {"(>"}60 min{")"}
          </option>
        </select>
      </div>

      <h2>Tareas ({filteredTasks.length})</h2>

      <ul className="taskList">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <li key={index} className="taskCard">
              <span className="taskName">{task.nombre} </span>
              <span className="taskDuration">{task.time} minutos</span>
            </li>
          ))
        ) : (
          <p className="taskCard empty-message">No hay tareas aún</p>
        )}
      </ul>

      <h3 className="totalDisplay">
        Total de tiempo: {calcularTiempoTotal} minutos
      </h3>
    </section>
  );
}

export default Form;
