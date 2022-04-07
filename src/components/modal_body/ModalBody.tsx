import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import classes from './ModalBody.module.scss'

export const ModalBody = () => {
	const { cart, setCart, temporary, setTemporary } = useContext(CartContext)

	const handleItemRemove = (id: string) => {
		const newCart = cart.filter(item => item.id !== id)

		localStorage.setItem('cart', JSON.stringify(newCart))

		setCart(newCart)
		setTemporary(newCart)
	}

	return (
		<div className={classes['modal-body']}>
			{temporary.map(item => {
				return (
					<div className={classes.item} key={item.id}>
						<div className={classes.cell}>
							<h3 className={classes.title}>Rodzaj sprzętu:</h3>
							<p>{item.gear}</p>
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Model:</h3>
							<p>{item.model}</p>
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Cena:</h3>
							<p>{item.price} zł</p>
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Kategoria:</h3>
							<p>{item.category}</p>
						</div>
						<button className={classes.btn} onClick={() => handleItemRemove(item.id)}>
							Usuń
						</button>
					</div>
				)
			})}
		</div>
	)
}
