import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export const ArtworkDetails = () => {
    const artworkId = parseInt(useParams().id);
    const [artworkDetails, setArtworkDetails] = useState(null);

    useEffect(()=>{
        fetch(`https://api.artic.edu/api/v1/artworks/${artworkId}?
        fields=id,title,artist_titles,category_titles,date_display,
        place_of_origin,image_id,thumbnail,dimensions,material_titles,api_link`)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data.data)
            setArtworkDetails(data.data)
        })
    }, []);
    
    
    if (artworkDetails) {
        return (
            <Content>
                <InformationContainer>
                    <div>{artworkDetails.title}</div>
                    {artworkDetails.artist_titles.length === 0 ?
                    <div>Unknown</div>
                    :
                    artworkDetails.artist_titles.map(e=>{
                        return <div>{e}</div>
                    })}
                    <Line/>
                    <div>{artworkDetails.date_display}</div>
                    <div>{artworkDetails.place_of_origin}</div>
                    {artworkDetails.category_titles.length > 0 &&
                        <>
                            <Line/>
                            {artworkDetails.category_titles.map(e=>{
                                return <div> {e} </div>
                                
                                })}
                        </>
                        }
                    <Line/>
                    <div></div>
                </InformationContainer>
                <ImageContainer>
                    <Image 
                    src={`https://www.artic.edu/iiif/2/${artworkDetails.image_id}/full/843,/0/default.jpg`}
                    alt={artworkDetails.thumbnail && artworkDetails.thumbnail.alt_text}/>
                    <div>{artworkDetails.dimensions}</div>
                </ImageContainer>
              
            </Content>

        )
    }

}

const Content = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ImageContainer = styled.div`
`
const Image = styled.img`
    max-height: 70vh;
`

const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;`

const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 4px 0;`


