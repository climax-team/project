import { redirect } from "react-router-dom";
import {deleteTaskList} from "../taskListControler.js";

export async function action({ params }) {
    console.log(params.taskListId);
    await deleteTaskList(params.taskListId);
    return redirect("/");
}