import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Line } from "./GlobalStyles"

export const ArtistDetails = () => {
    const artistName = (useParams().name)
    const [artistInfo, setArtistInfo] = useState(null);


    useEffect(()=>{

        // this particular fetch returns very small low quality thumbnail images for each artwork
        // to work around this, the artwork ids returned from the first fetch are pushed to an
        // array, and then used to in a second fetch to retrieve images
        let idArray = []
        let idk = ''

        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artistName}`)
        .then(res=>res.json())
        .then(data=>{
            data.data.forEach(e=>{
                idArray.push(e.id)
            })
            console.log(data.data)
        }).then(
            fetch(`https://api.artic.edu/api/v1/artworks?ids=${idArray.join(',')}
            &fields=title,id,image_id,date_display,category_titles`)
            .then(res=>res.json())
            .then(data=>{
                console.log(idArray.join(','))
                console.log(data)
                setArtistInfo(data.data)
            })
        )
    }, [])

    if (artistInfo) {
        return (
            <>
                <h1>{artistName}</h1>
                <Line/>
                <Content>
                    {artistInfo.map(element=>{
                        return (
                            <ArtPieceContainer>
                                <Image src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`}/>
                                <div>{element.title} ({element.date_display})</div>
                                <div>{element.category_titles.map(e=>{
                                    return <span className='categories'> {e} </span>
                                })}</div>
                                <Line/>
                            </ArtPieceContainer>             
                        )
                    })}

                </Content>
            </>
        )
    } else {
        return (
            <div> LOADING </div>
        )
    }

}

const Content = styled.div``

const ArtPieceContainer = styled.div`
width: 400px;
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;

.categories {
    :not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        margin-right: 5px;
    }
}`

const Image = styled.img`
width: 100%;`