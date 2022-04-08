import classes from './Modal.module.scss'
import { ModalBody } from '../modal_body/ModalBody'
import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Filter } from '../filter/Filter'
import { ModalFooter } from '../modal_footer/ModalFooter'
import { ModalHeader } from '../modal_header/ModalHeader'

interface ModalProps {
	closeCart: () => void
}

export const Modal = ({ closeCart }: ModalProps) => {
	const [view, setView] = useState('table')
	const [isError, setIsError] = useState(false)
	const [isOptionsOpen, setIsOptionsOpen] = useState(false)
	const { temporary } = useContext(CartContext)

	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<ModalHeader setView={setView} closeCart={closeCart} view={view} setIsOptionsOpen={setIsOptionsOpen} />

				{isOptionsOpen && (
					<div className={classes.options}>
						<Filter className={classes.input} />
					</div>
				)}

				{temporary.length ? (
					<>
						<ModalBody setIsError={setIsError} view={view} />
						<ModalFooter closeCart={closeCart} />
					</>
				) : (
					<p className={classes.error}>Nic tu nie ma...</p>
				)}
				{isError && <p className={classes.invalid}>Wprowadź poprawne wartości!</p>}
			</div>
		</div>
	)
}
