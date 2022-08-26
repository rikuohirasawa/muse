import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ViewSampleArt = () => {
    // local state to prevent re-render when context updates
    const [sampleArt, setSampleArt] = useState([]);
    
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/artwork/${id}`)
    }
    
    useEffect(()=>{
        fetch('/api/sample-art')
            .then(res=>res.json())
            .then((data)=>{
                console.log(data.data)
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
                                    <div>{element.title}</div>
                                    {element.artist_titles.length === 0 ? 
                                    <ArtistName>Unknown</ArtistName>
                                    :
                                    element.artist_titles.map(e=>{
                                    return <ArtistName>{e}</ArtistName>
                                })}
                                    <Line/>
                                    <div>{element.date_display}</div>
                                    <div>{element.place_of_origin}</div>
                                        {element.category_titles.length > 0 &&
                                        <>
                                            <Line/>
                                            {element.category_titles.map(e=>{
                                            return <div> {e} </div>               
                                        })}
                                        </>
                                        }
                                </InformationContainer>
                                <Image 
                                src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`} 
                                alt={element.thumbnail && element.thumbnail.alt_text} onClick={()=>{handleClick(element.id)}}/>
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
    gap: 4rem;
`

const Image = styled.img`
    max-height: 80vh;
    
    cursor: pointer;
`

const InformationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;`

const ArtistName = styled.div``

const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 4px 0;`