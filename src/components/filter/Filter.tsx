import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

interface FilterProps {
	className: string
	setCurrentOption: any
}

export const Filter = ({ className, setCurrentOption }: FilterProps) => {
	const { categories, cart, setTemporary, selectedOption } = useContext(CartContext)

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		selectedOption.current = 'Wybierz'
		setCurrentOption('Wybierz')
		if (e.target.value === 'all') {
			setTemporary(cart)
			return
		}
		const newCart = cart.filter(item => item.value === e.target.value)
		setTemporary(newCart)
	}

	if (!cart.length) {
		return null
	}
	return (
		<div>
			<label htmlFor='filter'>Filtruj</label>
			<select id='filter' className={className} onChange={handleChange}>
				<option value='all'>Wszystko</option>
				{categories.map(category => {
					return (
						<option key={category.value} value={category.value}>
							{category.text}
						</option>
					)
				})}
			</select>
		</div>
	)
}
