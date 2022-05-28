import React from 'react'
import "./style.css"

function PopoverComponent({ title, content }) {
	return (
		<div className='content-popover'>
			{title && (
				<p>{title}</p>
			)}
			<div>
				{content}
			</div>
		</div>
	)
}

export default PopoverComponent