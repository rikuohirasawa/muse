import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'


import { useEffect, useContext } from "react"

import { ArtContext } from "./ArtContext"

export const ViewSampleArt = () => {
    const { dispatch, sampleArt } = useContext(ArtContext);
    
    useEffect(()=>{
        fetch('/api/sample-art')
            .then(res=>res.json())
            .then((data)=>{
                dispatch({type: 'set-sample-art-data', sampleArt: data.data.data})
            })
    }, []);

    if (sampleArt.length > 0) {
        return (
            <>
            <Swiper>
                {sampleArt.map(element=>{
                    return (
                        <SwiperSlide>
                            <img src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`}/>
                        </SwiperSlide>

                    )
                })}
                <SwiperSlide>

                </SwiperSlide>
            </Swiper>
           
            </>

        )
    }

}