import styled from 'styled-components'
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from './UserContext';
import { useEffect, useState, useContext } from 'react'

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [placeholderAvatars, setPlaceholderAvatars] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const {dispatch} = useContext(UserContext);
    
    useEffect(()=>{
        fetch('https://api.artic.edu/api/v1/artworks?ids=35772,126289,94020,212427,190300&fields=image_id')
        .then(res=>res.json())
        .then(data=>setPlaceholderAvatars(data.data))
    },[]);

    useEffect(()=>{
    // get req for user
    if (isAuthenticated) {
        fetch(`/user/`)
    }
    }, [isAuthenticated])
    console.log(user)
    
    const saveChanges = (e) => {
        e.preventDefault();
        const form = new FormData(document.forms.shipDetailsForm);
        const formObj = {
            email: user.email,
            name: form.get('name'),
            avatarSrc: 'https://www.artic.edu/iiif/2/126289/full/843,/0/default.jpg',
            bio: form.get('bio'),
        }
        fetch('user/update-user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(formObj)
        }).then(res=>res.json())
        .then(data=>dispatch({type: 'set-user-info', userInfo: data.data}))
        .catch(err=>console.log(err.message))
    }
    
    if (placeholderAvatars) {
        return (
            <>
            <h1 style={{textAlign: 'center'}}>Let's set up your profile</h1>
            <ProfileForm id='profileForm' onSubmit={(e)=>{saveChanges(e)}}>
                <div className='container name-container'>
                <Label for='name'>Preferred name</Label>
                <Input type='text' name='name' id='name' className='name-input' required/>
                </div>
                <div>Choose an avatar (you can change this later).</div>
                {/* <Input type='file' name='avatar' id='avatar'/> */}
                <div className='avatar-container'>
                {placeholderAvatars.map(e=>{
                    return (
                        <Placeholder src={`https://www.artic.edu/iiif/2/${e.image_id}/full/843,/0/default.jpg`}/>
                    )
                })}
                </div>
                <div className='container'>
                <Label for='bio'>Add a bio (optional)</Label>
                <Bio name='bio' id='bio'/>  
                </div>
                <SaveButton type='submit'>Save Changes</SaveButton>
            </ProfileForm>
            </>
        )
    }
}



const ProfileForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 1.5rem;


.container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 40%;
    gap: 6px;
}

.name-container {
    width: 20%;
}

.avatar-container {
    display: flex;
    gap: 12px;
}

`

const Label = styled.label``

const Input = styled.input`
font-size: 1.5rem;
font-family: inherit;`

const Bio = styled.textarea`
height: 140px;
font-family: inherit;
font-size: 1.5rem;
resize: none;
`

const Placeholder = styled.img`
width: 140px;
height: 140px;
object-fit: cover;
border-radius: 50%;`

const SaveButton = styled.button`
background: #fff;
border: 1px solid black;
padding: 10px 25px;
font-family: inherit;
font-weight: 700;
font-size: 1.15rem;

cursor: pointer;
transition: all .1s ease-in-out;
&:hover,
&:focus {
    transform: scale(1.05)
};
`