import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Line, LinkPath } from "./GlobalStyles"
import { LikeButton } from "./LikeButton"
import { LoadingScreen } from "./LoadingScreen"

export const ArtistDetails = () => {
    const navigate = useNavigate();
    const [artistInfo, setArtistInfo] = useState(null);
    const artistName = useParams().name



    useEffect(()=>{
        // this particular fetch returns very small low quality thumbnail images for each artwork
        // to work around this, the artwork ids returned from the first fetch are pushed to an
        // array, and then used in a second fetch to retrieve images
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artistName}`)
        .then(res=>res.json())
        .then(data=>{
            let idArray = []
            data.data.forEach(e=>{
                idArray.push(e.id)
            })
            return idArray
        }).then((ids)=> {
            fetch(`https://api.artic.edu/api/v1/artworks?ids=${ids.join(',')}
            &fields=title,id,image_id,date_display,category_titles,artist_title,thumbnail`)
            .then(res=>res.json())
            .then(data=>{
                setArtistInfo(data.data)
            })
        })
    }, [])

        return (
            <>
            <Wrapper>
            <h1>{artistName}</h1>
                <Line/>
                {artistInfo ?         
                <Content>
                    {artistInfo.map((element)=>{
                        return (
                            <ArtPieceContainer>
                            <ImageContainer>
                            <LikeButton 
                                style={{margin: '0 10px -27px 0',
                                zIndex: '2'}}
                                id={element.id}/>
                                <Image 
                                src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`}
                                alt={element.thumbnail.alt_text ? element.thumbnail.alt_text : 'No alt text provided by API, sorry 🙁'}
                                onClick={()=>{navigate(`/artwork/${element.id}`)}}/>
                            </ImageContainer>
                                <div>{element.title} ({element.date_display})</div>
                                <LinkPath to={`/artist/${element.artist_title}`}>{element.artist_title}</LinkPath>
                                <div>{element.category_titles.map(e=>{
                                    return <LinkPath to={`/collection/${e}`} className='categories'> {e} </LinkPath>
                                })}</div>
                                <Line/>
                            </ArtPieceContainer>             
                        )
                    })}
                </Content>
                :
                <LoadingScreen/>
                }
            </Wrapper>
            </>
        )
    }



const Wrapper = styled.div`
    padding: 0 48px;
`
const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    `

const ArtPieceContainer = styled.div`
width: 400px;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
gap: 8px;
.categories {
    :not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        margin-right: 5px;
    }
}`

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const Image = styled.img`
width: 100%;
cursor: pointer;
max-height: 400px;
object-fit: cover;`