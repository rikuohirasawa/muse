// import { useContext } from "react";
// import { UserContext } from "./UserContext";

export const addToFavorites = (email, id, dispatch) => {
    // const {dispatch} = useContext(UserContext);
    console.log('testing addtofavs')
    fetch('/user/update-favorites', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            email: email,
            artworkId: id
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        const { favorites } = data.data.value
        dispatch({type: 'update-user-favorites', favorites: [...favorites, id]})
    })      
    .catch(err=>console.log(err.message))
}

export const deleteFavorite = (email, id, dispatch) =>{
    console.log('testing deletefavs')
    fetch('/user/delete-favorite', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            email: email,
            artworkId: id
        })
    }).then(res=>res.json())
    .then(data=>{
        const { favorites } = data.data.value
        dispatch({type: 'update-user-favorites', favorites: favorites})
    })      
    .catch(err=>console.log(err.message))
}