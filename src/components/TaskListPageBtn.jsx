import React, {useState} from "react";

import {ReactComponent as MoreVert} from '../assets/more_vert.svg'
import {ReactComponent as PeopleOutline} from '../assets/people_outline.svg'
import {ReactComponent as TrashCan} from "../assets/trash_can.svg";
import {ReactComponent as Pencil} from "../assets/pencil.svg";
import {ReactComponent as XIcon} from "../assets/x-icon.svg";
import {ReactComponent as Plus} from "../assets/plus.svg";
import {Form} from "react-router-dom";

export function TaskListPageBtn() {
    const [isListOptionPopUpShow, setIsListOptionPopUpShow] = useState(false);
    const [isSharePopUp, setIsSharePopUp] = useState(false);

    const popUpDelete = () => {
        setIsListOptionPopUpShow(false);
        setIsSharePopUp(false)
    }



    return (
        <>
            <div id='task_list-button' className='flex w-full justify-end items-center'>
                <div id='share-btn'
                     onClick={() => setIsSharePopUp(true)}
                     className='w-9 h-9 bg-light_bg_color flex justify-center items-center rounded-lg m-1'
                     style={{backgroundColor: isSharePopUp && '#9494ff'}}
                >
                    <PeopleOutline name='icon'/>
                </div>
                <div id='more_option-btn'
                     onClick={() => setIsListOptionPopUpShow(true)}
                     className='w-9 h-9 bg-light_bg_color flex justify-center items-center rounded-lg m-1'
                     style={{backgroundColor: isListOptionPopUpShow && '#9494ff'}}
                >
                    <MoreVert name='icon'/>
                </div>
            </div>
            {isSharePopUp && <SharePopUp popUpDelete={popUpDelete}/>}
            {isListOptionPopUpShow && <ListPopUp popUpDelete={popUpDelete}/>}

        </>
    );
}

function SharePopUp({popUpDelete}) {
    return (
        <>
            <div>
                <div
                    className='absolute top-0 left-0 right-0 bottom-0
                    w-full h-full
                    flex justify-center items-center'
                    style={{backgroundColor: 'rgba(0,0,0,0.51)'}}
                    onClick={popUpDelete}>
                    <div className='rounded-md w-2/5 h-3/4 max-w-md min-w-max bg-light_bg_color flex flex-col'
                         onClick={(event) => event.stopPropagation()}
                    >
                        <div id='top-bar'
                             className='flex border-b-2 border-solid border-white justify-center items-center'>
                            <div className='w-1/6 h-full'></div>
                            <div className='grow flex items-center justify-center'>
                                <span className='text-white text-3xl my-3 '>share task list</span>
                            </div>
                            <div className='w-1/6 h-full flex items-center justify-center '>
                                <div onClick={popUpDelete}>
                                    <XIcon/>
                                </div>
                            </div>
                        </div>

                        <div id='content' className='flex flex-col h-full'>
                            <div id='userList-area' className='h-full'>

                            </div>
                            <div id='bottom-bar' className='border-t-2 border-white border-solid flex p-3'>
                                <div
                                    className='flex justify-center items-center bg-deep_bg_color w-11 h-11 rounded-md mr-3 '>
                                    <div className='flex items-center justify-center w-6 h-6'>
                                        <Plus/>
                                    </div>
                                </div>
                                <input type="text" placeholder='user id' className='rounded-md w-full px-3 bg-deep_bg_color text-white'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ListPopUp({popUpDelete}) {
    return (
        <>
            <div
                className='absolute top-0 left-0 right-0 bottom-0
                    w-full h-full
                    flex justify-center items-center'
                style={{backgroundColor: 'rgba(0,0,0,0.51)'}}
                onClick={popUpDelete}>
                <div className='rounded-md w-2/5 h-3/4 max-w-md min-w-max bg-light_bg_color flex flex-col'
                     onClick={(event) => event.stopPropagation()}
                >
                    <div id='top' className='flex border-b-2 border-solid border-white justify-center items-center'>
                        <div className='w-1/6 h-full'></div>
                        <div className='grow flex items-center justify-center'>
                            <span className='text-white text-3xl my-3 '>list options</span>
                        </div>
                        <div className='w-1/6 h-full flex items-center justify-center '>
                            <div onClick={popUpDelete}>
                                <XIcon/>
                            </div>
                        </div>
                    </div>

                    <div id='bottom' className='flex justify-center items-center min-w-max flex-col px-3 pt-4'>
                        <div className='flex items-center w-full bg-deep_bg_color rounded-md mb-2'>
                            <div className='flex m-4'>
                                <Pencil/>
                            </div>
                            <span className='m-4 text-xl text-white'>change task list name</span>
                        </div>
                        <Form
                            method="post"
                            action="destroy"
                            onSubmit={(event) => {
                                if (!confirm("Please confirm you want to delete this record.")) {
                                    event.preventDefault();
                                }
                            }}
                            className='w-full'
                        >
                            <button type='submit' className='flex items-center w-full bg-deep_bg_color rounded-md'>
                                <div className='flex m-4'>
                                    <TrashCan fill="#a61d1d"/>
                                </div>
                                <span className='m-4 text-xl' style={{color: "firebrick"}}>delete task list</span>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}