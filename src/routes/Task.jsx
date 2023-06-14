import {Form, useLoaderData} from "react-router-dom";
import {createTask, getTaskList} from "../taskListControler.js";

import {TaskRender} from "../components/TaskRender.jsx";
import React, {useEffect, useState} from "react";
import {TaskEditor} from "../components/TaskEditor.jsx";
import {ChackCircle} from "../components/ChackCircle.jsx";

import {v4 as uuid} from 'uuid';
import {Timestamp} from "firebase/firestore";

import {ReactComponent as Plus} from '../assets/plus.svg'
import {TaskListPageBtn} from "../components/TaskListPageBtn.jsx";

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
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState(taskList);

    const [currentSelectedTask, setCurrentSelectedTask] = useState(null);
    const [isEditorDisplayed, setIsEditorDisplayed] = useState(false);

    useEffect(() => {
        setCurrentSelectedTask(null);
        setIsEditorDisplayed(false)
    }, [sessionStorage.getItem('currentSelectedTaskList')]);


    useEffect(() => {
        setTasks(taskList);
    }, [taskList]);


    const handleInputFocusChange = () => {
        setIsTaskAddInputFocus(!isTaskAddInputFocus);
    }

    const handleSubmit = async () => {
        const taskObj = {
            taskId: uuid(),
            taskTitle: inputValue,
            assignment: [],
            RepeatCycle: null,
            isImportant: false,
            isLowRankListExist: false,
            isRepeat: false,
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

    return (
        <div id='task_content-container' className='flex w-full h-full'>
            <div id='content-area' className='mx-14 h-full w-full flex flex-col min-w-max'>
                <div id='top_content-area' className='flex w-full mt-8'>
                    <div id='task_list-title' className='w-full min-w-200'>
                        <h1 className='text-white text-5xl'>
                            {tasks.taskListTitle}
                        </h1>
                    </div>
                    <TaskListPageBtn/>
                </div>
                <div id='bottum_content-area' className='h-full overflow-auto'>
                    <div id='tasks' className='h-5/6 mt-10 overflow-auto pb-1 rounded-md'>
                        <TaskRender
                            userTasks={tasks}
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
                                   onFocus={handleInputFocusChange}
                                   onBlur={handleInputFocusChange}
                                   placeholder='add task'/>
                        </Form>
                    </div>
                </div>
            </div>
            {isEditorDisplayed === true && <TaskEditor
                setIsEditorDisplayed={setIsEditorDisplayed}
                setCurrentSelectedTask={setCurrentSelectedTask}
                currentSelectedTask={currentSelectedTask}
            />}
        </div>
    )
}