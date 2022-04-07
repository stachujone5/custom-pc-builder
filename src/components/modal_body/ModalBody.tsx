import { useContext, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { CartContext, CartItemInterface } from '../../contexts/CartContext'
import classes from './ModalBody.module.scss'

interface ModalBodyProps {
	view: string
}

type PropertyType = 'gear' | 'model' | 'price'

export const ModalBody = ({ view }: ModalBodyProps) => {
	const { cart, setCart, temporary, setTemporary, categories } = useContext(CartContext)

	const handleItemRemove = (id: string) => {
		const newCart = cart.filter(item => item.id !== id)

		localStorage.setItem('cart', JSON.stringify(newCart))

		setCart(newCart)
		setTemporary(newCart)
	}

	const handleEdit = (id: string) => {
		const editingItem = cart.find(item => item.id === id)
		const newCart = cart.filter(item => item.id !== id)

		if (editingItem) {
			editingItem.isEditing = !editingItem.isEditing
			newCart.push(editingItem)
			setCart(newCart)
		}

		localStorage.setItem('cart', JSON.stringify(newCart))
	}

	const handleGearChange = (e: React.ChangeEvent<HTMLInputElement>, item: CartItemInterface) => {
		if (e.target.name === 'gear' || e.target.name === 'model' || e.target.name === 'price') {
			const property: PropertyType = e.target.name
			const editingItem = cart.find(product => product.id === item.id)
			const newCart = cart.filter(product => product.id !== item.id)
			if (editingItem) {
				editingItem[property] = e.target.value
				newCart.push(editingItem)
			}
			setCart(newCart)
			setTemporary(newCart)
		}
	}

	if (view === 'table') {
		return (
			<table className={classes.table}>
				<thead>
					<tr>
						<th className={classes.column}>Rodzaj sprzętu:</th>
						<th className={classes.column}>Model:</th>
						<th className={classes.column}>Cena:</th>
						<th className={classes.column}>Kategoria:</th>
					</tr>
				</thead>
				<tbody>
					{temporary.map(item => {
						return (
							<tr>
								<td className={classes.td}>{item.gear}</td>
								<td className={classes.td}>{item.model}</td>
								<td className={classes.td}>{item.price} zł</td>
								<td className={classes.td}>{item.category}</td>
								<td>
									<button className={classes['table-btn']} onClick={() => handleItemRemove(item.id)}>
										<IoClose />
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
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
									value={item.gear}
									onChange={e => {
										handleGearChange(e, item)
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
									value={item.model}
									onChange={e => {
										handleGearChange(e, item)
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
									type='text'
									name='price'
									value={item.price}
									onChange={e => {
										handleGearChange(e, item)
									}}></input>
							) : (
								<p>{item.price} zł</p>
							)}
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Kategoria:</h3>
							{item.isEditing ? (
								<select className={classes.input}>
									{categories.map(category => {
										return <option key={category.value}>{category.text}</option>
									})}
								</select>
							) : (
								<p>{item.category}</p>
							)}
						</div>
						<button className={classes.btn} onClick={() => handleEdit(item.id)}>
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
