import classes from './CategoryModal.module.scss'
import { IoClose } from 'react-icons/io5'
import { CartContext } from '../../contexts/CartContext'
import { v4 as uuidv4 } from 'uuid'
import React, { useContext, useEffect, useRef, useState } from 'react'

interface CategoryModalProps {
	onClick: () => void
}

export const CategoryModal = ({ onClick }: CategoryModalProps) => {
	const { setCategories, categories } = useContext(CartContext)
	const [newCategory, setNewCategory] = useState('')
	const [isError, setIsError] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		localStorage.setItem('categories', JSON.stringify(categories))
	}, [categories])

	const handleAdd = () => {
		const addedCategory = { text: newCategory, value: uuidv4() }
		if (newCategory) {
			setCategories(prevCategories => {
				return [...prevCategories, addedCategory]
			})
			const newArray = [...JSON.parse(localStorage.getItem('categories')!), addedCategory]
			localStorage.setItem('categories', JSON.stringify(newArray))
			inputRef.current!.value = ''
			setNewCategory('')
			onClick()
			setIsError(false)
		}
		setIsError(true)
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewCategory(e.target.value)
	}
	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<h2 className={classes.title}>Dodaj kategorię</h2>
				<button onClick={onClick} className={classes.btn} aria-label="Zamknij modal">
					<IoClose />
				</button>
				<div className={classes.container}>
					<input
						type='text'
						id='category'
						onChange={handleChange}
						ref={inputRef}
						placeholder='Nowa kategoria'
						className={`${classes.input} ${isError ? classes.error : null}`}
					/>
					<button className={classes.add} onClick={handleAdd}>
						Dodaj
					</button>
				</div>
			</div>
		</div>
	)
}
