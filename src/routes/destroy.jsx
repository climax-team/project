import { redirect } from "react-router-dom";
import {deleteTaskList} from "../taskListControler.js";

export async function action({ params }) {
    //throw new Error("oh dang!");
    await deleteTaskList(params.taskId);
    return redirect("/");
}