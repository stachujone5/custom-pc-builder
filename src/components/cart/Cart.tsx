import { useContext } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CartContext } from '../../contexts/CartContext'
import classes from './Cart.module.scss'

interface CartProps {
	onClick: () => void
}

export const Cart = ({ onClick }: CartProps) => {
	const { cart } = useContext(CartContext)

	return (
		<div className={classes.cart}>
			<button className={classes.icon} onClick={onClick} aria-label='Otwórz koszyk'>
				<AiOutlineShoppingCart />
			</button>
			{cart.length ? <p className={classes.count}>{cart.length}</p> : null}
		</div>
	)
}
