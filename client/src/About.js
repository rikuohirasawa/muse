import styled from "styled-components"
import {AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai'

export const About = () => {
    return (
        <Wrapper>
            <div>
            <h3>Hello,</h3>
            <div>Thank you for checking out Muse!</div>
            <div>
            </div>
            <div>
                I hope you like what you see so far - I created Muse as my final 
                project for Concordia Bootcamps, but this website is intended for anyone and everyone. Whether
                you are an artist, hobbyist, collector or just wanted to see something cool - I hope something caught your eye.
            </div>
            <div>...and if it didn't, remember I only made the website, not the art 😅</div>
            
            <div style={{paddingTop: '24px'}}>
                <div>Muse is a full-stack project, with the frontend using React.js and the backend Node.js and MongoDB.</div>
                <div>If you'd like to see the guts of the project, you are welcome to check out my GitHub. You can also
                    contact me via the information below.
                </div>
                <div>Otherwise, have fun exploring!</div>
            </div>
            <div>- Rikuo</div>
            </div>


            <div>
                <div>Email: rikuoh84@gmail.com</div>
                <div>Phone: (709)730-5377 </div>
            </div>

            <IconLinks>
                <ExternalLink href='https://www.linkedin.com/in/rikuo-hirasawa-5085b9229/'><AiOutlineLinkedin/></ExternalLink>
                <ExternalLink href='https://github.com/rikuohirasawa?tab=repositories'><AiOutlineGithub/></ExternalLink>
            </IconLinks>
        </Wrapper>
    )

}

const Wrapper = styled.div`
padding: 40px;
display: flex;
flex-direction: column;
gap: 24px;`


const ExternalLink = styled.a`
color: inherit;
text-decoration: none;
transition: all .1s ease-in-out;
&:hover,
&:focus {
    transform: scale(1.2)
}
font-size: 2rem;
`

const IconLinks = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`