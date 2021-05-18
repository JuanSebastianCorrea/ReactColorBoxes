import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BoxList from './BoxList';

it('renders without crashing', function() {
	render(<BoxList />);
});

it('matches snapshot', function() {
	const { asFragment } = render(<BoxList />);
	expect(asFragment()).toMatchSnapshot();
});

function addBox(boxList, height = '200px', width = '200px', color = 'peachpuff') {
	const heightInput = boxList.getByLabelText('Height');
	const widthInput = boxList.getByLabelText('Width');
	const colorInput = boxList.getByLabelText('Color');
	fireEvent.change(colorInput, { target: { value: color } });
	fireEvent.change(widthInput, { target: { value: width } });
	fireEvent.change(heightInput, { target: { value: height } });
	const addBtn = boxList.getByText('Add Box');
	fireEvent.click(addBtn);
}

it('can add a new box', function() {
	const boxList = render(<BoxList />);

	expect(boxList.queryByText('X')).not.toBeInTheDocument();
	addBox(boxList);
	const removeBtn = boxList.getByText('X');
	expect(removeBtn).toBeInTheDocument();
	expect(removeBtn.previousSibling).toHaveStyle(`width: 200px;
                                                   height: 200px;
                                                   background-color: peachpuff;`);

	// expect form to be empty
	expect(boxList.getAllByDisplayValue('')).toHaveLength(3);
});

it('can remove a box', function() {
	const boxList = render(<BoxList />);
	addBox(boxList);

	// make sure there is a box by looking for its remove button
	const removeBtn = boxList.getByText('X');
	expect(removeBtn).toBeInTheDocument();

	fireEvent.click(removeBtn);
	expect(removeBtn).not.toBeInTheDocument();
});
