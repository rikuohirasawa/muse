const request = require('request-promise');

// NOTE: this function is not used for now as making 8 different api calls was making the page load very slowly
// please see getCarouselArt.js for the solution I implemented instead
// this solution would be ideal if it did not affect load times, as it does actually return random pieces of art,
// whereas my new solution pulls from a static array of my own selections 
const getSampleArt = async (req, res) => {
    try {
        // loop to create array of random art pieces
        // without the loop, this will return a random page, however pages are formatted in a way that
        // pieces are grouped by collections, so getting a random page will often times return
        // an array of art that are very similar - array is limited to length of 8 as API throttles
        // at 60 calls/minute (loop is making 8 individual calls)
        let getRandomArtArray = [];
        for (let i=0; i <8; i++) {
            const randomPage = Math.floor(Math.random() * 8000 + 1)
            const options = {
                uri: `https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=1&fields=id,title,artist_titles,category_titles,date_display,place_of_origin,image_id,thumbnail`,
                headers: {
                    'Accept': 'application/json'
                }
            }
            const result = (await JSON.parse(await request(options)))
            getRandomArtArray.push(result.data[0])
        }
        if (getRandomArtArray.length > 0) {
            res.status(200).json({
                status: 200,
                data: getRandomArtArray
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Request failed'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
}

module.exports = { getSampleArt }
