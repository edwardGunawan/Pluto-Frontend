import React from 'react';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';
import uuid from 'uuid';
import Button from 'react-bootstrap/Button';

const TeamList = ({teams, handleDelete}) => {
    return (
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                <th>#</th>
                <th>Team Name</th>
                </tr>
            </thead>
            <tbody>
                {teams.map(({id, name}) => {
                    return (
                        <tr key={uuid.v4()}>
                            <td>{id}</td>
                            <td>
                                <Link to={`/teams/${id}`}>{name}</Link>
                            </td>
                            <td>
                                <Button onClick={handleDelete(id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TeamList;