import styled from "styled-components"
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { LikeButton } from "./LikeButton"
import { Line, LinkPath } from "./GlobalStyles"


export const SearchCollection = () => {
    const navigate = useNavigate();
    const searchTarget = useParams().search;
    const [searchInfo, setSearchInfo] = useState(null);
    const [renderPage, setRenderPage] = useState(false);
    console.log(searchTarget)

    const onClickCategory = () => {
        setRenderPage(!renderPage);
    }

    useEffect(()=>{
        // this particular fetch returns very small low quality thumbnail images for each artwork
        // to work around this, the artwork ids returned from the first fetch are pushed to an
        // array, and then used in a second fetch to retrieve images
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${searchTarget}`)
        .then(res=>res.json())
        .then(data=>{
            let idArray = []
            data.data.forEach(e=>{
                idArray.push(e.id)
            })
            return idArray
        }).then((ids)=> {
            fetch(`https://api.artic.edu/api/v1/artworks?ids=${ids.join(',')}
            &fields=title,id,image_id,date_display,category_titles,artist_title`)
            .then((res)=>{
                if (!res.ok) {
                    throw new Error
                }
                return res.json()
            })
            .then(data=>{
                setSearchInfo(data.data)
            })
        }).catch(err => {
            console.log(err)
        })
    }, [renderPage, searchTarget])

    if (searchInfo) {
        return (
            <>
                <h1>{searchTarget.charAt(0).toUpperCase() + searchTarget.slice(1)}</h1>
                <Line/>
                <Content>
                {searchInfo.map((element, index)=>{
                        return (
                            <ArtPieceContainer >
                                <ImageContainer>
                                <LikeButton 
                                style={{margin: '0 10px -30px 0',
                                zIndex: '2'}}
                                id={element.id} 
                                />
                                <Image 
                                src={`https://www.artic.edu/iiif/2/${element.image_id}/full/843,/0/default.jpg`}
                                onClick={()=>{navigate(`/artwork/${element.id}`)}}/>
                                </ImageContainer>
                             
                                <div>{element.title} ({element.date_display})</div>
                                <LinkPath to={`/artist/${element.artist_title}`}>{element.artist_title}</LinkPath>
                                <div>{element.category_titles.map(e=>{
                                    return <LinkPath to={`/collection/${e}`} onClick={()=>onClickCategory()} className='categories'> {e} </LinkPath>
                                })}</div>
                                {/* <Line/> */}
                            </ArtPieceContainer>             
                        )
                    })}
                </Content>
            </>
        )
    }

}

const Content = styled.div`
    display: grid;

    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: dense;
    align-items: flex-start;
    height: auto;
    grid-column-gap: -1rem;
    grid-row-gap: 0rem;

    `

const ArtPieceContainer = styled.div`
width: 400px;
height: fit-content;
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
gap: 8px;
margin: 0;

.categories {
    :not(:last-child) {
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        margin-right: 5px;
    }
}`

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const Image = styled.img`
width: 100%;
cursor: pointer;`
