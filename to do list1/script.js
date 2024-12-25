document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Create task element
    const createTaskElement = (taskText, completed = false) => {
        const li = document.createElement("li");
        li.textContent = taskText;

        if (completed) li.classList.add("completed");

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // Add task
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTasks();
        taskInput.value = "";
    });

    // Initialize
    loadTasks();
});

