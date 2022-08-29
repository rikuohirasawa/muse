import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './UserContext';
import { useEffect, useState, useContext } from 'react'

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [placeholderAvatars, setPlaceholderAvatars] = useState(null);
    const {dispatch} = useContext(UserContext);
    
    useEffect(()=>{
        fetch('https://api.artic.edu/api/v1/artworks?ids=35772,126289,94020,212427,190300&fields=image_id')
        .then(res=>res.json())
        .then(data=>setPlaceholderAvatars(data.data))
    },[])

    const saveChanges = (e) => {
        e.preventDefault();
    }
    
    if (placeholderAvatars) {
        return (
            <>
            <h1>Let's set up your profile</h1>
            <ProfileForm>
                <Label for='name'>Name</Label>
                <Input type='text' name='name' id='name' required/>
                <div>Upload an avatar, or choose one below for now (you can change this later).</div>
                <Input type='file' name='avatar' id='avatar'/>
                <div>
                {placeholderAvatars.map(e=>{
                    return (
                        <Placeholder src={`https://www.artic.edu/iiif/2/${e.image_id}/full/843,/0/default.jpg`}/>
                    )
                })}
                </div>
                <Label for='bio'>Bio</Label>
                <Bio name='bio' id='bio'/>  
                <SaveButton type='submit'>Save Changes</SaveButton>
            </ProfileForm>
            </>
        )
    }
}

const ProfileForm = styled.form`
display: flex;
flex-direction: column;`

const Label = styled.label``
const Input = styled.input``

const Bio = styled.textarea``



const Placeholder = styled.img`
width: 140px;
height: 140px;
object-fit: cover;
border-radius: 50%;`

const SaveButton = styled.button`
`