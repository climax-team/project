import {useLoaderData} from "react-router-dom";
import {getTaskLists} from "../taskListControler.js";

export async function loader({ params }) {
	const taskList = await getTaskLists(params.taskId);
	if (!taskList) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return { taskList };
}


export default function Task() {
	const { taskList } = useLoaderData();



	return (
		<div>
			<h1>task list</h1>
		</div>
	)
}