import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"


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
            <Container>
            <Swiper slidesPerView={1}>
              {sampleArt.map((element, index)=>{
                    if (element.image_id) {
                    return (
                        <SwiperSlide>
                            <Content>
                                <InformationContainer>
                                    <div>{element.title}</div>
                                    {element.artist_titles.length === 0 ? 
                                    <div>Unknown</div>
                                    :
                                    element.artist_titles.map(e=>{
                                    return <Link to={`/artist/${e}`} style={{color: '#fff'}}>{e}</Link>
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
                                {console.log(element.thumbnail.alt_text)}
                                <Image 
                                src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`} 
                               onClick={()=>{handleClick(element.id)}}/>
                            </Content>
                            </SwiperSlide>)}})}
                            </Swiper>
            </Container>
                    
            )}
                            }


// alt={element.thumbnail && element.thumbnail.alt_text}
const Container = styled.div`

/* display: flex;
align-items: center;
justify-content: center; */

.swiper-slide {
    /* display: 'flex'; 
    flex-direction: 'column';
    justify-content: 'center';
    align-items: 'center'; */
    height: '100%';
}

.swiper-container {

}

.swiper-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
}
`
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: auto;

`

const Image = styled.img`
    max-height: 80vh;
    
    cursor: pointer;
`

const InformationContainer = styled.div`
    width: 100%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    gap: 6px;`

const div = styled.div``

const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 4px 0;`