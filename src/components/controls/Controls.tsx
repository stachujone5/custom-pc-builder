import { LegacyRef } from 'react'
import classes from './Controls.module.scss'

interface ControlsProps {
	id: string
	type: string
	label: string
	reference: LegacyRef<HTMLInputElement> | undefined
}

export const Controls = ({ id, type, label, reference }: ControlsProps) => {
	return (
		<div className={classes.controls}>
			<label htmlFor={id}>{label}</label>
			<input type={type} className={classes.input} ref={reference} />
		</div>
	)
}
