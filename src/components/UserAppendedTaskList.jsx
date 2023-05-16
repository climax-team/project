import {
	Link,
	useLoaderData
} from "react-router-dom";
import {ReactComponent as MoreOption} from '../assets/more-option.svg'
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {FirestoreDB} from "../firebase-config.js";

export function UserAppendedTaskList() {
	const { taskLists } = useLoaderData();

	const [flyoutPosition, setFlyoutPosition] = useState({ x: 0, y: 0 });
	const showflyout = (event) => {
		event.preventDefault();
		const xPos = event.clientX;
		const yPos = event.clientY;
		setFlyoutPosition({ x: xPos, y: yPos });
		setShowFlyout(true);
	};

	
	const [showFlyout, setShowFlyout] = useState(false);
	const handleDeleteFlyout = () => {
		setShowFlyout(false);
	};


	const [userAddedTaskLists, setUserAddedTaskLists] = useState({});
	const uid = sessionStorage.getItem('userUid');
	const TaskListsDocRef = doc(FirestoreDB, "userTaskLists", uid);

	useEffect(() => {
		async function getUser() {
			const TaskListDocSnap = await getDoc(TaskListsDocRef);
			setUserAddedTaskLists(
				TaskListDocSnap.data()
			);
		}
		getUser();
	}, []);

	console.log(userAddedTaskLists);
	console.log("length" + userAddedTaskLists);

	const extractedObjects = Object.values(userAddedTaskLists);
	console.log(extractedObjects);


	return (
		<>
			{taskLists.length ?
				(
				<ul>
					{taskLists.map((taskList) => (
						<li key={taskList.id}>
							<Link to={`task/${taskList.id}`} >
								<div className='flex' onContextMenu={showflyout}>
								<MoreOption/>
								{taskList.title ?
									(
									<>
										{taskList.title}
									</>
									) :
									(
									<i>No Title List</i>
									)
								}

								{showFlyout &&
									(<div
										style={{top: flyoutPosition.y,
											left: flyoutPosition.x,}}
										className='
											absolute
											bg-form_gray_color
											border-solid
											border
											border-black
											p-2.5'
									>
										<button onClick={() => (taskList.id)}>| delete </button>
										<button >| edit |</button>
										<button onClick={handleDeleteFlyout}>* x *</button>
									</div>)
								}
								</div>
							</Link>
						</li>
					))}
				</ul>
				)
				:
				(<p>
					<i>No taskLists</i>
				</p>)
			}

		</>
	)
}

