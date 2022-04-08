import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import classes from './ModalFooter.module.scss'

interface ModalFooterProps {
	closeCart: () => void
}

export const ModalFooter = ({ closeCart }: ModalFooterProps) => {
	const { setCart, setTemporary, temporary } = useContext(CartContext)

	const handleClearCart = () => {
		setCart([])
		setTemporary([])
		localStorage.setItem('cart', JSON.stringify([]))
		closeCart()
	}

	const fullPrice = temporary.reduce((acc, curr) => {
		if (curr.price) {
			return acc + parseFloat(curr.price)
		}
		return acc
	}, 0)

	return (
		<div className={classes.info}>
			<p>
				Ilość produktów: <span>{temporary.length}</span>
			</p>
			<p>
				Łącznie: <span>{fullPrice}zł</span>
			</p>
			<button className={classes.clear} onClick={handleClearCart}>
				Wyczyść koszyk
			</button>
		</div>
	)
}
