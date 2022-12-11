const db = require('../config/database');
const axios = require('axios').default;

exports.getCatalogue = async (req, res) => {
    const datas = await (await axios.get('https://kitsu.io/api/edge/manga?sort=popularityRank&page[limit]=20')).data.data;
    let catalogue = []
    datas.forEach(manga => {
        const m = {
            "id":manga["id"],
            "title": manga['attributes']['titles']['en_jp'],
            "startDate": manga['attributes']['startDate'],
            "synopsis": manga['attributes']['synopsis'],
            "coverImage": manga['attributes']['posterImage']['small'],
            "popularityRank": manga['attributes']['popularityRank']
        }
        catalogue.push(m)
    });
    res.send(catalogue);
}

exports.getChapter = async (req, res) => {
    const mangaTitle = req.params.manga;
    const numberChapter = req.params.number;
    console.log(mangaTitle, numberChapter);
    let urlScan = "http://192.168.1.82:8000/images/";
    let chapter = [];
    for(let i=1;i<=16;i++){
        if(i<=9){
            chapter.push({uri:urlScan + "0"+ i + ".png"});
        }
        else{
            chapter.push({uri:urlScan + i + ".png"});
        }
    }
    res.json(chapter);
}