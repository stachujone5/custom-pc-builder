import classes from './Controls.module.scss'

interface ControlsProps {
	id: string
	type: string
	label: string
}

export const Controls = ({ id, type, label }: ControlsProps) => {
	return (
		<div className={classes.controls}>
			<label htmlFor={id}>{label}</label>
			<input type={type} className={classes.input} />
		</div>
	)
}
