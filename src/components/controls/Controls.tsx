import { LegacyRef } from 'react'
import classes from './Controls.module.scss'

interface ControlsProps {
	id: string
	type: string
	label: string
	min?: number
	error: boolean | undefined
	reference: LegacyRef<HTMLInputElement> | undefined
}

export const Controls = ({ id, type, label, min = 0, error, reference }: ControlsProps) => {
	return (
		<div className={classes.controls}>
			<label htmlFor={id}>{label}</label>
			{type === 'number' ? (
				<input
					type={type}
					className={classes.input}
					ref={reference}
					min={min}
					style={{ border: `2px solid ${error ? 'red' : 'transparent'}` }}
				/>
			) : (
				<input
					type={type}
					className={classes.input}
					ref={reference}
					style={{ border: `2px solid ${error ? 'red' : 'transparent'}` }}
				/>
			)}
		</div>
	)
}
