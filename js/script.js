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
            { content: newTaskContent, done: false, },
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
    const checkAllTaskDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
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
            <li class="sectionTaskList__newTask" ${task.done && hideDoneTask ? " style=\"display: none; \" " : ""}"; 
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
    
    const jsRenderButtons = document.querySelector(".js-buttons");
    
    jsRenderButtons.innerHTML = `
    <h2 class="section__headerWeight">Lista zadań</h2>
    <button class="section__taskListHeaderButton js-taskHideDoneButton ${tasks.length == 0 ? " section__taskListHeaderButton--hide " : ""}">${hideDoneTask ? " Pokaż " : " Ukryj "}ukończone </button>
    <button class="section__taskListHeaderButton js-taskCheckedAllButton ${tasks.length == 0 ? " section__taskListHeaderButton--hide " : ""}" ${tasks.every(({ done }) => done) ? " disabled " : ""} >Ukończ wszystkie</button>
    `;
};

const bindButtonsEvents = () => {

    const taskCheckedAllButton = document.querySelectorAll(".js-taskCheckedAllButton");
    const taskHideDoneButton = document.querySelectorAll(".js-taskHideDoneButton");

    taskCheckedAllButton.forEach((taskCheckedAllButton, index) => {
        taskCheckedAllButton.addEventListener("click", () => {
            checkAllTaskDone();
        });
    });

    taskHideDoneButton.forEach((taskHideDoneButton, index) => {
        taskHideDoneButton.addEventListener("click", () => {
            toggleHideDoneTasks();
        });
    });
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