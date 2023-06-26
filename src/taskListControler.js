import {FirestoreDB, auth} from "../firebase-config.js";
import {
    collection,
    doc,
    getDocs,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc,
    Timestamp,
    query,
    where,
    arrayUnion,
    arrayRemove,
    deleteField
} from "firebase/firestore";
import sortBy from "sort-by";

export async function getUserInfo() {
    const userInfoDocRef = doc(FirestoreDB, "user", auth.currentUser.uid);
    const userInfoDocSnap = await getDoc(userInfoDocRef);

    return userInfoDocSnap.data().userData
}


export async function createTaskList() {
    let id = Math.random().toString(36).substring(2, 9);

    const addedTaskList = {
        id: id,
        createdAt: Timestamp.fromDate(new Date()),
        taskListTitle: "no name List",
        tasks: [],
    };

    const userTaskListsRef = doc(FirestoreDB, auth.currentUser.uid, id);
    await setDoc(userTaskListsRef, addedTaskList);

    return await getTaskLists();
}

export async function getTask(taskId, taskListId) {
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const docSnap = await getDoc(taskListRef);

    const taskArray = docSnap.data().tasks;

    const index = taskArray.findIndex(task => task.taskId === taskId);

    return taskArray[index];

}

export async function getTasks(keyWord) {
    const taskRef = collection(FirestoreDB, auth.currentUser.uid);
    const q = query(taskRef, where("tasks", "array-contains", keyWord));
    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}


export async function createTask(taskObj, taskListId) {
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const currentObj = await getDoc(taskListRef);
    let currentArray = currentObj.data().tasks;

    currentArray.unshift(taskObj);

    const data = {
        'tasks': currentArray,
    }

    await updateDoc(taskListRef, data);
}

export async function getTaskList(taskListId) {
    const taskListRef =
        doc(FirestoreDB, auth.currentUser.uid, taskListId);
    const taskList =
        await getDoc(taskListRef);

    return taskList.data();
}

export async function getTaskLists() {
    let userTaskLists = [];

    await getDocs(collection(FirestoreDB, auth.currentUser.uid)).then((appData) => {
        appData.forEach((doc) => {
            let documentData = doc.data();
            userTaskLists.unshift(
                {
                    id: doc.id,
                    taskListTitle: documentData.taskListTitle,
                    createdAt: documentData.createdAt
                }
            );
        });
    });
    return userTaskLists.sort(sortBy("last", "createdAt"));
}

export async function deleteTaskList(taskListId) {
    await deleteDoc(doc(FirestoreDB, auth.currentUser.uid, taskListId));
}

export async function taskEditFunctionConnector(currentTaskId, workToApply, saveValue) {
    const taskListRef = doc(FirestoreDB, auth.currentUser.uid, sessionStorage.getItem('currentSelectedTaskList'));
    const docSnap = await getDoc(taskListRef);

    const taskListId = docSnap.data().id;
    const taskList = docSnap.data().tasks;
    const index = taskList.findIndex(obj => obj.taskId === currentTaskId);

    switch (workToApply) {
        case 'delete':
            await deleteTask(index, taskListRef, taskList);
            console.log('delete');
            break;
        case 'complete':
            await changeTaskToCompleteOrIncomplete(index, taskListRef, taskList);
            console.log('complete');
            break;
        case 'addToDailyTask':
            await changeTaskToDailyTaskOrOrdinary(index, taskListRef, taskList, taskListId);
            console.log('add to daily task');
            break;
        case 'saveMemo':
            await saveTaskMemo(saveValue, index, taskListRef, taskList);
            console.log('memo saved');
            break;
        default :
            throw new Error("parameter not found");
    }
}

async function saveTaskMemo(memoToSave, index, taskListRef, taskList) {
    taskList[index].memo = memoToSave;
    await updateDoc(taskListRef, {'tasks': taskList});
}

async function changeTaskToCompleteOrIncomplete(index, taskListRef, taskList) {
    taskList[index].isCompleted = !taskList[index].isCompleted;
    await updateDoc(taskListRef, {'tasks': taskList});
}

async function changeTaskToDailyTaskOrOrdinary(index, taskListRef, taskList) {
    taskList[index].isDaily = !taskList[index].isDaily;
    await updateDoc(taskListRef, {'tasks': taskList});

    console.log("a", (await getDoc(taskListRef)).data().taskList);
}

async function deleteTask(index, taskListRef, taskList) {
    taskList.splice(index, 1);
    await updateDoc(taskListRef, {'tasks': taskList});
}

