{
    let tasks = [];
    let hideDoneTask = false;
    const clearField = () => {
        document.querySelector(".js-newTask").value = "";
        document.querySelector(".js-newTask").focus();
    };


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        clearField();
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        clearField();
        render();
    };

    let toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += ` 
            <li class="sectionTaskList__newTask"; 
            >
        <button class="section__buttonDone js-done">${task.done ? "✓" : ""}</button>
        <span class="js-taskDone${task.done ? " section__buttonDone--checked " : ""}">${task.content}</span>
        <button class="section__buttonDelete js-remove">🗑</button>
        </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const taskHideDoneButton = document.querySelector(".js-taskHideDoneButton");
        const taskCheckedAllButton = document.querySelector(".js-taskCheckedAllButton");
        if (tasks.length == 0) {
            taskHideDoneButton.classList.add("section__taskListHeaderButton--hide");
            taskCheckedAllButton.classList.add("section__taskListHeaderButton--hide");
        } else {
            taskHideDoneButton.classList.remove("section__taskListHeaderButton--hide");
            taskCheckedAllButton.classList.remove("section__taskListHeaderButton--hide");
        }
    };

    const bindButtonsEvents = () => {

    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}











