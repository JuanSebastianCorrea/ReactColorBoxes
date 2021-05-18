import React from 'react';
import './Box.css'
const Box = ({ id, color, width, height, removeBox }) => {
	return (<>
                <div className="Box" style={{ backgroundColor: color, width, height }} >
                </div>
                <button onClick={() => removeBox(id)} >X</button>
            </>
    );
};

export default Box;
