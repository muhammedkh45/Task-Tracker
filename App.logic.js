import fs from 'fs';
import path from 'path';
const dataPath = path.resolve('appData.json');

const readTasks = () => {
    try {
        if (!fs.existsSync(dataPath)) {
            return []; 
        }
        const data = fs.readFileSync(dataPath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading tasks file:", error);
        return []; 
    }
};

const writeTasks = (tasks) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing tasks file:", error);
    }
};

export const addTask = (taskContent) => {
    try {
        const tasks = readTasks();
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.ID)) + 1 : 1;
        const timestamp = new Date();
        const newTask = { task: taskContent, ID: newId, status: "todo", createdAt: timestamp, updatedAt: timestamp };
        tasks.push(newTask);
        writeTasks(tasks);
        console.log(`Task added successfully (ID: ${newId})`);
    } catch (error) {
        console.log("Error adding task:", error);
    }
};

export const updateTask = (id, newTaskContent) => {
    try {
        const tasks = readTasks();
        const taskIndex = tasks.findIndex(element => element.ID === id);
        if (taskIndex === -1) {
            return console.log(`Cannot update as no task with ID ${id} exists.`);
        }
        tasks[taskIndex].task = newTaskContent;
        tasks[taskIndex].updatedAt = new Date()
        writeTasks(tasks);
        console.log(`Task updated successfully (ID: ${id})`);
    } catch (error) {
        console.log("Error updating task:", error);
    }
};

export const deleteTask = (id) => {
    try {
        const tasks = readTasks();
        const updatedTasks = tasks.filter(element => element.ID !== id);
        if (tasks.length === updatedTasks.length) {
            return console.log(`Cannot delete as no task with ID ${id} exists.`);
        }
        writeTasks(updatedTasks);
        console.log(`Task deleted successfully (ID: ${id})`);
    } catch (error) {
        console.log("Error deleting task:", error);
    }
};

export const markTask = (id,markOption)=>{
    const validStatuses = ['todo','in-progress','done'];
    if(!validStatuses.includes(markOption)){
        return console.log(`Invalid status: "${markOption}".`);
        
    }
    try {
        const tasks = readTasks();
        const taskIndex = tasks.findIndex(element=>element.ID === id)
        if(taskIndex===-1){
            return console.log(`Cannot mark as no task with ID ${id} exists.`);
        }
        tasks[taskIndex].status = markOption;
        tasks[taskIndex].updatedAt = new Date();
        writeTasks(tasks);
        console.log(`Task marked successfully (ID: ${id})`);
    } catch (error) {
        console.log("Error marking task:", error);
    }
}
export const listAllTasks = ()=>{
    try {
        console.log(readTasks());
    } catch (error) {
        console.log("Error listing tasks:", error);
    }
}

export const listTasksByStatus = (status)=>{
    try {
        const tasks = readTasks();
        const filteredTasks = tasks.filter(element => element.status == status);
        if(filteredTasks.length === 0){
            return console.log(`No tasks found with status: "${status}"`);
        }
        console.log(filteredTasks)
    } catch (error) {
        console.log("Error listing tasks by status:", error);
    }
}
