import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Sorter } from '../sorter/Sorter'

interface FilterProps {
	className: string
}

export const Filter = ({ className }: FilterProps) => {
	const { categories, cart, setTemporary } = useContext(CartContext)
	const [sortValue, setSortValue] = useState('choose')

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === 'all') {
			setTemporary(cart)
			return
		}
		const newCart = cart.filter(item => item.value === e.target.value)
		setTemporary(newCart)
		setSortValue('choose')
	}
	if (!cart.length) {
		return null
	}
	return (
		<>
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
			<Sorter className={className} value={sortValue} setValue={setSortValue} />
		</>
	)
}
