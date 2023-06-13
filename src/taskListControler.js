import {FirestoreDB, auth} from "./firebase-config.js";
import {
    collection,
    doc,
    getDocs,
    Timestamp,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

import moment from "moment";
import sortBy from "sort-by";
import {v4 as uuid} from 'uuid';

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
            tasks: [
                {
                    taskId: uuid(),
                    taskTitle: 'title not found',
                    assignment: [],
                    RepeatCycle: null,
                    isImportant: false,
                    isLowRankListExist: false,
                    isRepeat: false,
                    lowRankTasks: [],
                    memo: "",
                    pushNotificationDateTime: Timestamp.fromDate(new Date()),
                    taskDeadLine: Timestamp.fromDate(new Date()),
                    createdAt : Timestamp.fromDate(new Date()),
                }

            ],
        }
    };

    const userTaskListsRef = doc(FirestoreDB, auth.currentUser.uid, id);
    await setDoc(userTaskListsRef, addedTaskList);

    return await getTaskLists();
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

export async function getTask(taskId) {
    const userRef = doc(FirestoreDB, auth.currentUser.uid, sessionStorage.getItem('currentSelectedTaskList'));

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const array = docSnap.data().taskList.tasks;

        const index = array.findIndex(e => e.taskId === taskId);
        if (index !== -1) {
            console.log(array[index]);
        }
        return array[index];
    } else {
        return console.error("No such document!");
    }
}



export async function deleteTaskList(id) {
    await deleteDoc(doc(FirestoreDB, auth.currentUser.uid, id));
}