import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import classes from './Filter.module.scss'

export const Filter = () => {
	const { categories, cart, setTemporary } = useContext(CartContext)

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value === 'all') {
			setTemporary(cart)
			return
		}
		const newCart = cart.filter(item => item.value === e.target.value)
		setTemporary(newCart)
	}
	return (
		<div className={classes.filter}>
			<div className={classes.col}>
				<select id='filter' className={classes.input} onChange={handleChange}>
					<option value='all'>Wszystko</option>
					{categories.map(category => {
						return (
							<option key={category.value} value={category.value}>
								{category.text}
							</option>
						)
					})}
				</select>
				<label htmlFor='filter'>Filtruj</label>
			</div>
		</div>
	)
}
