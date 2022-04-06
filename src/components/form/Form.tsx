import classes from './Form.module.scss'

export const Form = () => {
	return (
		<form className={classes.form}>
			<div className={classes['form-column']}>
				<label htmlFor='gear' className={classes.label}>
					Rodzaj sprzętu
				</label>
				<input type='text' className={classes.input} id='gear' />
			</div>
			<div className={classes['form-column']}>
				<label htmlFor='model' className={classes.label}>
					Model
				</label>
				<input type='text' className={classes.input} id='model' />
			</div>
			<div className={classes['form-column']}>
				<label htmlFor='price' className={classes.label}>
					Cena
				</label>
				<input type='number' className={classes.input} id='price' />
			</div>
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
