{
    const tasks = [
    ];
    const clearField = () => {
        document.querySelector(".js-clearField").value = "";
    }
    const focus = () => {
        document.querySelector(".js-newTask").focus();
    }
    





    

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        focus();
        clearField();

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

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
    }

    const render = () => {
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

        bindEvents();
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











