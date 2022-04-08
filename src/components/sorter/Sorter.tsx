import React, { useContext } from 'react'
import { CartContext, CartItemInterface } from '../../contexts/CartContext'

const sortingCategories = [
	{ value: 'choose', text: 'Wybierz' },
	{ value: 'gear', text: 'Alfabetycznie (Sprzęt)' },
	{ value: 'model', text: 'Alfabetycznie (Model)' },
	{ value: 'category', text: 'Alfabetycznie (Kategoria)' },
	{ value: 'price ascending', text: 'Cena rosnąco' },
	{ value: 'price descending', text: 'Cena malejąco' },
]

interface SorterProps {
	className: string
	currentOption: any
	setCurrentOption: any
}

export const Sorter = ({ className, currentOption, setCurrentOption }: SorterProps) => {
	const { cart, setTemporary, selectedOption, temporary } = useContext(CartContext)
	let newCart: CartItemInterface[]

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.options[e.target.selectedIndex].value
		setCurrentOption('Wybierz')

		if (cart.length) {
			if (value === 'choose') {
				newCart = temporary
				selectedOption.current = 'Wybierz'
				setCurrentOption('Wybierz')
			}
			if (value === 'gear') {
				newCart = temporary.sort((a, b) => {
					const textA = a.gear!.toUpperCase()
					const textB = b.gear!.toUpperCase()
					selectedOption.current = 'Alfabetycznie (Sprzęt)'
					setCurrentOption('Alfabetycznie (Sprzęt)')
					return textA < textB ? -1 : textA > textB ? 1 : 0
				})
			}
			if (value === 'model') {
				newCart = temporary.sort((a, b) => {
					const textA = a.model!.toUpperCase()
					const textB = b.model!.toUpperCase()
					selectedOption.current = 'Alfabetycznie (Model)'
					setCurrentOption('Alfabetycznie (Model)')
					return textA < textB ? -1 : textA > textB ? 1 : 0
				})
			}
			if (value === 'category') {
				newCart = temporary.sort((a, b) => {
					const textA = a.category!.toUpperCase()
					const textB = b.category!.toUpperCase()
					selectedOption.current = 'Alfabetycznie (Kategoria)'
					setCurrentOption('Alfabetycznie (Kategoria)')
					return textA < textB ? -1 : textA > textB ? 1 : 0
				})
			}
			if (value === 'price ascending') {
				newCart = temporary.sort((a: CartItemInterface, b: CartItemInterface) => {
					const textA = a.price!.toUpperCase()
					const textB = b.price!.toUpperCase()
					selectedOption.current = 'Cena rosnąco'
					setCurrentOption('Cena rosnąco')

					return Number(textA) < Number(textB) ? -1 : Number(textA) > Number(textB) ? 1 : 0
				})
			}
			if (value === 'price descending') {
				newCart = temporary.sort((a: CartItemInterface, b: CartItemInterface) => {
					const textA = a.price!.toUpperCase()
					const textB = b.price!.toUpperCase()
					selectedOption.current = 'Cena malejąco'
					setCurrentOption('Cena malejąco')

					return Number(textB) < Number(textA) ? -1 : Number(textB) > Number(textA) ? 1 : 0
				})
			}

			setTemporary([...newCart])
		}
	}

	if (!cart.length) {
		return null
	}
	return (
		<div>
			<label htmlFor='sorter'>Sortuj</label>
			<select id='sorter' className={className} onChange={handleChange}>
				{sortingCategories.map(category => {
					return (
						<option
							key={category.value}
							value={category.value}
							selected={currentOption === category.text}
							disabled={category.value === 'choose'}>
							{category.text}
						</option>
					)
				})}
			</select>
		</div>
	)
}
