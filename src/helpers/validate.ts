export const validate = (
	gear: HTMLInputElement | null,
	model: HTMLInputElement | null,
	price: HTMLInputElement | null
) => {
	const errors = { gear: true, model: true, price: true }

	if (!gear?.value) {
		errors.gear = true
	} else {
		errors.gear = false
	}
	if (!model?.value) {
		errors.model = true
	} else {
		errors.model = false
	}
	if (!price?.value && price) {
		if (+price.value <= 0) {
			errors.price = true
		}
	} else {
		errors.price = false
	}

	return errors
}
