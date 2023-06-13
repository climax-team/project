import React, {useState} from "react";
import {
    Form,
    Link,
    Outlet
} from "react-router-dom";
import {createTaskList, getTaskLists, getUserInfo} from "../taskListControler.js";

import {FixedTaskList} from "../components/FixedTaskList.jsx";
import {UserAppendedTaskList} from "../components/UserAppendedTaskList.jsx";

import {UserInfo} from "../components/UserInfo.jsx";
import {SearchBar} from "../components/SearchBar.jsx";

import {ReactComponent as Calender} from '../assets/calendar.svg'
import {ReactComponent as Plus} from '../assets/plus.svg'

export async function action() {
    const taskList = await createTaskList();
    return {taskList};
}

export async function loader() {
    const userAddedTaskLists = await getTaskLists();
    const userInfo = await getUserInfo();

    return {userAddedTaskLists, userInfo};
}

export default function Root() {
    const [currentSelectedTaskList, setCurrentSelectedTaskList] = useState(sessionStorage.getItem('currentSelectedTaskList'));

    sessionStorage.setItem('currentSelectedTaskList', currentSelectedTaskList);

    return (
        <>
            <div id='sidebar' className='w-3/12 bg-light_bg_color h-screen flex flex-col min-w-200 max-w-xs'>
                <div id='nav-header' className='min-h-max flex-col justify-center items-center'>
                    <div id="user-info" className='mx-4'>
                        <UserInfo/>
                    </div>
                    <div id="search-bar" className='flex justify-center items-center my-2 py-4'>
                        <SearchBar />
                    </div>
                </div>

                <div id='nav-items' className='h-1/3 flex-grow min-w-max divide-y'>
                    <div id="fixed-taskList" >
                        <FixedTaskList setCurrentItem={setCurrentSelectedTaskList} currentItem={currentSelectedTaskList}/>
                    </div>
                    <div id="added-taskList" className='border-form_gray_color'>
                        <UserAppendedTaskList setCurrentItem={setCurrentSelectedTaskList}
                                              currentItem={currentSelectedTaskList}/>
                    </div>
                </div>

                <div id='nav-bottom-items' className='w-full '>
                    <Link to={`/calender`}
                          onClick={() => setCurrentSelectedTaskList("calender")}
                    >
                        <div id='daily-tasks'
                             className='
                                  flex
                                  hover:bg-light_form_color
                                  rounded-md
                                  mx-2 my-1
                                  px-0.5
                                  py-2
                                  items-center
                                  '
                             style={{background: currentSelectedTaskList === 'calender' && '#1e1e2c'}}
                        >
                            <div className='m-2'>
                            <Calender name='icon'/>
                            </div>
                            <span className='text-white ml-2 text-lg'>daily tasks</span>
                        </div>
                    </Link>
                    <Form method="post">
                        <div className='flex items-center  hover:bg-light_form_color rounded-md'>
                            <div className='m-2'>
                            <Plus width='18' height='18'/>
                            </div>
                            <button type="submit" className='m-2 text-white '>new task list</button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='w-screen h-screen bg-deep_bg_color'>
                <Outlet/>
            </div>
        </>
    );
}