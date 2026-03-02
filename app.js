import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import chalk from 'chalk'

const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const whitelistPath = './database/whitelist.json'
function getWhitelist() {
    try {
        return JSON.parse(fs.readFileSync(whitelistPath, 'utf8'))
    } catch {
        return []
    }
}
function saveWhitelist(data) {
    fs.writeFileSync(whitelistPath, JSON.stringify(data, null, 2))
}

app.get('/', (req, res) => {
    res.render('index', { numbers: getWhitelist() })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'admin') {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

app.get('/api/whitelist', (req, res) => {
    res.json(getWhitelist())
})

app.post('/api/whitelist', (req, res) => {
    const { number } = req.body
    const list = getWhitelist()
    if (!list.includes(number)) {
        list.unshift(number)
        saveWhitelist(list)
    }
    res.json({ success: true, numbers: list })
})

app.delete('/api/whitelist/:index', (req, res) => {
    const index = parseInt(req.params.index)
    const list = getWhitelist()
    list.splice(index, 1)
    saveWhitelist(list)
    res.json({ success: true, numbers: list })
})

app.listen(port, () => {
    console.log(chalk.cyan(`\n🌐 Server management running on http://localhost:${port}`))
})