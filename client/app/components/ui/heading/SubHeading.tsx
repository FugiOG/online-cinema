import { FC } from 'react'

const SubHeading: FC<{ title: string }> = ({ title }) => {
	return (
		<h1 className="text-white text-xl mb-5 text-opacity-80 font-semibold">
			{title}
		</h1>
	)
}

export default SubHeading
