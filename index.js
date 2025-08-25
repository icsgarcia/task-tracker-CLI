const fs = require("fs").promises;
const path = require("path");

const FILE_PATH = path.join(__dirname, "tasks.json");

// HELPERS
const checkFile = async () => {
    try {
        await fs.access(FILE_PATH);
    } catch (error) {
        await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), "utf8");
    }
};

const allTasks = async () => {
    try {
        await checkFile();
        const tasks = await fs.readFile(FILE_PATH, "utf8");
        return JSON.parse(tasks);
    } catch (error) {
        console.error("Error reading tasks:", error);
        return [];
    }
};

const saveTasks = async (tasks) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf8");
};

// CRUD
const addTask = async (desc) => {
    try {
        const tasks = await allTasks();
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            description: desc,
            status: "todo",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        tasks.push(newTask);
        await saveTasks(tasks);
        console.log("Task added successfully!");
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

const updateTask = async (id, desc) => {
    try {
        const tasks = await allTasks();
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) return console.log("Task not found.");
        tasks[index].description = desc;
        tasks[index].updatedAt = new Date().toISOString();
        await saveTasks(tasks);
        console.log("Task updated successfully!");
    } catch (error) {
        console.log("Error updating task. " + error);
    }
};

const deleteTask = async (id) => {
    try {
        const tasks = await allTasks();
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) return console.log("Task not found.");

        tasks.splice(index, 1);
        await saveTasks(tasks);
        console.log("Task deleted successfully!");
    } catch (error) {
        console.log("Error deleting task. " + error);
    }
};

const markInProgress = async (id) => {
    try {
        const tasks = await allTasks();
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) return console.log("Task not found.");
        tasks[index].status = "in-progress";
        tasks[index].updatedAt = new Date().toISOString();
        await saveTasks(tasks);
        console.log("Task marked as in progress!");
    } catch (error) {
        console.log("Error marking task as in progress. " + error);
    }
};

const markDone = async (id) => {
    try {
        const tasks = await allTasks();
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) return console.log("Task not found.");
        tasks[index].status = "done";
        tasks[index].updatedAt = new Date().toISOString();
        await saveTasks(tasks);
        console.log("Task marked as done!");
    } catch (error) {
        console.log("Error marking task as in progress. " + error);
    }
};

// LISTS
const listTasks = async () => {
    const tasks = await allTasks();
    console.table(tasks, [
        "id",
        "description",
        "status",
        "createdAt",
        "updatedAt",
    ]);
};

const listTasksByStatus = async (status) => {
    const tasks = await allTasks();
    const filteredTasks = tasks.filter((task) => {
        return task.status === status;
    });
    console.table(filteredTasks, [
        "id",
        "description",
        "status",
        "createdAt",
        "updatedAt",
    ]);
};

// CLI
const args = process.argv.slice(2);
let taskId;

switch (args[0]) {
    case "add":
        const taskDescription = args.slice(1).join(" ");

        if (!taskDescription) {
            console.log("Please provide a task description.");
        } else {
            addTask(taskDescription);
        }
        break;
    case "update":
        taskId = Number(args[1]);
        const newDescription = args.slice(2).join(" ");

        if (!taskId || !newDescription) {
            console.log("Please provide a task ID and new description.");
        } else {
            updateTask(taskId, newDescription);
        }
        break;
    case "delete":
        taskId = Number(args[1]);

        if (!taskId) {
            console.log("Please provide a task ID.");
        } else {
            deleteTask(taskId);
        }
        break;
    case "mark-in-progress":
        taskId = Number(args[1]);

        if (!taskId) {
            console.log("Please provide a task ID.");
        } else {
            markInProgress(taskId);
        }
        break;
    case "mark-done":
        taskId = Number(args[1]);

        if (!taskId) {
            console.log("Please provide a task ID.");
        } else {
            markDone(taskId);
        }
        break;
    case "list":
        const status = args.splice(1).join(" ");

        switch (status) {
            case "done":
                listTasksByStatus(status);
                break;
            case "todo":
                listTasksByStatus(status);
                break;
            case "in-progress":
                listTasksByStatus(status);
                break;
            default:
                listTasks();
        }
        break;
    default:
        console.log("default");
}
