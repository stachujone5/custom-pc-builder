import classes from './ModalHeader.module.scss'
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from 'react-icons/ai'
import { IoCloseSharp, IoOptionsSharp } from 'react-icons/io5'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

interface ModalHeaderProps {
	closeCart: () => void
	view: string
	setView: React.Dispatch<React.SetStateAction<string>>
	setIsOptionsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalHeader = ({ setView, closeCart, view, setIsOptionsOpen }: ModalHeaderProps) => {
	const { cart } = useContext(CartContext)

	const handleTable = () => {
		setView('table')
	}
	const handleColumn = () => {
		setView('column')
	}
	const handleOpenOptions = () => {
		setIsOptionsOpen(prevState => !prevState)
	}

	return (
		<div className={classes['modal-header']}>
			<h2 className={classes.title}>Koszyk</h2>
			<div>
				{cart.length ? (
					<>
						<button className={classes.btn} aria-label='Pokaż opcje' onClick={handleOpenOptions}>
							<IoOptionsSharp />
						</button>
						{view === 'column' ? (
							<button
								className={`${classes.btn} ${classes.view}`}
								aria-label='Widok tabelaryczny'
								onClick={handleTable}>
								<AiOutlineColumnWidth />
							</button>
						) : (
							<button className={`${classes.btn} ${classes.view}`} aria-label='Widok Kolumnowy' onClick={handleColumn}>
								<AiOutlineColumnHeight />
							</button>
						)}
					</>
				) : null}

				<button className={classes.btn} aria-label='Zamknij koszyk' onClick={closeCart}>
					<IoCloseSharp />
				</button>
			</div>
		</div>
	)
}
