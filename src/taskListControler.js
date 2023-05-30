import {FirestoreDB, auth} from "./firebase-config.js";
import {collection, doc, getDocs, Timestamp, updateDoc} from "firebase/firestore";


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

    const userTaskListsRef =
        doc(FirestoreDB, 'userTaskLists', auth.currentUser.uid);

    await updateDoc(userTaskListsRef, addedTaskList);

    return await getTaskLists();
}



export async function getTaskLists() {

    let userTaskLists = [];

    await getDocs(collection(FirestoreDB, auth.currentUser.uid)).then((appData) => {
        appData.forEach((doc) => {
            let documentData = doc.data();
            console.log(doc.id);
            userTaskLists.unshift(
                {
                    id: doc.id,
                    taskListTitle: documentData.taskList.taskListTitle
                }
            );
        });
    });

    console.log(userTaskLists);


    return userTaskLists;
}