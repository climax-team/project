import {ReactComponent as Star} from "../assets/star-empty.svg"
import {ReactComponent as CheckMark} from "../assets/checkmark.svg";
import {ReactComponent as ArrowDown} from "../assets/chevron-down.svg";
import {ReactComponent as ArrowRight} from "../assets/chevron-right.svg";
import {taskEditFunctionConnector, getTaskList, getTask} from "../taskListControler.js";
import {useLoaderData} from "react-router-dom";
import {useState} from "react";


export function TaskRender({
                               userTasks,
                               setUserTasks,
                               currentSelectedTask,
                               setCurrentSelectedTask,
                               setIsEditorDisplayed,
                           }) {
    const {taskListId} = useLoaderData();
    let currentTaskId = null;
    console.log('user',userTasks);
    const inCompletedTasks = userTasks.filter(task => task.isCompleted === false);
    const completedTasks = userTasks.filter(task => task.isCompleted === true);

    const [isCompletedListShow, setIsCompletedListShow] = useState(true);

    if (currentSelectedTask) {
        currentTaskId = currentSelectedTask.taskId;
    }

    const handleTaskClick = (task) => {
        setIsEditorDisplayed(true);
        setCurrentSelectedTask(task);
    }

    const handleCompleteTaskBtnClick = async (taskId) => {
        await taskEditFunctionConnector(taskListId, taskId, 'complete');

        if (Boolean(currentSelectedTask)) {
            if (taskId === currentSelectedTask.taskId) {
                setCurrentSelectedTask(await getTask(taskId, taskListId));
            }
        }

        setUserTasks(await getTaskList(taskListId));
    }

    const handleStarClick = async (taskId) => {
        await taskEditFunctionConnector(taskListId, taskId, 'important');

        setCurrentSelectedTask(await getTask(taskId, taskListId));
        setUserTasks(await getTaskList(taskListId));
    }

    return (
        <>
            {userTasks.length ? (
                <ul className=''>
                    <div id='inCompleted_tasks'>
                        {
                            inCompletedTasks.map((task) =>
                                <li key={task.taskId}
                                    onClick={() => handleTaskClick(task)}
                                    className='
                                 flex
                                 my-1
                                 h-14
                                 p-1
                                 rounded-md
                                 bg-light_bg_color_op-50
                                 hover:bg-light_form_color'
                                    style={{
                                        backgroundColor: currentTaskId === task.taskId && 'rgba(148, 148, 255, 0.5)',
                                    }}
                                >
                                    <div id='cheacker-radio' className='flex items-center justify-center '>
                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                void handleCompleteTaskBtnClick(task.taskId)
                                            }}
                                            className='
                                                  w-5 h-5
                                                  rounded-full
                                                  ml-4 mr-3
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
                                        </button>
                                    </div>
                                    <div id='task_info-text'
                                         className='flex items-center break-all w-full text-left'>
                                    <span className='text-base text-white '>
                                        {task.taskTitle}
                                    </span>
                                    </div>
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            void handleStarClick(task.taskId);
                                        }}
                                        id='important_star-toggleBtn'>
                                        <div className='flex items-center justify-center p-3'>
                                            {
                                                task.isImportant ?
                                                    <Star fill='#9494ff' strok='#9494ff'/>
                                                    :
                                                    <Star fill='#fff' opacity='0.4' strok='#fff'/>

                                            }
                                        </div>
                                    </button>
                                </li>
                            )
                        }
                    </div>
                    <button id='show_completed_task_List-btn'
                            onClick={() => setIsCompletedListShow(!isCompletedListShow)}
                            className='rounded-md my-2 bg-light_bg_color_op-50 px-2 py-1 flex items-center justify-center'
                    >
                        <div className='flex mx-1 mr-3'>
                            {isCompletedListShow ? <ArrowDown fill='#ffffff'/> : <ArrowRight fill='#ffffff'/>}
                        </div>
                        <span className='text-white text-lg'>completed</span>
                        <span className='text-white text-lg ml-3'>{completedTasks.length}</span>
                    </button>
                    <div id='completed_task'>
                        {
                            isCompletedListShow && completedTasks.map((task) =>
                                <li key={task.taskId}
                                    onClick={() => handleTaskClick(task)}
                                    className='
                                 flex
                                 my-1
                                 h-14
                                 p-1
                                 rounded-md
                                 bg-light_bg_color_op-50
                                 hover:bg-light_form_color'
                                    style={{
                                        backgroundColor: currentTaskId === task.taskId && 'rgba(148, 148, 255, 0.5)',
                                    }}
                                >
                                    <div id='cheacker-radio' className='flex items-center justify-center '>
                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                void handleCompleteTaskBtnClick(task.taskId)
                                            }}
                                            className='
                                      w-5 h-5
                                      bg-accent_color
                                      rounded-full
                                      ml-4 mr-3
                                      border-2
                                      border-solid
                                      border-white
                                      flex items-center justify-center
                                      '
                                        >
                                            <div>
                                                <CheckMark fill='#ffffff'/>
                                            </div>
                                        </button>
                                    </div>
                                    <div id='task_info-text'
                                         className='flex items-center break-all w-full text-left'>
                                    <span className='text-base text-white line-through'>
                                        {task.taskTitle}
                                    </span>
                                    </div>
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            void handleStarClick(task.taskId);
                                        }}
                                    >
                                        <div className='flex items-center justify-center p-3 '>
                                            {
                                                task.isImportant ?
                                                    <Star fill='#9494ff' strok='#9494ff'/>
                                                    :
                                                    <Star fill='#fff' opacity='0.4' strok='#fff'/>
                                            }
                                        </div>
                                    </button>
                                </li>
                            )
                        }
                    </div>
                </ul>
            ) : (
                <div className='flex justify-center items-center h-full'>
                    <h1 className='text-white text-2xl'>the task list is empty plz add your own task!!</h1>
                </div>
            )}
        </>
    );
}