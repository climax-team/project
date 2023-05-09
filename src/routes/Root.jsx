import {
    Form,
    Outlet,
    redirect,
} from "react-router-dom";
import {FixedTaskList} from "../components/FixedTaskList.jsx";
import {UserAppendedTaskList} from "../components/UserAppendedTaskList.jsx";

import {createTaskList, getTaskLists} from "../tasks.js";

export async function action() {
    const taskList = await createTaskList();
    return { taskList };
}

export async function loader() {
    const taskLists = await getTaskLists();
    return {taskLists};
}

export default function Root() {
    return (
        <>
            <div id='sidebar' className='w-1/5 bg-light_bg_color h-screen border-2 flex flex-col min-w-max'>
                <div id='nav-header' className='h-1/4'>
                    <div id="user-info"></div>
                    <div id="search-bar"></div>
                </div>

                <div id='nav-items' className='border-2 h-1/3 flex-grow min-w-max'>
                    <div id="fixed-taskList">
                        <FixedTaskList/>
                    </div>
                    <div id="added-taskList">
                        <UserAppendedTaskList/>
                    </div>
                </div>

                <div id='nav-bottom-items' className='h-20 border-2 w-full '>
                    <div id="bottom-content">
                        <Form method="post">
                            <button type="submit">New</button>
                        </Form>

                    </div>
                </div>
            </div>
            <div id='contents' className='w-screen h-screen border-2 border-black'>
                <Outlet/>
            </div>
        </>
    );
}