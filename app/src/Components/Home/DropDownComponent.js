import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import uuid from 'uuid';

const DropDownComponent = ({teams=[], eventKey, handleSelect}) => {
    return (
        <>
            <DropdownButton
                alignRight
                title= {eventKey}
                id="dropdown-menu-align-right"
              >
              {teams.length > 0 && teams.map(({name}) => {
                return (
                      <Dropdown.Item eventKey={name} key={uuid.v4()} onSelect ={eventKey => handleSelect(eventKey)}>{name}</Dropdown.Item>
                    )
              })}
            </DropdownButton>
        </>
    )
}

export default DropDownComponent;