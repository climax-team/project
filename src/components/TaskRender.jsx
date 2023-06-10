import {ReactComponent as EmptyStar} from "../assets/star-empty.svg"
import { v4 as uuid } from 'uuid';

export function TaskRender(userTasks) {
        const taskObj = userTasks.userTasks.tasks;

    return (
        <>
            {!taskObj.isEmpty ? (
                <ul className=''>
                    {
                        taskObj.map((task) =>
                            <li key={uuid()} className='text-white h-14 rounded-md bg-light_bg_color flex justify-between my-2'>
                                <div id='cheacker-radio' className='flex items-center justify-center'>
                                    <div className='
                                      w-5 h-5
                                      rounded-full
                                      ml-4 mr-3
                                      border-3
                                      border-solid
                                      border-form_gray_color'
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