import { useContext, useEffect, useState } from 'react'
import { Cart } from './components/cart/Cart'
import { Form } from './components/form/Form'
import { Hero } from './components/hero/Hero'
import { Modal } from './components/modal/Modal'
import classes from './App.module.scss'
import { CartContext } from './contexts/CartContext'

export const App = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { setCart } = useContext(CartContext)

	const openCart = () => {
		setIsOpen(true)
	}

	const closeCart = () => {
		setIsOpen(false)
	}

	useEffect(() => {
		if (localStorage.getItem('cart')) {
			setCart(JSON.parse(localStorage.getItem('cart')!))
		}
	}, [setCart])
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
