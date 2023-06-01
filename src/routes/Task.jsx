import {useLoaderData} from "react-router-dom";
import {getTaskList} from "../taskListControler.js";
import {ReactComponent as MoreVert} from '../assets/more_vert.svg'
import {ReactComponent as PeopleOutline} from '../assets/people_outline.svg'
import {ReactComponent as Plus} from '../assets/plus.svg'
import {TaskRender} from "../components/TaskRender.jsx";


export async function loader({params}) {
    const taskList = await getTaskList(params.taskListId);
    if (!taskList) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return {taskList};
}

export default function Task() {
	const { taskList } = useLoaderData();

    return (
        <div id='task_content-container' className='mx-14 h-full flex flex-col'>
            <div id='top_content-area' className='flex w-full mt-8'>
                <div id='task_list-title' className='w-full'>
                    <h1 className='text-white text-5xl'>
                        {taskList.taskListTitle}
                    </h1>
                </div>
                <div id='task_list-button' className='flex w-full justify-end items-center'>
                    <div id='share-btn'
                         className='w-9 h-9 bg-light_bg_color flex justify-center items-center rounded-lg m-1'>
                        <PeopleOutline name='icon'/>
                    </div>
                    <div id='more_option-btn'
                         className='w-9 h-9 bg-light_bg_color flex justify-center items-center rounded-lg m-1'>
                        <MoreVert name='icon'/>
                    </div>
                </div>
            </div>

            <div id='bottum_content-area' className='h-full'>
                <div id='tasks' className='h-5/6 mt-10'>
                    <TaskRender userTasks={taskList} />
                </div>
                <div id='task_adder' className='bg-light_bg_color rounded-md h-14 flex items-center '>
                    <Plus name='icon' width='30' heigth='30' className='mx-3'/>
                    <input className='h-12' type='text' />
                    <label>add task</label>
                </div>
            </div>

        </div>
    )
}