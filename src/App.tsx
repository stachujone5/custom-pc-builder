import { useContext, useState } from 'react'
import { Cart } from './components/cart/Cart'
import { Form } from './components/form/Form'
import { Hero } from './components/hero/Hero'
import { Modal } from './components/modal/Modal'
import classes from './App.module.scss'

export const App = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openCart = () => {
		setIsOpen(true)
	}

	const closeCart = () => {
		setIsOpen(false)
	}
	return (
		<>
			<main className={classes.main}>
				<Hero />
				<div className={classes['form-body']}>
					<Form />
				</div>
				<Cart onClick={openCart} />
			</main>
			{isOpen && <Modal onClick={closeCart} />}
		</>
	)
}
