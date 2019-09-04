import React from 'react';
import Form from 'react-bootstrap/Form';
import uuid from 'uuid';

const SelectInput = ({label, selections, handleChange, value, name}) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" name={name} value={value} onChange={handleChange}>
                <option>Select</option>
                { selections.map((selection) => {
                    return <option key={uuid.v4()}>{selection}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

export default SelectInput;