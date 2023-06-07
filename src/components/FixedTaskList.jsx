import React from 'react';
import {ReactComponent as SunStrokeIcon} from '../assets/sun-stroke.svg'
import {ReactComponent as Star} from '../assets/star.svg'
import {ReactComponent as CalenderFill} from '../assets/calendar-fill.svg'
import {ReactComponent as AccountCircle} from '../assets/account_circle.svg'
import {ReactComponent as Home} from '../assets/home.svg'
import {TaskListItem} from "./TaskListItem.jsx";

export function FixedTaskList({setCurrentItem, currentItem}) {


    return (
        <>
            <TaskListItem
                title={`daily tasks`}
                icon={<SunStrokeIcon name='icon'/>}
                setItem={setCurrentItem}
                current={currentItem}
            />

            <TaskListItem
                title={`important`}
                icon={<Star name='icon'/>}
                setItem={setCurrentItem}
                current={currentItem}
            />

            <TaskListItem
                title={`plan`}
                icon={<CalenderFill name='icon'/>}
                setItem={setCurrentItem}
                current={currentItem}
            />

            <TaskListItem
                title={`about me`}
                icon={<AccountCircle name='icon'/>}
                setItem={setCurrentItem}
                current={currentItem}
            />

            <TaskListItem
                title={`tasks`}
                icon={<Home name='icon'/>}
                setItem={setCurrentItem}
                current={currentItem}
            />
        </>
    )
}