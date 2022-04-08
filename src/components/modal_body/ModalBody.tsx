import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Column } from '../column/Column'
import { Table } from '../table/Table'

interface ModalBodyProps {
	view: string
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalBody = ({ view, setIsError }: ModalBodyProps) => {
	const { cart, setCart, setTemporary, temporary } = useContext(CartContext)

	const handleItemRemove = (id: string) => {
		const newCart = cart.filter(item => item.id !== id)
		const newTempCart = temporary.filter(item => item.id !== id)

		localStorage.setItem('cart', JSON.stringify(newCart))

		setCart(newCart)
		setTemporary(newTempCart)
	}

	if (view === 'table') {
		return <Table handleItemRemove={handleItemRemove} />
	}

	return <Column setIsError={setIsError} handleItemRemove={handleItemRemove} />
}
