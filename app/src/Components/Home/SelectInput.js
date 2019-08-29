import React from 'react';
import Form from 'react-bootstrap/Form';

const SelectInput = ({label, selections, handleChange, value}) => {
    
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" name={label} value={value} onChange={handleChange}>
                <option>Select</option>
                { selections.map((selection, idx) => {
                    return <option key={`${selection}-${idx}`}>{selection}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectInput;