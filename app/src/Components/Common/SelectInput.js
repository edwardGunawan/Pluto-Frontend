import React from 'react';
import Form from 'react-bootstrap/Form';

const SelectInput = ({label, selections, handleChange, value, name}) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" name={name} value={value} onChange={handleChange}>
                <option>Select</option>
                { selections.map((selection, idx) => {
                    return <option key={`${selection}-${idx}`}>{selection}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectInput;