import localforage from "localforage";
import {FirestoreDB} from "./firebase-config.js";
import {doc, getDoc, Timestamp, setDoc, updateDoc} from "firebase/firestore";


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
    await updateDoc(userTaskListsRef, addedTaskList);

    let userTaskLists = await getUserAddedTaskLists();
     //await set(userTaskLists);
    return userTaskLists;
}


