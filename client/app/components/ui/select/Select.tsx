import { FC } from 'react'
import ReactSelect, {
	MultiValue,
	OnChangeValue,
	SingleValue,
} from 'react-select'
import makeAnimated from 'react-select/animated'

import formStyles from '../form-elements/form.module.scss'

import { IOption, ISelect } from './select.interface'
import styles from './select.module.scss'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	field,
	options,
	placeholder,
	error,
	isLoading,
	isMulti,
}) => {
	const onChange = (
		newValue: MultiValue<string | IOption> | SingleValue<string | IOption>
	) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ''
		}
	}
	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					options={options}
					value={getValue()}
					isMulti={isMulti}
					onChange={onChange}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			{error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	)
}

export default Select
