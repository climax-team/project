import {useLoaderData} from "react-router-dom";


export default function Task() {
	const { taskList } = useLoaderData();



	return (
		<div>
			<h1>task list</h1>
		</div>
	)
}