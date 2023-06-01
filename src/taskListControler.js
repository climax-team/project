import {FirestoreDB, auth} from "./firebase-config.js";
import {
    collection,
    doc,
    getDocs,
    Timestamp,
    setDoc,
    deleteDoc,
    getDoc
} from "firebase/firestore";

import moment from "moment";
import sortBy from "sort-by";

export async function createTaskList() {
    let id = Math.random().toString(36).substring(2, 9);
    const now = moment();

    const addedTaskList = {
        taskList : {
            id : id,
            createdAt: Date.now(),
            createdDate: now.format(),
            taskListTitle: "no name List",
            tasks: [
            {
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
            }

            ],
        }
    };

    const userTaskListsRef = doc(FirestoreDB, auth.currentUser.uid, id);
    await setDoc(userTaskListsRef, addedTaskList);

    return await getTaskLists();
}


export async function getTaskList(taskListId){
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const taskList = await getDoc(taskListRef);

    console.log(taskList.data().taskList);

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


export async function deleteTaskList(id) {
    await deleteDoc(doc(FirestoreDB, auth.currentUser.uid, id));
}