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
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artistName}`)
        .then(res=>res.json())
        .then(data=>{

            data.data.forEach(e=>{
                idArray.push(e.id)
            })
            console.log(idArray)
            console.log(data.data)
        }).then(
            fetch(`https://api.artic.edu/api/v1/artworks?q=${artistName}ids=${idArray}`)
            .then(res=>res.json())
            .then(data=>{
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
                    {artistInfo.map(e=>{
                        return (
                            <ArtPieceContainer>
        

                            </ArtPieceContainer>             
                        )
                    })}

                </Content>
            </>
        )
    }

}

const Content = styled.div``

const ArtPieceContainer = styled.div``