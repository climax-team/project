import {useOutletContext} from "react-router";
import {useEffect} from "react";
import {auth, FirestoreDB} from "../../firebase-config.js";
import {collection, getDocs, query, where} from "firebase/firestore";


export default function SearchPage() {
    const [] = useOutletContext();

    // useEffect(() => {
    //     const a = async () => {
    //         console.log('test');
    //         console.log('input', searchInputValue);
    //         const taskRef = collection(FirestoreDB, auth.currentUser.uid);
    //
    //         const q = query(taskRef, where("taskList.tasks", "array-contains", 'a'));
    //         const querySnapshot = await getDocs(q);
    //
    //         console.log(querySnapshot.docs);
    //
    //         await querySnapshot.forEach((doc) => {
    //             console.log(doc.id, " => ", doc.data());
    //         });
    //
    //     }
    //
    //     a();
    // }, [searchInputValue]);


    return (
        <>
            <div>
                <h1 className='text-white text-2xl'>
                    search page
                </h1>
                {/*<ul>*/}
                {/*    <div id='inCompleted_tasks'>*/}
                {/*        {*/}
                {/*            searchedTasks.map((task) =>*/}
                {/*                <li key={task.taskId}*/}
                {/*                    onClick={() => handleTaskClick(task)}*/}
                {/*                    className='*/}
                {/*                 flex*/}
                {/*                 my-1*/}
                {/*                 h-14*/}
                {/*                 p-1*/}
                {/*                 rounded-md*/}
                {/*                 bg-light_bg_color_op-50*/}
                {/*                 hover:bg-light_form_color'*/}
                {/*                    style={{*/}
                {/*                        backgroundColor: currentTaskId === task.taskId && 'rgba(148, 148, 255, 0.5)',*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    <div id='cheacker-radio' className='flex items-center justify-center '>*/}
                {/*                        <button*/}

                {/*                            onClick={(event) => {*/}
                {/*                                event.stopPropagation();*/}
                {/*                                void handleCompleteTaskBtnClick(task.taskId)*/}
                {/*                            }}*/}
                {/*                            className='*/}
                {/*                                  w-5 h-5*/}
                {/*                                  rounded-full*/}
                {/*                                  ml-4 mr-3*/}
                {/*                                  border-2*/}
                {/*                                  border-solid*/}
                {/*                                  border-form_gray_color*/}
                {/*                                  hover:border-white*/}
                {/*                                  flex items-center justify-center*/}
                {/*                                  group/checkItem*/}
                {/*                                  '*/}
                {/*                        >*/}
                {/*                            <div className=' group-hover/checkItem:visible invisible'>*/}
                {/*                                <CheckMark fill='#ffffff'/>*/}
                {/*                            </div>*/}
                {/*                        </button>*/}
                {/*                    </div>*/}
                {/*                    <div id='task_info-text'*/}
                {/*                         className='flex items-center break-all w-full text-left'>*/}
                {/*                    <span className='text-base text-white '>*/}
                {/*                        {task.taskTitle}*/}
                {/*                    </span>*/}
                {/*                    </div>*/}
                {/*                    <div id='important_star-toggleBtn' className='flex items-center justify-center p-3'>*/}
                {/*                        <EmptyStar name='icon'/>*/}
                {/*                    </div>*/}
                {/*                </li>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</ul>*/}
            </div>
        </>
    )
}