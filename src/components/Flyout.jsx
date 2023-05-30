import {useState} from "react";

export function Flyout() {

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
			{showFlyout &&
				(<div
					style={{
						top: flyoutPosition.y,
						left: flyoutPosition.x,
					}}
					className='
											absolute
											bg-form_gray_color
											border-solid
											border
											border-black
											p-2.5'
				>
					<button onClick={() => (taskList.id)}>| delete</button>
					<button>| edit |</button>
					<button onClick={handleDeleteFlyout}>* x *</button>
				</div>)
			}
		</>
	)
}