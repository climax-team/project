import {Link} from "react-router-dom";
import React from "react";


export function TaskListItem({title, icon, setItem, current}) {

    let link = title;

    if (title.match(/\s/g)){
        link = title.replace(/\s/g, "");
    }


    return (
        <>
            <Link to={`task/${link}`}
                  onClick={() => setItem(link)}
            >
                <div className='
                      flex
                      hover:bg-light_form_color
                      rounded-md
                      mx-2 my-1
                      px-0.5
                      py-2
                      items-center
                      '
                     style={{background : current === link && '#1e1e2c'}}
                >
                    <div className='m-2'>
                        {icon}
                    </div>
                    <span className='text-white ml-2 text-lg'>{title}</span>
                </div>
            </Link>
        </>
    )
}