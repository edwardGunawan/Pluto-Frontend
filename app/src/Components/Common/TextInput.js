import React from 'react';
import Form from 'react-bootstrap/Form';

const TextInput = ({formLabel, formType, value, handleChange, name, placeholder}) => {
    return (
        <Form.Group controlId="formGroup">
            <Form.Label>{formLabel}</Form.Label>
            <Form.Control type={formType} value={value} onChange={handleChange} name={name} placeholder={placeholder} />
        </Form.Group>
    )
}

export default TextInput;