import classes from './Modal.module.scss'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalBody } from '../modal_body/ModalBody'
import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Filter } from '../filter/Filter'
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from 'react-icons/ai'

interface ModalProps {
	closeCart: () => void
}

export const Modal = ({ closeCart }: ModalProps) => {
	const [view, setView] = useState('column')
	const [isError, setIsError] = useState(false)

	const { temporary, setTemporary, setCart } = useContext(CartContext)

	const handleTable = () => {
		setView('table')
	}
	const handleColumn = () => {
		setView('column')
	}

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
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<div className={classes['modal-header']}>
					<h2 className={classes.title}>Koszyk</h2>
					<div>
						{view === 'column' ? (
							<button className={classes.btn} aria-label='Widok tabelaryczny' onClick={handleTable}>
								<AiOutlineColumnWidth />
							</button>
						) : (
							<button className={classes.btn} aria-label='Widok Kolumnowy' onClick={handleColumn}>
								<AiOutlineColumnHeight />
							</button>
						)}
						<button className={classes.btn} aria-label='Zamknij koszyk' onClick={closeCart}>
							<IoCloseSharp />
						</button>
					</div>
				</div>
				<Filter />
				{temporary.length ? (
					<>
						<ModalBody setIsError={setIsError} view={view} />
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
					</>
				) : (
					<p className={classes.error}>Nic tu nie ma...</p>
				)}
				{isError && <p className={classes.invalid}>Wprowadź poprawne wartości!</p>}
			</div>
		</div>
	)
}
