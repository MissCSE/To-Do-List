//IIFE (Immediately Invoke Function Expression)
(function () {
  let tasks = [];
  const tasksList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const tasksCounter = document.getElementById("tasks-counter");

//   async function fetchToDos() {
//     //GET Request
//     //If return a promise then you can do .then() on it.
//     //   fetch("https://jsonplaceholder.typicode.com/todos")
//     //     .then(function (response) {
//     //       console.log(response);
//     //       return response.json();
//     //     })
//     //     .then(function (data) {
//     //       tasks = data.slice(0, 10);
//     //       renderList();
//     //       // console.log(data);
//     //     })
//     //     .catch(function (error) {
//     //       console.log("error", error);
//     //     });
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/todos"
//       );
//       const data = await response.json();
//       tasks = data.slice(0, 10);
//       renderList();
//     } catch {
//       console.log(error);
//     }
//   }

  function addTaskToDOM(task) {
    // It will create a li tag
    const li = document.createElement("li");
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${
      task.completed ? "checked" : ""
    } class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <i id="favicon" class="fa-solid fa-trash" data-id="${task.id}" ></i>
    
  `;

    tasksList.append(li);
  }

  function renderList() {
    tasksList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }
  }

  function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });
    if (task.length > 0) {
      const currentTask = task[0];
      currentTask.completed = !currentTask.completed;
      renderList();
      showNotification("Task toggled successfully");
      return;
    }
    showNotification("Could not toggle the task");
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== Number(taskId);
    });
    tasks = newTasks;
    renderList();
    showNotification("Task Deleted successfully");
  }

  // pass object task in addTask(task)
  function addTask(task) {
    //   fetch("https://jsonplaceholder.typicode.com/todos", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then(function (response) {
    //       console.log(response);
    //       return response.json();
    //     })
    //     .then(function (data) {
    //       console.log(data);
    //       tasks.push(task);
    //       renderList();
    //       showNotification("Task Added Successfully");
    //     })
    //     .catch(function (error) {
    //       console.log("error", error);
    //     });

    // add the task to tasks array
    if (task) {
      tasks.push(task);
      renderList();
      showNotification("Task Added Successfully");
    } else {
      showNotification("Task cannot be added");
    }
  }

  function showNotification(text) {
    alert(text);
  }

  function handleInputKeypress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;
      console.log("text", text);

      if (!text) {
        showNotification("Task Text Cannot be Empty");
        return;
      }
      //creating object
      const task = {
        title: text,
        id: Date.now(),
        completed: false,
      };
      //Making input box empty again
      e.target.value = "";
      addTask(task);
    }
  }
  function handleClickListener(e) {
    const target = e.target;
    console.log(target);
    if (target.className === "custom-checkbox") {
      // grab the id from the dataset
      const taskId = target.id;
      toggleTask(taskId);
      return;
    } else if (target.id === "favicon") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
    }
  }

  function initializeApp() {
    // fetchToDos();
    addTaskInput.addEventListener("keyup", handleInputKeypress);
    document.addEventListener("click", handleClickListener);
  }

  initializeApp();
})();
