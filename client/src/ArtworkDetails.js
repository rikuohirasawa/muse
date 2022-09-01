import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io'
import {Line, LinkPath} from './GlobalStyles'
import { useContext } from "react"
import { UserContext } from "./UserContext"
import { LikeButton } from "./LikeButton"
import { addToFavorites } from "./utils"
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs'



export const ArtworkDetails = () => {
    const artworkId = parseInt(useParams().id);
    const [artworkDetails, setArtworkDetails] = useState(null);
    const [provDisplay, setProvDisplay] = useState(false);
    const [exhibitionDisplay, setExhibitionDisplay] = useState(false);

    const {userInfo, dispatch} = useContext(UserContext);
    
    // const addFavorites = (email, id) => {
    //         fetch('/user/update-favorites', {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }, body: JSON.stringify({
    //             email: email,
    //             artworkId: id
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>dispatch({type: 'update-user-favorites', favorites: data.value.favorites}))
    //     .catch(err=>console.log(err.message))

    // }

    const toggleProvDisplay = () => {
        setProvDisplay(!provDisplay)
    }

    const toggleExhibitionDisplay = () => {
        setExhibitionDisplay(!exhibitionDisplay)
    }

    useEffect(()=>{
        fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?
        fields=id,title,artist_titles,category_titles,date_display,
        place_of_origin,image_id,thumbnail,dimensions,material_titles,api_link,
        publication_history,exhibition_history,provenance_text`)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data.data)
            setArtworkDetails(data.data)
        })
    }, []);
    
    
    if (artworkDetails && userInfo) {
        return (
            <Content>
                <InformationContainer>
                    <div>{artworkDetails.title}</div>
                    {artworkDetails.artist_titles.length === 0 ?
                    <div>Unknown</div>
                    :
                    artworkDetails.artist_titles.map(e=>{
                        return <LinkPath to={`/artist/${e}`}>{e}</LinkPath>
                    })}
                    <Line/>
                    <div>{artworkDetails.date_display}</div>
                    <div>{artworkDetails.place_of_origin}</div>
                    {artworkDetails.category_titles.length > 0 &&
                        <>
                            <Line/>
                            {artworkDetails.category_titles.map(e=>{
                                return <LinkPath to={`/collection/${e}`}> {e} </LinkPath>
                                
                                })}
                        </>
                        }
                    <Line/>
                    <div>{artworkDetails.dimensions}</div>
                    {artworkDetails.material_titles.length > 0 &&
                    artworkDetails.material_titles.map(e=>{
                        return <div>{e}</div>
                    })}
                    <Line/>
                    <ApiLink href={artworkDetails.api_link}>API Link</ApiLink>
                </InformationContainer>
                <ImageContainer>
                {userInfo.profileSetup && 
                <LikeButton 
                style={{margin: '0 10px -35px 0',
                    zIndex: '2'}}
                id={artworkDetails.id} 
                />}
                    <Image 
                    src={`https://www.artic.edu/iiif/2/${artworkDetails.image_id}/full/843,/0/default.jpg`}
                    alt={artworkDetails.thumbnail && artworkDetails.thumbnail.alt_text}/>
                </ImageContainer>
                {artworkDetails.provenance_text || artworkDetails.exhibition_history ?
                <ReadMoreContainer>
                {artworkDetails.provenance_text && 
                <>
                  <div className="provenance" onClick={()=>{toggleProvDisplay()}}>
                    Provenance (History of Ownership)
                    {provDisplay ?
                    <IoIosArrowUp/> 
                    : 
                    <IoIosArrowDown/>
                    }
                    </div>
                  {provDisplay && 
                  <div className='provenance-text'>{artworkDetails.provenance_text}</div>
                  }   
                  <Line/>
                </>
                } {artworkDetails.exhibition_history && 
                <>
                    <div className="exhibition-history" onClick={()=>{toggleExhibitionDisplay()}}>
                        Exhibition History
                        {exhibitionDisplay ?
                        <IoIosArrowUp/> 
                        : 
                        <IoIosArrowDown/>
                        }
                    </div>
                    {exhibitionDisplay && 
                    <>
                    <div className="exhibition-history-text">{artworkDetails.exhibition_history}</div>
                    </>
                    }
                </>
                }
            </ReadMoreContainer>  
                : 
                // conditionally return empty fragment here, as when I implemented the condition using && operator it broke the code,
                // I suspect because of the || operator immediately preceding it?
                <></>
            }

                

            </Content>
        )
    }
}

const Content = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`
const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const ReadMoreContainer = styled.div`
width: 400px;

.provenance,
.exhibition-history {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}

.provenance-text,
.exhibition-history-text {
    margin-top: 8px;
}

`
const Image = styled.img`
    max-height: 70vh;
`

const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;`

const ApiLink = styled.a`
    color: inherit;
`




