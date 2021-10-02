const axios = require('axios')
const fs = require('fs')

let lines = []
const rules = {}

async function getRules() {
    //function to get data from the internet using axios
    async function getData () {
        return axios.get('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')

    }
    async function parseLines(lines) {
        //go through each line
        lines.forEach(line => {

            //Get the key of each line by splitting by space and taking the first item
            key = line.split(" ")[0]
            //Check that the key is not a word
            if(!key.match(/^[0-9]/)){
                return
            }
            //Check that the key does not already exist in our object
            if(rules[key] != null){
                return
            }

            //Get chapters by matching single digit keys. for example "1."
            if(key.match(/^[1-9]?\./)){
                rules[key] = {
                    chapter: line.replace('\r','')
                }
            }
            //Get sections by matching three digit keys for example "101."
            if(key.match(/^[0-9]{3}\.$/)){
                rules[key[0]+'.'][key] = {
                    section: line.replace('\r','')
                }
            }
            //Get rules by mathing keys that have a key that starts with a section and then some more characters
            if(key.match(/^[0-9]{3}\../)){
                rules[key[0]+'.'][key.substring(0,4)][key] = {
                    rule: line.replace('\r','')
                }
            }      
        })
    }


    getData()
    .then(res => {
        lines = res.data.split('\n')
        parseLines(lines)
        console.log('juu')
        console.log(rules['1.'])
        
    }
    )
    let value = await Promise.resolve(rules)
        return value
}


module.exports = {getRules}