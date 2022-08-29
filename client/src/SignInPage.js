import styled from "styled-components"

export const SignInPage = () => {
    return (
        <SignInForm>
            <Label for='given_name'>First Name</Label>
            <Input type='text' id='given_name' name='given_name'/>
            <Label for='family_name'>Last Name</Label>
            <Input type='text' id='family_name' name='family_name'/>
            <Label for='email'>Email</Label>
            <Input type='email' id='email' name='email'/>
            <Label for='password'>First Name</Label>
            <Input type='password' id='password' name='password'/>
        </SignInForm>
    )

}

const SignInForm = styled.form``

const Input = styled.input``

const Label = styled.label``
