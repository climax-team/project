import localforage from "localforage";
import sortBy from "sort-by";


export async function createTaskList() {
    let id = Math.random().toString(36).substring(2, 9);
    let taskList = { id, createdAt: Date.now() };
    let taskLists = await getTaskLists();



    taskLists.unshift(taskList);
    await set(taskLists);
    return taskList;
}

export async function getTaskLists(query) {
    let taskLists = await localforage.getItem("taskLists");
    if (!taskLists) taskLists = [];
    return taskLists.sort(sortBy("last", "createdAt"));
}

function set(taskLists) {
    return localforage.setItem("taskLists", taskLists);
}

export async function deleteContact(id) {
    let taskLists = await localforage.getItem("taskLists");
    let index = taskLists.findIndex(taskList => taskList.id === id);
    if (index > -1) {
        taskLists.splice(index, 1);
        await set(taskLists);
        return true;
    }
    return false;
}
