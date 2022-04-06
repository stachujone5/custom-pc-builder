import { useContext, useRef, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Controls } from '../controls/Controls'
import { CartItemInterface } from '../../contexts/CartContext'
import classes from './Form.module.scss'
import { validate } from '../../helpers/validate'

interface ErrorInterface {
	gear: boolean
	model: boolean
	price: boolean
}

export const Form = () => {
	const gearRef = useRef<HTMLInputElement>(null)
	const modelRef = useRef<HTMLInputElement>(null)
	const priceRef = useRef<HTMLInputElement>(null)
	const categoryRef = useRef<HTMLSelectElement>(null)

	const { cart, setCart } = useContext(CartContext)
	const [errors, setErrors] = useState<ErrorInterface | undefined>()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrors(validate(gearRef.current, modelRef.current, priceRef.current))

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
		console.log(errors?.gear)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Controls id='gear' label='Rodzaj sprzętu' type='text' reference={gearRef} error={errors?.gear} />
			<Controls id='model' label='Model' type='text' reference={modelRef} error={errors?.model} />
			<Controls id='price' label='Cena' type='number' reference={priceRef} min={0} error={errors?.price} />
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
