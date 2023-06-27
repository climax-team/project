import {Form, useLoaderData} from "react-router-dom";
import {createTask, getTaskList, getUserInfo} from "../taskListControler.js";

import {TaskRender} from "../components/TaskRender.jsx";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {TaskEditor} from "../components/TaskEditor.jsx";
import {ChackCircle} from "../components/ChackCircle.jsx";

import {v4 as uuid} from 'uuid';
import {Timestamp} from "firebase/firestore";

import {ReactComponent as Plus} from '../assets/plus.svg'
import {TaskListPageBtn} from "../components/TaskListPageBtn.jsx";
import {auth} from "../../firebase-config.js";

export async function action({params}) {
    const taskList = await getTaskList(params.taskListId);

    return {taskList}
}

export async function loader({params}) {
    const taskListId = params.taskListId;
    const taskList = await getTaskList(params.taskListId);

    return {taskList, taskListId};
}

export default function Task() {
    const {taskList, taskListId} = useLoaderData();

    const [isTaskAddInputFocus, setIsTaskAddInputFocus] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState(taskList);
    const [currentSelectedTask, setCurrentSelectedTask] = useState(null);
    const [isEditorDisplayed, setIsEditorDisplayed] = useState(false);
    const [isTaskListTitleChanging, setIsTaskListTitleChanging] = useState(false);
    const [titleChangingValue, setTitleChangingValue] = useState('');

    useEffect(() => {
        setCurrentSelectedTask(null);
        setIsEditorDisplayed(false)
    }, [sessionStorage.getItem('currentSelectedTaskList')]);

    useEffect(() => {
        const getTask = async () => setTasks(await getTaskList(taskListId));
        void getTask();
    }, [taskList]);


    const handleSubmit = async () => {
        const user = await getUserInfo();
        const userName = auth.currentUser.displayName !== null ?
            auth.currentUser.displayName : user.userName;

        //making task
        const taskObj = {
            createdBy: userName,
            taskId: uuid(),
            taskListId: taskListId,
            taskTitle: inputValue,
            assignment: [],
            RepeatCycle: null,
            isImportant: false,
            isShared: false,
            isDaily: false,
            isCompleted: false,
            lowRankTasks: [],
            memo: "",
            pushNotificationDateTime: Timestamp.fromDate(new Date()),
            taskDeadLine: Timestamp.fromDate(new Date()),
            createdAt: Timestamp.fromDate(new Date()),
        }
        await createTask(taskObj, taskListId);

        setTasks(await getTaskList(taskListId));
        setInputValue("");
    }


    //todo title change function
    const handleTitleChangeValueSave = (e) => {
        e.preventDefault();

        setIsTaskListTitleChanging(false);
    }

    return (
        <div id='task_content-container' className='flex w-full h-full'>
            <div id='content-area' className='mx-14 h-full w-full flex flex-col'>
                <div id='top_content-area' className='flex w-full mt-8'>
                    <div id='task_list-title' className='w-full min-w-200 flex'>
                        {
                            isTaskListTitleChanging ?
                                    <textarea
                                        onBlur={handleTitleChangeValueSave}
                                        onChange={(e) => setTitleChangingValue(e.target.value)}
                                        value={titleChangingValue}
                                        className='text-5xl text-white bg-light_bg_color resize-none h-14'
                                        wrap='off'
                                    >
                                        {tasks.taskListTitle}
                                    </textarea>
                                :
                                <h1 className='text-white text-5xl'>
                                    {tasks.taskListTitle}
                                </h1>
                        }
                    </div>
                    <TaskListPageBtn setIsTaskListTitleChanging={setIsTaskListTitleChanging}/>
                </div>
                <div id='bottum_content-area' className='h-full overflow-auto'>
                    <div id='tasks' className='h-5/6 mt-10 overflow-auto pb-1 rounded-md'>
                        <TaskRender
                            userTasks={tasks.tasks}
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