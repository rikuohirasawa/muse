const request = require('request-promise');

const getSampleArt = async (req, res) => {
    const randomPage = Math.floor(Math.random() * 500 + 1)
    const options = {
        uri: `https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=50&fields=id,title,artist_titles,category_titles,date_display,place_of_origin,alt_text,image_id`,
        headers: {
            'Accept': 'application/json'
        }
    }
    try {
        const result = await JSON.parse(await request(options))
        console.log(result)
        if (result.data.length > 0) {
            res.status(200).json({
                status: 200,
                data: result
            })
        } else {
            res.status(400).json({
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
