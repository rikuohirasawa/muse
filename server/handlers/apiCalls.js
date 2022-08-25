const request = require('request-promise');

const getArtIds = async () => {
    const options = {
        uri: 'https://api.artic.edu/api/v1/artworks',
        headers: {
            'Accept': 'application/json'
        }
    }
    const artIds = await request(options)
    return await JSON.parse(artIds)
}

getArtIds().then((data)=>console.log(data))