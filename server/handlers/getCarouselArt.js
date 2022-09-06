const request = require('request-promise');


// new solution I implemented to get around doing 8 seperate api calls please see sampleArt.js for more details
const getCarouselArt = async (req, res) => {
    
const randomArt = [
    104260, 121218, 102234,  48469, 94020,
    212427, 190300,  81539, 197069, 61939,
     25363,  10983,  14977, 145149,  3452,
     62345,   6565,   2582,  93802, 32596,
    156075, 118731,  30839, 151424, 88624,
    136951,  65819,  11024,   4683,  4707,
    121525, 121520,   9793, 135430, 14446
  ]
    try {
    let idArray = []
    for (let i=0; i<10; i++) {
        // get random index, and then splice array to not return the same item multiple times
        const randomIndex = Math.floor(Math.random() * randomArt.length);
        idArray.push(randomArt[randomIndex]);
        randomArt.splice(randomIndex, 1)
    }
    const options = {
        uri: `https://api.artic.edu/api/v1/artworks?ids=${idArray.join(',')}&fields=id,title,artist_titles,category_titles,date_display,place_of_origin,image_id,thumbnail`,
        headers: {
            'Accept': 'application/json'
        }
    }
    const result = await JSON.parse(await request(options));
    if (result) {
        res.status(200).json({
            status: 200,
            data: result
        })
    } else {
        res.status(404).json({
            status: 404,
            message: 'Error fetching carousel art'
        })
    }
} catch(err) {
    res.status(500).json({
        status: 500,
        message: err.message
    })
}
}

module.exports = { getCarouselArt }