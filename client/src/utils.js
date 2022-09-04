

export const addToFavorites = (email, id, dispatch) => {
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
        const { favorites } = data.data.value
        dispatch({type: 'update-user-favorites', favorites: [...favorites, id]})
    })      
    .catch(err=>console.log(err.message))
}

export const deleteFavorite = (email, id, dispatch) =>{
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

export const followUser = (email, followEmail) => {
    console.log('testing followuser')
}