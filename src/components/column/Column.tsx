import { useContext } from 'react'
import { CartContext, CartItemInterface } from '../../contexts/CartContext'
import classes from './Column.module.scss'

interface ColumnProps {
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
	handleItemRemove: (id: string) => void
}

type PropertyType = 'gear' | 'model' | 'price' | 'value'

export const Column = ({ setIsError, handleItemRemove }: ColumnProps) => {
	const { temporary, setTemporary, cart, setCart, categories } = useContext(CartContext)

	const handleEdit = (id: string) => {
		const editingItem = cart.find(item => item.id === id)
		const newCart = cart.filter(item => item.id !== id)
		setIsError(false)

		if (parseFloat(editingItem?.price!) <= 0 || !editingItem?.gear || !editingItem?.model) {
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
		if (target.name === 'gear' || target.name === 'model' || target.name === 'price' || target.name === 'value') {
			const property: PropertyType = target.name
			const editingItem = cart.find(product => product.id === item.id)
			const newCart = cart.filter(product => product.id !== item.id)
			if (editingItem) {
				if (e.target.name !== 'value') {
					editingItem[property] = e.target.value
					newCart.push(editingItem)
				} else {
					const value = categories.find(item => item.text === e.target.value)
					editingItem['category'] = selectTarget.options[selectTarget.selectedIndex].value
					editingItem[property] = value?.value
					newCart.push(editingItem)
				}
			}
			setCart(newCart)
			setTemporary(newCart)
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
									value={item.gear}
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
									value={item.model}
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
									min={0}
									step={0.1}
									value={item.price}
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
									value={item.category!}
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
