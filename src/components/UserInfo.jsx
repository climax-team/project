import {auth} from "../firebase-config.js";
import React, {useState} from "react";
import {ReactComponent as BAccountCircle} from '../assets/big-account-circle.svg'
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router";
import {useLoaderData} from "react-router-dom";


export function UserInfo() {
	const navigate = useNavigate();
	const {userInfo} = useLoaderData();

	function handleLogOut() {
		signOut(auth).then(() => {
			navigate('/logIn');
			window.localStorage.clear();
			window.sessionStorage.clear();
			window.location.reload()
			console.log("log-out successful");
		}).catch((error) => {
			console.error("log out something happen",error);
		})
	}

	//todo eliminate duplicate
	const [flyoutPosition, setFlyoutPosition] = useState({x: 0, y: 0});
	const showflyout = (event) => {
		event.preventDefault();
		const xPos = event.clientX;
		const yPos = event.clientY;
		setFlyoutPosition({x: xPos, y: yPos});
		setShowFlyout(true);
	};

	const [showFlyout, setShowFlyout] = useState(false);
	const handleDeleteFlyout = () => {
		setShowFlyout(false);
	};

	return (
		<>
			<div id='userInfoBox'
				 onClick={showflyout}
				 className='flex flex-row justify-center items-center mt-10'
			>
				<BAccountCircle name='icon'/>
				<div className='flex flex-col ml-5 justify-center mb-2'>
					<h1 id='userName' className='text-white text-xl'>
						{auth.currentUser.displayName === null ?
							userInfo.userName
							:
							localStorage.getItem('userName')
						}
					</h1>
					<h3 id='userEmail' className='text-white text-sm'>{auth.currentUser.email}</h3>
				</div>
			</div>
			{showFlyout && (
				<div
					style={{top: flyoutPosition.y, left: flyoutPosition.x,}}
					className='absolute bg-form_gray_color border-solid border border-black p-2.5'
				>
					<button onClick={handleLogOut}>
						log out
					</button>
					<button onClick={handleDeleteFlyout}>* x *</button>
				</div>
			)}
		</>
	)
}