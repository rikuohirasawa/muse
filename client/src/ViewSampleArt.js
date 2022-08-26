import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


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
                {sampleArt.map((element, index)=>{
                    return (
                        <SwiperSlide key={index} style={{
                            display: 'flex', 
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh'
                            }}>
                            <Content>
                                <InformationContainer>
                                    <div>{element[0].title}</div>
                                    {element[0].artist_titles.length === 0 ? 
                                    <ArtistName>Unknown</ArtistName>
                                    :
                                    element[0].artist_titles.map(e=>{
                                    return <ArtistName>{e}</ArtistName>
                                })}
                                    <Line/>
                                    <div>{element[0].date_display}</div>
                                    <div>{element[0].place_of_origin}</div>
                                        {element[0].category_titles.length > 0 &&
                                        <>
                                            <Line/>
                                            {element[0].category_titles.map(e=>{
                                            return (
                                             <div> {e} </div>                                
                                            )
                                        })}
                                        </>
                                        }
                                </InformationContainer>
                                <Image src={`https://www.artic.edu/iiif/2/${element[0].image_id}/full/843,/0/default.jpg`} alt={element[0].thumbnail && element[0].thumbnail.alt_text}/>
                            </Content>
                        </SwiperSlide>
                    )
                })}
            </Swiper>       
            </>
        )
    }
}

const Content = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`

const Image = styled.img`
    max-height: 80vh;
`

const InformationContainer = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 6px;`

const ArtistName = styled.div``

const Line = styled.div`
width: 100%;
border-bottom: 1px solid rgba(255, 255, 255, 0.3);
margin: 4px 0;`