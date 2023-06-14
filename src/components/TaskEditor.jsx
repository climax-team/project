import React, {useEffect, useState} from "react";
import {getTask} from "../taskListControler.js";
import {ChackCircle} from "./ChackCircle.jsx";

import {ReactComponent as XIcon} from "../assets/x-icon.svg";
import {ReactComponent as Star} from "../assets/star-empty.svg";
import {ReactComponent as SunStroke} from "../assets/sun-stroke.svg";
import {ReactComponent as Repeat} from "../assets/repeat.svg";
import {ReactComponent as TrashCan} from "../assets/trash_can.svg";
import {ReactComponent as Note} from "../assets/note.svg";


export function TaskEditor({setIsEditorDisplayed, setCurrentSelectedTask, currentSelectedTask}) {

    const [currentTaskInfo, setCurrentTaskInfo] = useState({});
    const handleXClick = () => {
        setCurrentSelectedTask(null);
        setIsEditorDisplayed(false);
    }

    useEffect(() => {
        async function getTaskInfo() {
            setCurrentTaskInfo(await getTask(currentSelectedTask));
        }

        void getTaskInfo();
    }, [currentSelectedTask]);



    return (
        <div className='bg-light_bg_color w-full max-w-sm h-full min-w-360 flex flex-col'>
            <div id='top' className='flex items-center justify-end my-4 mx-6'>
                <div onClick={handleXClick}>
                    <XIcon/>
                </div>
            </div>
            <div id='task-editor' className='px-3 h-full'>
                <div id='taskSperater' className='rounded-md bg-deep_bg_color'>
                    <div id='task_titele' className='flex items-center'>
                        <div className='m-3.5'>
                            <ChackCircle size='24px' borderWidth='2.5px'/>
                        </div>
                        <span className='text-white text-xl w-full'>
                            {currentTaskInfo.taskTitle}
                        </span>
                        <div className='w-3.5 h-3.5 flex items-center justify-center mx-3'>
                            <Star/>
                        </div>
                    </div>
                </div>

                <div id='add_to_detail-btn' className='bg-deep_bg_color flex items-center my-2 rounded-md' >
                    <div className='m-3.5 flex items-center justify-center'>
                        <SunStroke/>
                    </div>
                    <span className='text-white'>add my daily task list</span>
                </div>

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
                    <textarea name="task-memo"
                              rows="3"
                              placeholder='add memo'
                              className='
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
                    <span className='text-white text-lg'>added by user_1234 </span>
                </div>
                <div className='mx-2'>
                    <TrashCan fill='#ffffff'/>
                </div>
            </div>
        </div>
    )
}