import React, { useContext, useState } from 'react'
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
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Sorter = ({ className, value, setValue }: SorterProps) => {
	console.log('render')
	const { cart, setTemporary, temporary } = useContext(CartContext)
	let newCart: CartItemInterface[]

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setValue(value)
		if (cart.length) {
			if (value === 'gear') {
				newCart = temporary.sort((a, b) => {
					const textA = a.gear!.toUpperCase()
					const textB = b.gear!.toUpperCase()
					return textA < textB ? -1 : textA > textB ? 1 : 0
				})
			}
			if (value === 'model') {
				newCart = temporary.sort((a, b) => {
					const textA = a.model!.toUpperCase()
					const textB = b.model!.toUpperCase()
					return textA < textB ? -1 : textA > textB ? 1 : 0
				})
			}
			if (value === 'category') {
				newCart = temporary.sort((a, b) => {
					const textA = a.category!.toUpperCase()
					const textB = b.category!.toUpperCase()
					return textA < textB ? -1 : textA > textB ? 1 : 0
				})
			}
			if (value === 'price ascending') {
				newCart = temporary.sort((a: CartItemInterface, b: CartItemInterface) => {
					const textA = a.price!.toUpperCase()
					const textB = b.price!.toUpperCase()
					return Number(textA) < Number(textB) ? -1 : Number(textA) > Number(textB) ? 1 : 0
				})
			}
			if (value === 'price descending') {
				newCart = temporary.sort((a: CartItemInterface, b: CartItemInterface) => {
					const textA = a.price!.toUpperCase()
					const textB = b.price!.toUpperCase()
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
			<select id='sorter' className={className} onChange={handleChange} value={value}>
				{sortingCategories.map(category => {
					return (
						<option key={category.value} value={category.value} disabled={category.value === 'choose'}>
							{category.text}
						</option>
					)
				})}
			</select>
		</div>
	)
}
