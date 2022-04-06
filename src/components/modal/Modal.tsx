import classes from './Modal.module.scss'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalBody } from '../modal_body/ModalBody'

interface ModalProps {
	onClick: () => void
}

export const Modal = ({ onClick }: ModalProps) => {
	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<div className={classes['modal-top']}>
					<h2 className={classes.title}>Koszyk</h2>
					<button className={classes.btn} aria-label='Zamknij koszyk' onClick={onClick}>
						<IoCloseSharp />
					</button>
				</div>
				<ModalBody />
			</div>
		</div>
	)
}
