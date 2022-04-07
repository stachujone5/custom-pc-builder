import classes from './Modal.module.scss'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalBody } from '../modal_body/ModalBody'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

interface ModalProps {
	onClick: () => void
}

export const Modal = ({ onClick }: ModalProps) => {
	const { cart } = useContext(CartContext)

	const fullPrice = cart.reduce((acc, curr) => {
		if (curr.price) {
			return acc + parseFloat(curr.price)
		}
		return acc
	}, 0)

	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<h2 className={classes.title}>Koszyk</h2>
				<button className={classes.btn} aria-label='Zamknij koszyk' onClick={onClick}>
					<IoCloseSharp />
				</button>
				{cart.length ? (
					<>
						<ModalBody />
						<div className={classes.info}>
							<p>
								Ilość produktów: <span>{cart.length}</span>
							</p>
							<p>
								Łącznie: <span>{fullPrice}zł</span>
							</p>
						</div>
					</>
				) : (
					<p className={classes.error}>Nic tu nie ma...</p>
				)}
			</div>
		</div>
	)
}
