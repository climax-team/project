import localforage from "localforage";
import {FirestoreDB} from "./firebase-config.js";
import {doc, getDoc, Timestamp, setDoc} from "firebase/firestore";


export async function createTaskList() {
    let id = Math.random().toString(36).substring(2, 9);
    const addedTaskList = {
        taskList : {
            id : id,
            createdAt: Date.now(),
            taskListTitle: "no name List",
            task: {
                taskTitle : 'title not found',
                assignment : [],
                RepeatCycle : null,
                isImportant : false,
                isLowRankListExist : false,
                isRepeat : false,
                lowRankTasks : [],
                memo : "",
                pushNotificationDateTime : Timestamp.fromDate(new Date()),
                taskDeadLine : Timestamp.fromDate(new Date())
            },
        }
    };

    const uid = sessionStorage.getItem("userUid");
    const userTaskListsRef =
        doc(FirestoreDB, 'userTaskLists', uid);
    await setDoc(userTaskListsRef, addedTaskList, {marge: true});

    let userTaskLists = await getUserAddedTaskLists();
     //await set(userTaskLists);
    return userTaskLists;
}

export async function getUserAddedTaskLists(query) {
    const uid = sessionStorage.getItem('userUid');
    const TaskListsDocRef = doc(FirestoreDB, "userTaskLists", uid);
    const TaskListDocSnap = await getDoc(TaskListsDocRef);

    return Object.values(TaskListDocSnap.data());
}

function set(userTaskLists) {
    return localforage.setItem("userTaskLists", userTaskLists);
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
