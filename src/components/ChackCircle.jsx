import React from "react";

export function ChackCircle({size, borderWidth, borderColor}) {
	return (
			<div className='
			 rounded-full
			 border-solid
			 border-form_gray_color
			 '
				 style={{
					 width : size,
					 height : size,
					 borderWidth : borderWidth,
					 borderColor : borderColor,
					}}
			>
			</div>
	)
}