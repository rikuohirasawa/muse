import { useEffect } from "react"

export const ViewSampleArt = () => {
    useEffect(()=>{
        fetch('/api/sample-art')
            .then(res=>res.json())
            .then(data=>console.log(data))
    })
    return (
        <div>hello</div>
    )

}