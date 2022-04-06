import { Controls } from '../controls/Controls'
import classes from './Form.module.scss'

export const Form = () => {
    
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form className={classes.form} onClick={handleSubmit}>
			<Controls id='gear' label='Rodzaj sprzętu' type='text' />
			<Controls id='model' label='Model' type='text' />
			<Controls id='price' label='Cena' type='number' />
			<div className={classes['form-column']}>
				<label htmlFor='category' className={classes.label}>
					Kategoria
				</label>
				<select id='category' className={classes.select}>
					<option value='components'>Podzespoły</option>
					<option value='hardware'>Urządzenia peryferyjne</option>
					<option value='software'>Oprogramowanie</option>
					<option value='other'>Inne</option>
				</select>
			</div>
			<button type='submit' className={classes.btn}>
				Dodaj
			</button>
		</form>
	)
}
