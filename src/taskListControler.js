import {FirestoreDB, auth} from "../firebase-config.js";
import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

import moment from "moment";
import sortBy from "sort-by";

export async function getUserInfo() {
    const userInfoDocRef = doc(FirestoreDB, "user", auth.currentUser.uid);
    const userInfoDocSnap = await getDoc(userInfoDocRef);


    return userInfoDocSnap.data().userData
}

export async function createTaskList() {
    let id = Math.random().toString(36).substring(2, 9);
    const now = moment();

    const addedTaskList = {
        taskList: {
            id: id,
            createdAt: Date.now(),
            createdDate: now.format(),
            taskListTitle: "no name List",
            tasks: [],
        }
    };

    const userTaskListsRef = doc(FirestoreDB, auth.currentUser.uid, id);
    await setDoc(userTaskListsRef, addedTaskList);

    return await getTaskLists();
}

export async function getTask(taskId, taskListId) {
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const docSnap = await getDoc(taskListRef);

    const taskArray = docSnap.data().taskList.tasks;

    const index = taskArray.findIndex(task => task.taskId === taskId);

    console.log(taskArray[index]);
    return taskArray[index];

}

export async function createTask(taskObj, taskListId) {
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const currentObj = await getDoc(taskListRef);
    let currentArray = currentObj.data().taskList.tasks;

    currentArray.unshift(taskObj);

    const data = {
        'taskList.tasks': currentArray,
    }

    await updateDoc(taskListRef, data);
}

export async function getTaskList(taskListId) {
    const taskListRef =
        doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const taskList =
        await getDoc(taskListRef);

    return taskList.data().taskList;
}

export async function getTaskLists() {
    let userTaskLists = [];

    await getDocs(collection(FirestoreDB, auth.currentUser.uid)).then((appData) => {
        appData.forEach((doc) => {
            let documentData = doc.data();
            userTaskLists.unshift(
                {
                    id: doc.id,
                    taskListTitle: documentData.taskList.taskListTitle,
                    createdAt: documentData.taskList.createdAt
                }
            );
        });
    });
    return userTaskLists.sort(sortBy("last", "createdAt"));
}

export async function deleteTaskList(taskListId) {
    await deleteDoc(doc(FirestoreDB, auth.currentUser.uid, taskListId));
}


export async function taskEditFunctionConnector(currentTaskId, workToApply) {
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, sessionStorage.getItem('currentSelectedTaskList'));
    const docSnap = await getDoc(taskListRef);

    const taskList = docSnap.data().taskList.tasks;
    const index = taskList.findIndex(obj => obj.taskId === currentTaskId);

    switch (workToApply) {
        case 'delete':
            await deleteTask(currentTaskId, index, taskListRef, taskList);
            console.log('delete');
            break;
        case 'complete':
            await changeTaskToCompleteOrIncomplete(currentTaskId, index, taskListRef, taskList);
            console.log('complete');
            break;
        case 'addToDailyTask':
            await changeTaskToDailyTaskOrOrdinary(currentTaskId, index, taskListRef, taskList);
            console.log('addToDailyTask');
            break;

        default :
            throw new Error("parameter not found");
    }
}

async function changeTaskToCompleteOrIncomplete(currentTaskId, index, taskListRef, taskList) {
    taskList[index].isCompleted = !taskList[index].isCompleted;
    await updateDoc(taskListRef, {'taskList.tasks': taskList});
}

async function changeTaskToDailyTaskOrOrdinary(currentTaskId, index, taskListRef, taskList) {
    taskList[index].isDaily = !taskList[index].isDaily;
    await updateDoc(taskListRef, {'taskList.tasks': taskList});

    console.log("a", (await getDoc(taskListRef)).data().taskList);
}

async function deleteTask(currentTaskId, index, taskListRef, taskList) {
    taskList.splice(index, 1);
    await updateDoc(taskListRef, {'taskList.tasks': taskList});
}