const axios = require('axios')
const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors())

function parseLines(lines) {
  const rules = {}
  //go through each line
  lines.forEach(line => {

      //Get the key of each line by splitting by space and taking the first item
      const key = line.split(" ")[0]
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
              chapterName: line.replace('\r',''),
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
              rule: line.replace('\r','').substr(line.replace('\r','').indexOf(" ") + 1),
              ruleKey: key
          }
      }
      
  })
  return rules
}


app.get('/rules', (req, res) => {
    axios.get('https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt')
    .then(response => {

    const lines = response.data.split('\n')
    rules = parseLines(lines)
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(rules))
    })



})
app.get('/', (req, res) => {
    res.send('Hello')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
