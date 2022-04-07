import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import classes from './ModalBody.module.scss'

interface ModalBodyProps {
	view: string
}

export const ModalBody = ({ view }: ModalBodyProps) => {
	const { cart, setCart, temporary, setTemporary } = useContext(CartContext)

	const handleItemRemove = (id: string) => {
		const newCart = cart.filter(item => item.id !== id)

		localStorage.setItem('cart', JSON.stringify(newCart))

		setCart(newCart)
		setTemporary(newCart)
	}

	if (view === 'table') {
		return (
			<table className={classes.table}>
				<thead>
					<tr>
						<th className={classes.column}>Rodzaj sprzętu:</th>
						<th className={classes.column}>Model:</th>
						<th className={classes.column}>Cena:</th>
						<th className={classes.column}>Kategoria:</th>
					</tr>
				</thead>
				<tbody>
					{temporary.map(item => {
						return (
							<tr>
								<td className={classes.td}>{item.gear}</td>
								<td className={classes.td}>{item.model}</td>
								<td className={classes.td}>{item.price} zł</td>
								<td className={classes.td}>{item.category}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		)
	}

	return (
		<div className={classes['modal-body']}>
			{temporary.map(item => {
				return (
					<div className={classes.item} key={item.id}>
						<div className={classes.cell}>
							<h3 className={classes.title}>Rodzaj sprzętu:</h3>
							<p>{item.gear}</p>
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Model:</h3>
							<p>{item.model}</p>
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Cena:</h3>
							<p>{item.price} zł</p>
						</div>
						<div className={classes.cell}>
							<h3 className={classes.title}>Kategoria:</h3>
							<p>{item.category}</p>
						</div>
						<button className={classes.btn} onClick={() => handleItemRemove(item.id)}>
							Usuń
						</button>
					</div>
				)
			})}
		</div>
	)
}
