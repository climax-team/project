import {useLoaderData} from "react-router-dom";
import {getTaskList} from "../taskListControler.js";
import {ReactComponent as MoreVert} from '../assets/more_vert.svg'
import {ReactComponent as PeopleOutline} from '../assets/people_outline.svg'
import {ReactComponent as Plus} from '../assets/plus.svg'


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
//	const { taskList } = useLoaderData();


    return (
            <div id='task_content-container' className='mx-14 mt-8'>
                <div id='top_content-area' className='flex w-full '>
                    <div id='task_list-title' className='w-full'>
                        <h1 className='text-white text-5xl'>
                            taskListTitle</h1>
                    </div>
                    <div id='task_list-button' className='flex w-full justify-end items-center'>
                        <div id='share-btn' className='w-9 h-9 bg-light_bg_color flex justify-center items-center rounded-lg m-1'>
                            <PeopleOutline />
                        </div>
                        <div id='more_option-btn' className='w-9 h-9 bg-light_bg_color flex justify-center items-center rounded-lg m-1'>
                            <MoreVert />
                        </div>
                    </div>
                </div>

                <div id='bottum_content-area'>
                    <div id='tasks'></div>
                    <div id='task_adder' className='bg-light_bg_color rounded-md h-14 flex items-center'>
                        <Plus />
                        <input className='h-2/3' type='text'/>
                    </div>
                </div>

            </div>
    )
}