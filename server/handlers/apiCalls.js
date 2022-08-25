const request = require('request-promise');

const getArtIds = async (req, res) => {
    const options = {
        uri: 'https://api.artic.edu/api/v1/artworks/129884',
        headers: {
            'Accept': 'application/json'
        }
    }
    const result = await JSON.parse(await request(options))
    res.status(200).json({
        status: 200,
        data: result
    })
}

module.exports = {getArtIds}

