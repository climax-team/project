import {Form, useLoaderData} from "react-router-dom";
import {getTaskList} from "../taskListControler.js";
import {ReactComponent as MoreVert} from '../assets/more_vert.svg'
import {ReactComponent as PeopleOutline} from '../assets/people_outline.svg'
import {ReactComponent as Plus} from '../assets/plus.svg'
import {TaskRender} from "../components/TaskRender.jsx";
import {useState} from "react";
import {redirect} from "react-router";

export async function action(e) {
    console.log("e",e);
    console.log("on submitted");


    return redirect(`/task/${e.params.taskListId}`);
}

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
    const {taskList} = useLoaderData();
    const [isTaskAddInputFocus, setIsTaskAddInputFocus] = useState(false);

    const handleInputFocusChange = () => {
        isTaskAddInputFocus ?
            setIsTaskAddInputFocus(false)
            :
            setIsTaskAddInputFocus(true);
    }

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
                    <TaskRender userTasks={taskList}/>
                </div>

                <div id='task_adder'
                     className='
                          bg-light_bg_color
                          rounded-md
                          h-14
                          flex
                          items-center
                   '>
                    {
                        isTaskAddInputFocus ?
                            <div className='
                                      w-6
                                      h-6
                                      rounded-full
                                      mr-3
                                      ml-5
                                      border-3
                                      border-solid
                                      border-form_gray_color'
                            >
                            </div>
                            :
                            <Plus name='icon' width='30' heigth='30' className='mx-3'/>
                    }
                    <Form method='post' >
                        <input type='text'
                               className='
                                h-12 w-2/3
                                bg-light_bg_color
                                placeholder-transparent
                                text-white
                                border-0
                                outline-none
                                '
                               onFocus={handleInputFocusChange}
                               onBlur={handleInputFocusChange}
                               placeholder='add task'/>
                    </Form>
                </div>
            </div>

        </div>
    )
}