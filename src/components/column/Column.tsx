import { useContext, useRef, useState } from 'react'
import { CartContext, CartItemInterface } from '../../contexts/CartContext'
import classes from './Column.module.scss'

interface ColumnProps {
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
	handleItemRemove: (id: string) => void
}

type PropertyType = 'gear' | 'model' | 'price' | 'value'

export const Column = ({ setIsError, handleItemRemove }: ColumnProps) => {
	const { temporary, setTemporary, cart, setCart, categories } = useContext(CartContext)

	const handleEdit = (e: any, id: string) => {
		const editingItem = cart.find(item => item.id === id)
		const newCart = cart.filter(item => item.id !== id)
		setIsError(false)

		if (parseFloat(editingItem?.price!) <= 0 || !editingItem?.price || !editingItem?.gear || !editingItem?.model) {
			setIsError(true)
			return
		}

		if (editingItem) {
			editingItem.isEditing = !editingItem.isEditing
			newCart.push(editingItem)
			setCart(newCart)
			localStorage.setItem('cart', JSON.stringify(newCart))
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
		item: CartItemInterface
	) => {
		const { target } = e as React.ChangeEvent<HTMLInputElement>
		const { target: selectTarget } = e as React.ChangeEvent<HTMLSelectElement>

		const editedItem = cart.find(product => item.id === product.id)

		if (target.name === 'gear' || target.name === 'model' || target.name === 'price' || target.name === 'value') {
			const property: PropertyType = target.name
			if (editedItem) {
				if (e.target.name !== 'value') {
					editedItem[property] = e.target.value
				} else {
					const value = categories.find(item => item.text === e.target.value)
					editedItem['category'] = selectTarget.options[selectTarget.selectedIndex].value
					editedItem[property] = value?.value
				}
			}
		}
	}
	return (
		<div className={classes['modal-body']}>
			{temporary.map(item => {
				return (
					<div className={classes.item} key={item.id}>
						<div className={classes.cell}>
							<h3 className={classes.title}>Rodzaj sprzętu:</h3>
							{item.isEditing ? (
								<input
									className={classes.input}
									type='text'
									name='gear'
									placeholder={item.gear}
									onChange={e => {
										handleChange(e, item)
									}}></input>
							) : (
								<p>{item.gear}</p>
							)}
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Model:</h3>
							{item.isEditing ? (
								<input
									className={classes.input}
									type='text'
									name='model'
									placeholder={item.model}
									onChange={e => {
										handleChange(e, item)
									}}></input>
							) : (
								<p>{item.model}</p>
							)}
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Cena:</h3>
							{item.isEditing ? (
								<input
									className={classes.input}
									type='number'
									name='price'
									placeholder={item.price}
									min={0}
									step={0.1}
									onChange={e => {
										handleChange(e, item)
									}}></input>
							) : (
								<p>{item.price} zł</p>
							)}
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Kategoria:</h3>
							{item.isEditing ? (
								<select
									className={classes.input}
									name='value'
									defaultValue={item.category!}
									onChange={e => {
										handleChange(e, item)
									}}>
									{categories.map(category => {
										return <option key={category.value}>{category.text}</option>
									})}
								</select>
							) : (
								<p>{item.category}</p>
							)}
						</div>
						<button className={classes.btn} onClick={e => handleEdit(e, item.id)}>
							{item.isEditing ? 'Zatwierdź' : 'Edytuj'}
						</button>
						<button className={classes.btn} onClick={() => handleItemRemove(item.id)}>
							Usuń
						</button>
					</div>
				)
			})}
		</div>
	)
}
