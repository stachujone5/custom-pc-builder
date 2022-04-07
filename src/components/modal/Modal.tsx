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

	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<h2 className={classes.title}>Koszyk</h2>
				<button className={classes.btn} aria-label='Zamknij koszyk' onClick={onClick}>
					<IoCloseSharp />
				</button>
				{cart.length ? <ModalBody /> : <p className={classes.info}>Nic tu nie ma...</p>}
			</div>
		</div>
	)
}
