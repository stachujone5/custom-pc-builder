import { createContext, useRef, useState } from 'react'

interface CartContextInterface {
	cart: CartItemInterface[]
	setCart: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
	categories: CategoryInterface[]
	setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>
	temporary: CartItemInterface[]
	setTemporary: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
	selectedOption: React.MutableRefObject<string>
}

export const CartContext = createContext<CartContextInterface>({
	cart: [],
	setCart: () => [],
	categories: [],
	setCategories: () => [],
	temporary: [],
	setTemporary: () => [],
	selectedOption: { current: '' },
})

interface CartProviderInterface {
	children: React.ReactNode
}

export interface CartItemInterface {
	gear: string | undefined
	model: string | undefined
	price: string | undefined
	category: string | null | undefined
	id: string
	value: string | undefined
	isEditing: boolean
}

interface CategoryInterface {
	value: string
	text: string
}

const basicCategories = [
	{ value: 'components', text: 'Podzespoły' },
	{ value: 'hardware', text: 'Urządzenia peryferyjne' },
	{ value: 'software', text: 'Oprogramowanie' },
	{ value: 'other', text: 'Inne' },
]

export const CartProvider = ({ children }: CartProviderInterface) => {
	const [cart, setCart] = useState<CartItemInterface[]>([])
	const [temporary, setTemporary] = useState<CartItemInterface[]>([])
	const [categories, setCategories] = useState<CategoryInterface[]>(basicCategories)
	const selectedOption = useRef<string>('')

	return (
		<CartContext.Provider value={{ cart, setCart, categories, setCategories, temporary, setTemporary, selectedOption }}>
			{children}
		</CartContext.Provider>
	)
}
