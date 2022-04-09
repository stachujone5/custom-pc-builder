import { useContext, useEffect, useState } from 'react'
import { Cart } from './components/cart/Cart'
import { Form } from './components/form/Form'
import { Hero } from './components/hero/Hero'
import { Modal } from './components/modal/Modal'
import classes from './App.module.scss'
import { CartContext } from './contexts/CartContext'
import { CategoryModal } from './components/category_modal/CategoryModal'

export const App = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
	const { cart, setCart, setTemporary, setCategories } = useContext(CartContext)

	const openCart = () => {
		setIsOpen(true)
		setTemporary(cart)
	}

	const closeCart = () => {
		setIsOpen(false)
	}

	const handleModal = () => {
		setIsCategoryModalOpen(prevState => !prevState)
	}

	useEffect(() => {
		if (localStorage.getItem('cart')) {
			setCart(JSON.parse(localStorage.getItem('cart')!))
			setTemporary(JSON.parse(localStorage.getItem('cart')!))
		}
		if (localStorage.getItem('categories')) {
			setCategories(JSON.parse(localStorage.getItem('categories')!))
		}
	}, [setCart, setTemporary, setCategories])

	return (
		<>
			<main className={classes.main}>
				<Hero />
				<div className={classes['form-body']}>
					<Form handleModal={handleModal} />
				</div>
				<Cart openCart={openCart} />
			</main>
			{isOpen && <Modal closeCart={closeCart} />}
			{isCategoryModalOpen && <CategoryModal onClick={handleModal} />}
		</>
	)
}
