import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation'
import 'swiper/components/pagination'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { LoadingScreen } from "./LoadingScreen"

SwiperCore.use([Navigation, Pagination])
// carousel
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
                console.log(data)
                setSampleArt(data.data)
            }).catch(err =>{ console.log (err.message)})
    }, []);
    
    if (sampleArt.length > 0) {
        return (
            <Container>
            <Swiper navigation slidesPerView={1}>
              {sampleArt.map((element)=>{
                    if (element.image_id) {
                    return (
                        <SwiperSlide tag='li'>
                            <Content>
                                <InformationContainer>
                                    <div>{element.title}</div>
                                    {element.artist_titles.length === 0 ? 
                                    <div>Unknown</div>
                                    :
                                    element.artist_titles.map(e=>{
                                    return <Link to={`/artist/${e}`} style={{color: 'inherit'}}>{e}</Link>
                                })}
                                    <Line/>
                                    <div>{element.date_display}</div>
                                    <div>{element.place_of_origin}</div>
                                        {element.category_titles.length > 0 &&
                                        <>
                                            <Line/>
                                            {element.category_titles.map(e=>{
                                            return <Link to={`/collection/${e}`} style={{color: 'inherit'}}> {e} </Link>               
                                        })}
                                        </>
                                        }
                                </InformationContainer>
                                {element.image_id ?
                                 <Image 
                                 src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`}
                                 alt={element.thumbnail ? element.thumbnail.alt_text : 'No alt text provided by API, sorry 🙁'}
                                onClick={()=>{handleClick(element.id)}}/>
                                :
                                <div onClick={()=>{handleClick(element.id)}} style={{cursor: 'pointer'}}>No image provided</div>
                                }       
                            </Content>
                            </SwiperSlide>)}})}
                            </Swiper>
            </Container>
                    
            )} else {
                return (
                <LoadingScreen/>
                )
            }
}


const Container = styled.div`

.swiper-container {
    max-width: 90vw;
}

.swiper-button-prev,
.swiper-button-next {
    color: inherit;
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
    justify-content: space-evenly;
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
    gap: 6px;
    `

const Line = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin: 4px 0;
    `