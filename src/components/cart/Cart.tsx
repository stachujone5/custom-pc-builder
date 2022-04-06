import { AiOutlineShoppingCart } from 'react-icons/ai'
import classes from './Cart.module.scss'

interface CartProps {
	onClick: () => void
}

export const Cart = ({ onClick }: CartProps) => {
	return (
		<div className={classes.cart}>
			<button className={classes.icon} onClick={onClick} aria-label='Otwórz koszyk'>
				<AiOutlineShoppingCart />
			</button>
			<p className={classes.count}>1</p>
		</div>
	)
}
