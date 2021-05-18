import React, { useState } from 'react';

import Box from './Box';
import NewBoxForm from './NewBoxForm';

const BoxList = () => {
	const INITIAL_STATE = [];
	const [ boxes, setBoxes ] = useState(INITIAL_STATE);

	const addBox = (newBox) => {
		setBoxes((boxes) => [ ...boxes, { ...newBox } ]);
	};

	const removeBox = (id) => {
		setBoxes((boxes) => boxes.filter((box) => box.id !== id));
	};
	return (
		<div className="BoxList">
			<h3>Box List</h3>
			<NewBoxForm addBox={addBox} />
			{boxes.map((box) => (
				<Box
					id={box.id}
					color={box.color}
					width={box.width}
					height={box.height}
					key={box.id}
					removeBox={removeBox}
				/>
			))}
		</div>
	);
};

export default BoxList;
