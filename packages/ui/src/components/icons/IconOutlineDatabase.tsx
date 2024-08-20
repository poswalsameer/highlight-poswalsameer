import { IconProps } from './types'

export const IconOutlineDatabase = ({ size = '1em', ...props }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill="none"
			viewBox="0 0 24 24"
			focusable="false"
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M6.79 5.066C5.45 5.736 5 6.478 5 7s.449 1.263 1.79 1.934C8.072 9.574 9.912 10 12 10s3.928-.425 5.21-1.066C18.55 8.264 19 7.522 19 7s-.449-1.263-1.79-1.934C15.928 4.426 14.088 4 12 4s-3.928.425-5.21 1.066ZM19 10.201a7.846 7.846 0 0 1-.896.522C16.49 11.53 14.331 12 12 12c-2.33 0-4.49-.47-6.104-1.277A7.842 7.842 0 0 1 5 10.2V12c0 .522.449 1.263 1.79 1.934C8.072 14.574 9.912 15 12 15s3.928-.425 5.21-1.066C18.55 13.264 19 12.522 19 12v-1.8ZM21 7c0-1.687-1.342-2.946-2.896-3.723C16.49 2.47 14.331 2 12 2c-2.33 0-4.49.47-6.104 1.277C4.342 4.054 3 5.313 3 7v10c0 1.687 1.342 2.946 2.896 3.723C7.51 21.53 9.669 22 12 22c2.33 0 4.49-.47 6.104-1.277C19.658 19.946 21 18.687 21 17V7Zm-2 8.2a7.846 7.846 0 0 1-.896.523C16.49 16.53 14.331 17 12 17c-2.33 0-4.49-.47-6.104-1.277A7.842 7.842 0 0 1 5 15.2V17c0 .522.449 1.263 1.79 1.934C8.072 19.574 9.912 20 12 20s3.928-.425 5.21-1.066C18.55 18.264 19 17.522 19 17v-1.8Z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
