import React from 'react';
import {ReactComponent as SunStrokeIcon} from '../assets/sun-stroke.svg'
import {ReactComponent as Star} from '../assets/star.svg'
import {ReactComponent as CalenderFill} from '../assets/calendar-fill.svg'
import {ReactComponent as AccountCircle} from '../assets/account_circle.svg'
import {ReactComponent as Home} from '../assets/home.svg'
import '../styles/fixedTaskList.css'
import {Link, useLoaderData} from "react-router-dom";

export function FixedTaskList() {
    const tasks = useLoaderData();

    return (
        <>
            <Link to={`task/daily-tasks`}>
                <div id='daily-tasks' className='task-list'>
                    <SunStrokeIcon name='icon'/>
                    <span>daily tasks</span>
                </div>
            </Link>

            <Link to={`task/important`}>
                <div id='important' className='task-list'>
                    <Star name='icon'/>
                    <span>important</span>
                </div>
            </Link>

            <Link to={`task/plan`}>
            <div id='plan' className='task-list'>
                <CalenderFill name='icon'/>
                <span>plan</span>
            </div>
            </Link>

            <Link to={`task/about-me`}>
            <div id='about-me' className='task-list'>
                <AccountCircle name='icon'/>
                <span>about me</span>
            </div>
            </Link>

            <Link to={`task/tasks`}>
            <div id='tasks' className='task-list'>
                <Home name='icon'/>
                <span>tasks</span>
            </div>
            </Link>
        </>
    )
}