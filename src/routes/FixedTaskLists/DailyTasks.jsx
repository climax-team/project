import React, {useEffect, useState} from "react";

import {v4 as uuid} from 'uuid';
import {collection, getDocs, Timestamp} from "firebase/firestore";

import {ReactComponent as Plus} from '../../assets/plus.svg'
import {Form, useLoaderData} from "react-router-dom";
import {auth, FirestoreDB} from "../../../firebase-config.js";
import {createTask, getTaskList, getUserInfo} from "../../taskListControler.js";
import {TaskRender} from "../../components/TaskRender.jsx";
import {ChackCircle} from "../../components/ChackCircle.jsx";
import {TaskEditor} from "../../components/TaskEditor.jsx";

export async function action({params}) {
    const taskList = await getTaskList(params.taskListId);

    return {taskList};
}

export async function loader() {
    const taskListId = 'dailyTasks';

    const taskRef = collection(FirestoreDB, auth.currentUser.uid);
    const Snapshot = await getDocs(taskRef);

    const allTaskArray = [];
    Snapshot.forEach((doc) => {
        allTaskArray.push(...doc.data().tasks);
    });

    console.log(allTaskArray);

    const taskList = allTaskArray.filter(task => task.isDaily === true);

    console.log(taskList);
    return {taskList, taskListId};
}

export default function DailyTasks() {
    const {taskList, taskListId} = useLoaderData();

    const [isTaskAddInputFocus, setIsTaskAddInputFocus] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState(taskList);
    const [currentSelectedTask, setCurrentSelectedTask] = useState(null);
    const [isEditorDisplayed, setIsEditorDisplayed] = useState(false);

    useEffect(() => {
        setCurrentSelectedTask(null);
        setIsEditorDisplayed(false);
    }, [sessionStorage.getItem('currentSelectedTaskList')]);

    useEffect(() => {
        setTasks(taskList);
    }, [taskList]);

    const handleSubmit = async () => {
        const user = await getUserInfo();
        const userName = auth.currentUser.displayName !== null ?
            auth.currentUser.displayName : user.userName;

        //making task
        const taskObj = {
            createdBy: userName,
            taskId: uuid(),
            taskTitle: inputValue,
            assignment: [],
            RepeatCycle: null,
            isImportant: false,
            isShared: false,
            isDaily: true,
            isCompleted: false,
            lowRankTasks: [],
            memo: "",
            pushNotificationDateTime: null,
            taskDeadLine: null,
            createdAt: Timestamp.fromDate(new Date()),
        }
        await createTask(taskObj, taskListId);

        setTasks(await getTaskList(taskListId));
        setInputValue("");
    }

    return (
        <div id='task_content-container' className='flex w-full h-full'>
            <div id='content-area' className='mx-14 h-full w-full flex flex-col'>
                <div id='top_content-area' className='flex w-full mt-8'>
                    <div id='task_list-title' className='w-full min-w-200 flex'>
                        <h1 className='text-white text-5xl'>
                            daily Tasks
                        </h1>
                    </div>
                </div>
                <div id='bottum_content-area' className='h-full overflow-auto'>
                    <div id='tasks' className='h-5/6 mt-10 overflow-auto pb-1 rounded-md'>
                        <TaskRender
                            userTasks={tasks}
                            setUserTasks={setTasks}
                            setIsEditorDisplayed={setIsEditorDisplayed}
                            currentSelectedTask={currentSelectedTask}
                            setCurrentSelectedTask={setCurrentSelectedTask}
                        />
                    </div>
                    <div id='task_adder'
                         className='
                          bg-light_bg_color
                          rounded-md
                          h-14
                          flex
                          items-center'
                    >
                        {
                            isTaskAddInputFocus ?
                                <div className='mr-3 ml-5'>
                                    <ChackCircle size='24px' borderWidth='2.5px'/>
                                </div>
                                :
                                <Plus name='icon' width='30' heigth='30' className='mx-3'/>
                        }
                        <Form
                            onSubmit={(e) => {
                                inputValue === "" ? e.preventDefault() : void handleSubmit();
                            }}
                            className='w-full'>
                            <input type='text'
                                   className='
                                        h-12 w-full
                                        bg-light_bg_color
                                        placeholder-transparent
                                        text-white
                                        border-0
                                        outline-none
                                        '
                                   value={inputValue}
                                   onChange={(e) => setInputValue(e.target.value)}
                                   onFocus={() => setIsTaskAddInputFocus(!isTaskAddInputFocus)}
                                   onBlur={() => setIsTaskAddInputFocus(!isTaskAddInputFocus)}
                                   placeholder='add task'/>
                        </Form>
                    </div>
                </div>
            </div>
            {isEditorDisplayed === true && <TaskEditor
                setTasks={setTasks}
                setIsEditorDisplayed={setIsEditorDisplayed}
                setCurrentSelectedTask={setCurrentSelectedTask}
                currentSelectedTask={currentSelectedTask}
            />}
        </div>
    )
}