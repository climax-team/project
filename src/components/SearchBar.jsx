import {Form, useLoaderData, useNavigation, useSubmit} from "react-router-dom";
import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {ReactComponent as Search} from "../assets/search.svg";

export const SearchBar = ({setCurrentSelectedTaskList}) => {
	const navigate = useNavigate();
	const {q} = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();
	const handleSearchClick = () => {
		navigate('/search');
		setCurrentSelectedTaskList(null);
	}

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has(
			"q"
		);

	useEffect(() => {
		document.getElementById("q").value = q;
	}, [q]);
	return (
	<div className='flex justify-end mx-4 items-center w-full ' onClick={handleSearchClick}>
		<Form className='w-full' role='search' >
			<input
				id='q'
				type='search'
				placeholder='Search'
				name='q'
				defaultValue={q}
				onChange={(event) => {
					const isFirstSearch = q == null;
					submit(event.currentTarget.form, {
						replace: !isFirstSearch,
					});
				}}
				className='
				   		bg-deep_bg_color
						rounded
						h-10 w-full
						px-4 py-2
						text-white
						placeholder:text-form_gray_color
						focus:outline-white
						outline
						outline-2
						focus:shadow-lg
						focus:shadow-accent_color
						'
			/>
		</Form>
		<div className='absolute mr-3'>
			<Search/>
		</div>
	</div>
	)
}