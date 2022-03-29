const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const main = async ()=>{
    let response = await axios.get('https://rickandmortyapi.com/api/character');
    //console.log(response);
    let {data: {results}} = response;
    //console.log(results);
    let characters = results.map((character)=>{
        return{
            id:character.id,
            name:character.name,
            status:character.status,
            species:character.species
        }
    })
    .map(content => Object.values(content).join(','))
    .join('\n');

    let titles = Object.keys(results[0]).slice(0,4).join(',');
    
    await fs.writeFile(path.join(__dirname, 'data.csv'),titles +'\n'+ characters )

    //console.log(path.join(__dirname, 'data.csv'));
//    console.log(titles +'\n'+ characters);
//    console.log(characters);

}

main();