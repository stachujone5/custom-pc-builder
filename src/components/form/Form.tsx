import { useContext, useRef } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Controls } from '../controls/Controls'
import { CartItemInterface } from '../../contexts/CartContext'
import classes from './Form.module.scss'

export const Form = () => {
	const gearRef = useRef<HTMLInputElement>(null)
	const modelRef = useRef<HTMLInputElement>(null)
	const priceRef = useRef<HTMLInputElement>(null)
	const categoryRef = useRef<HTMLSelectElement>(null)

	const { cart, setCart } = useContext(CartContext)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setCart((prevCart: CartItemInterface[]) => {
			return [
				...prevCart,
				{
					gear: gearRef.current?.value,
					model: modelRef.current?.value,
					price: priceRef.current?.value,
					category: categoryRef.current?.value,
				},
			]
		})

		console.log(cart)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Controls id='gear' label='Rodzaj sprzętu' type='text' reference={gearRef} />
			<Controls id='model' label='Model' type='text' reference={modelRef} />
			<Controls id='price' label='Cena' type='number' reference={priceRef} />
			<div className={classes['form-column']}>
				<label htmlFor='category' className={classes.label}>
					Kategoria
				</label>
				<select id='category' className={classes.select} ref={categoryRef}>
					<option value='components'>Podzespoły</option>
					<option value='hardware'>Urządzenia peryferyjne</option>
					<option value='software'>Oprogramowanie</option>
					<option value='other'>Inne</option>
				</select>
			</div>
			<button type='submit' className={classes.btn}>
				Dodaj
			</button>
		</form>
	)
}
