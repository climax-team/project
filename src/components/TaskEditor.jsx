import {taskEditFunctionConnector, getTaskList, getTask} from "../taskListControler.js";

import {ReactComponent as CheckMark} from "../assets/checkmark.svg";
import {ReactComponent as XIcon} from "../assets/x-icon.svg";
import {ReactComponent as Star} from "../assets/star-empty.svg";
import {ReactComponent as SunStroke} from "../assets/sun-stroke.svg";
import {ReactComponent as Repeat} from "../assets/repeat.svg";
import {ReactComponent as TrashCan} from "../assets/trash_can.svg";
import {ReactComponent as Note} from "../assets/note.svg";
import {ReactComponent as Plus} from "../assets/plus.svg";
import {useLoaderData} from "react-router-dom";
import {ChackCircle} from "./ChackCircle.jsx";
import {useCallback, useRef, useState} from "react";
import moment from "moment";

export function TaskEditor({setTasks, setIsEditorDisplayed, setCurrentSelectedTask, currentSelectedTask}) {
    const {taskListId} = useLoaderData();

    const [isLowTaskInputFocus, setIsLowTaskInputFocus] = useState(false);
    const [LowTaskInputValue, setLowTaskInputValue] = useState('');

    const handleXClick = () => {
        setCurrentSelectedTask(null);
        setIsEditorDisplayed(false);
    }

    const handleTaskDelete = async (e) => {
        if (!confirm(`"${currentSelectedTask.taskTitle}" will be permanently deleted.`)) {
            e.preventDefault();
        } else {
            await taskEditFunctionConnector(currentSelectedTask.taskId, 'delete');
            setIsEditorDisplayed(false);
            setCurrentSelectedTask(null);
            setTasks(await getTaskList(taskListId));
        }
    }

    const handleAddDailyTaskClick = async () => {
        await taskEditFunctionConnector(currentSelectedTask.taskId, 'addToDailyTask');

        setCurrentSelectedTask(await getTask(currentSelectedTask.taskId, taskListId));
        setTasks(await getTaskList(taskListId));
    }


    const handleCheckCircleClick = async () => {
        await taskEditFunctionConnector(currentSelectedTask.taskId, 'complete');

        setCurrentSelectedTask(await getTask(currentSelectedTask.taskId, taskListId));
        setTasks(await getTaskList(taskListId));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');

    }

    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
        textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

    return (
        <div className='bg-light_bg_color w-full max-w-sm h-full min-w-360 flex flex-col'>
            <div id='top' className='flex items-center justify-end my-4 mx-6'>
                <div onClick={handleXClick}>
                    <XIcon/>
                </div>
            </div>
            <div id='task-editor' className='px-3 h-full'>
                <div id='low_level-todo' className='rounded-md bg-deep_bg_color'>
                    <div id='title-task'>
                        <div id='task-titele' className='flex items-center'>
                            <div id='check-circle' className='m-3.5' onClick={handleCheckCircleClick}>
                                {
                                    currentSelectedTask.isCompleted ?
                                        <div className='
                                              w-6 h-6
                                              rounded-full
                                              border-2
                                              border-solid
                                              border-white
                                              flex items-center justify-center
                                              '
                                        >
                                            <div>
                                                <CheckMark fill='#ffffff'/>
                                            </div>
                                        </div>
                                        :
                                        <div className='
                                              w-6 h-6
                                              rounded-full
                                              border-2
                                              border-solid
                                              border-form_gray_color
                                              hover:border-white
                                              flex items-center justify-center
                                              group/checkItem
                                              '
                                        >
                                            <div className=' group-hover/checkItem:visible invisible'>
                                                <CheckMark fill='#ffffff'/>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className='w-full flex break-all my-2'>
                            <span className='text-white text-xl'
                                  style={{textDecoration: currentSelectedTask.isCompleted && 'line-through'}}
                            >
                                {currentSelectedTask.taskTitle}
                            </span>
                            </div>
                            <div className='w-3.5 h-3.5 flex items-center justify-center mx-3'>
                                <Star/>
                            </div>
                        </div>
                    </div>

                    <div id='low_level-tasks' className='mt-2 text-white'>
                        task
                        <br/>
                        task
                        <br/>
                        task
                    </div>

                    <div id='low_level_task-input' className='flex items-center'>
                        <div className='ml-4 mr-4 mb-4 mt-2 flex'>
                            {isLowTaskInputFocus ?
                                <ChackCircle size='18px' borderWidth='2px'/>
                                :
                                <Plus width='14' height='14'/>
                            }
                        </div>
                        <form onSubmit={(e) => {
                            LowTaskInputValue === "" ? e.preventDefault() : handleSubmit(e);
                        }}
                        >
                            <input type="text"
                                   className='placeholder:text-white mb-3 text-white outline-none placeholder-transparent'
                                   placeholder='add step'
                                   value={LowTaskInputValue}
                                   onChange={(e) => setLowTaskInputValue(e.target.value)}
                                   onFocus={() => setIsLowTaskInputFocus(!isLowTaskInputFocus)}
                                   onBlur={() => setIsLowTaskInputFocus(!isLowTaskInputFocus)}
                                   style={{background: "transparent"}}
                            />
                        </form>
                    </div>
                </div>

                <button id='add_to_detail-btn' onClick={handleAddDailyTaskClick}
                        className='bg-deep_bg_color flex items-center my-2 rounded-md w-full'
                        style={{backgroundColor: currentSelectedTask.isDaily && 'rgba(148, 148, 255, 0.5)'}}>
                    <div className='m-3.5 flex items-center justify-center'>
                        <SunStroke/>
                    </div>
                    <span className='text-white'>add my daily task list</span>
                </button>

                <div id='task_detail_setting' className='bg-deep_bg_color rounded-md py-2'>
                    <div className='flex items-center '>
                        <div className='m-3.5'>
                            <Note/>
                        </div>
                        <span className='text-white'>deadline setting</span>
                    </div>

                    <div className='flex items-center '>
                        <div className='m-3.5'>
                            <Repeat/>
                        </div>
                        <span className='text-white'>repeat</span>
                    </div>
                </div>

                <div id='memo' className='bg-deep_bg_color rounded-md py-2 my-2'>
                    <textarea
                        ref={textRef}
                        name="task-memo"
                        rows="3"
                        placeholder='add memo'
                        onInput={handleResizeHeight}
                        className='
                        styles.content_text
                                    w-full
                                    px-4 py-3
                                    bg-deep_bg_color
                                    focus:outline-none
                                    text-white
                              '
                    >
                    </textarea>
                </div>
            </div>

            <div id='bottom' className='flex items-center text-white p-2 border-t-2'>
                <div className='w-full flex justify-center items-center'>
                    {
                        currentSelectedTask.isShared ?
                            <span
                                className='text-white text-lg'>added by {currentSelectedTask.createdBy} ({moment(currentSelectedTask.createdAt.toDate()).format('ddd, MMM DD YYYY')}) </span>
                            :
                            <span
                                className='text-white text-lg'>created at {moment(currentSelectedTask.createdAt.toDate()).format('ddd, MMM DD YYYY')} </span>
                    }
                </div>
                <div className='mx-2'>
                    <div className='flex' onClick={(e) => handleTaskDelete(e)}>
                        <TrashCan fill='#ffffff'/>
                    </div>
                </div>
            </div>
        </div>
    )
}