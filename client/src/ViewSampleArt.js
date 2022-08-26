import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'


import { useEffect, useContext, useState } from "react"

import { ArtContext } from "./ArtContext"

export const ViewSampleArt = () => {
    // local state to prevent re-render when context updates
    const [sampleArt, setSampleArt] = useState([]);
    
    useEffect(()=>{
        fetch('/api/sample-art')
            .then(res=>res.json())
            .then((data)=>{
                console.log('run')
                setSampleArt(data.data)
            })
    }, []);
    if (sampleArt.length > 0) {
        return (
            <>
            <Swiper slidesPerView={1}>
                {sampleArt.map(element=>{
                    return (
                        <SwiperSlide style={{
                            display: 'flex', 
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid red',
                            height: '100vh'
                            }}>
                            <Image src={`https://www.artic.edu/iiif/2/${element[0].image_id}/full/843,/0/default.jpg`} alt={element[0].thumbnail && element[0].thumbnail.alt_text}/>
                            <InformationContainer>
                            {element[0].artist_titles.length === 0 ? 
                                <ArtistName>Unknown</ArtistName>
                            :
                            element[0].artist_titles.map(e=>{
                                return <ArtistName>{e}</ArtistName>
                            })}
                            </InformationContainer>
                        </SwiperSlide>
                    )
                })}
            </Swiper>       
            </>
        )
    }
}


const Image = styled.img`
    max-height: 80vh;
`

const InformationContainer = styled.div``

const ArtistName = styled.div``