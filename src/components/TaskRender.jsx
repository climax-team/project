import {useId, useState} from "react";
import {ReactComponent as EmptyStar} from "../assets/star-empty.svg"
import { v4 as uuidv4 } from 'uuid';

export function TaskRender(userTasks) {

    const taskObj = userTasks.userTasks.tasks;
    const [tasks, setTasks] = useState(taskObj);


    console.log('test');
    console.log(userTasks);
    console.log(tasks);

    const id = useId();
    return (
        <>
            {!tasks.isEmpty ? (
                <ul className=''>
                    {
                        tasks.map((task) =>
                            <li key={uuidv4()} className='text-white h-14 rounded-md bg-light_bg_color flex justify-between'>
                                <div id='cheacker-radio' className='flex items-center justify-center p-3'>
                                    <div className='
                                      w-5
                                      h-5
                                      rounded-full
                                      mx-auto
                                      border-2
                                      border-solid
                                      border-bg-form_gray_color'
                                    >
                                    </div>
                                </div>
                                <div id='task_info-text' className='w-full flex items-center'>
                                    <span>
                                        {task.taskTitle}
                                    </span>
                                </div>
                                <div id='important_star-toggleBtn' className='flex items-center justify-center p-3'>
                                    <EmptyStar name='icon'/>
                                </div>
                            </li>
                        )
                    }
                </ul>
            ) : (
                <h1>the list is empty plz add your own task</h1>
            )}
        </>
    )
}