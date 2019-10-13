import React from 'react';
import Form from 'react-bootstrap/FormControl';
import TextInput from '../Common/TextInput';
import SelectInput from '../Common/SelectInput';
import Button from 'react-bootstrap/Button';
import {newTeam} from './ManageTeamPage';
import uuid from 'uuid';




const TeamForm = ({
    team,
    usernameList,
    handleSubmit,
    handleChange,
    saving = false,
    handleDeleteClick,
}) => {
    
    return (
        <>
            <TextInput formLabel={'Team Name'} formType={'text'} handleChange={handleChange('name')} value={team.name} name={'name'} placeholder= {'Enter Team Name'} />
            <h2>Admins</h2>
            {team.admins.map((user) => {
                return (
                    <div key={uuid.v4()} >
                        <p>{user.username}
                        <Button onClick={handleDeleteClick('admins',user.id)}> - </Button> </p>
                    </div>
                )
            })}

            <SelectInput label={'Admin'} selections={usernameList} handleChange={handleChange('admins')} name={'admins'} value={''}/>
            
            <h2>Users</h2>
            {team.users.map((user) => {
                return (
                    <div key={uuid.v4()}>
                        <p>{user.username}
                        <Button onClick={handleDeleteClick('users', user.id)}> - </Button></p>
                    </div>
                )
            })}

            <SelectInput label={'User'} selections={usernameList} handleChange={handleChange('users')} name={'users'} value={''}/>


            <Button disabled={saving} onClick={handleSubmit}>Save</Button>
        </>
    )
}

export default TeamForm;