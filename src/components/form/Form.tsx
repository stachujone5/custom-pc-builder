import { useContext, useEffect, useRef, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Controls } from '../controls/Controls'
import { CartItemInterface } from '../../contexts/CartContext'
import { validate } from '../../helpers/validate'
import { v4 as uuidv4 } from 'uuid'
import classes from './Form.module.scss'

interface ErrorInterface {
	gear: boolean
	model: boolean
	price: boolean
}

const selectOptions = [
	{ value: 'components', text: 'Podzespoły' },
	{ value: 'hardware', text: 'Urządzenia peryferyjne' },
	{ value: 'software', text: 'Oprogramowanie' },
	{ value: 'other', text: 'inne' },
]

export const Form = () => {
	const gearRef = useRef<HTMLInputElement>(null)
	const modelRef = useRef<HTMLInputElement>(null)
	const priceRef = useRef<HTMLInputElement>(null)
	const categoryRef = useRef<HTMLSelectElement>(null)

	const { setCart } = useContext(CartContext)
	const [errors, setErrors] = useState<ErrorInterface | undefined>()

	useEffect(() => {
		if (!errors?.gear && !errors?.model && !errors?.price && errors) {
			setCart((prevCart: CartItemInterface[]) => {
				return [
					...prevCart,
					{
						gear: gearRef.current?.value,
						model: modelRef.current?.value,
						price: priceRef.current?.value,
						category: categoryRef.current?.options[categoryRef.current.selectedIndex].textContent,
						id: uuidv4(),
					},
				]
			})
			clearForm()
		}
	}, [setCart, errors])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrors(validate(gearRef.current, modelRef.current, priceRef.current))
	}

	const clearForm = () => {
		gearRef.current!.value = ''
		modelRef.current!.value = ''
		priceRef.current!.value = ''
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Controls id='gear' label='Rodzaj sprzętu' type='text' inputRef={gearRef} error={errors?.gear} />
			<Controls id='model' label='Model' type='text' inputRef={modelRef} error={errors?.model} />
			<Controls id='price' label='Cena' type='number' inputRef={priceRef} min={0} error={errors?.price} />
			<Controls id='category' label='Kategoria' element='select' selectRef={categoryRef} options={selectOptions} />
			<button type='submit' className={classes.btn}>
				Dodaj
			</button>
		</form>
	)
}
