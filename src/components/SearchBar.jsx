import {ReactComponent as Search} from "../assets/search.svg";


export function SearchBar() {
	return (
		<div className='flex justify-end mx-4 items-center w-full'>
			<input type='text'
				   placeholder='Search'
				   className='bg-deep_bg_color
						rounded
						h-9 w-full
						px-4 py-2
						text-white
						placeholder:text-form_gray_color
						focus:outline-white
						outline
						outline-2
						'
			/>
			<div className='absolute mr-3'>
			<Search/>
			</div>

		</div>
	)
}