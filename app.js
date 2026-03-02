import express from 'express'
import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

// ✅ Set views directory dengan path absolut
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// ✅ Gunakan built-in body parser (lebih modern)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ✅ Path database absolut (penting saat deploy)
const whitelistPath = path.join(__dirname, 'database', 'whitelist.json')

// Pastikan folder database ada
if (!fs.existsSync(path.join(__dirname, 'database'))) {
    fs.mkdirSync(path.join(__dirname, 'database'))
}

// Pastikan file whitelist ada
if (!fs.existsSync(whitelistPath)) {
    fs.writeFileSync(whitelistPath, '[]')
}

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

    if (number && !list.includes(number)) {
        list.unshift(number)
        saveWhitelist(list)
    }

    res.json({ success: true, numbers: list })
})

app.delete('/api/whitelist/:index', (req, res) => {
    const index = parseInt(req.params.index)
    const list = getWhitelist()

    if (!isNaN(index) && index >= 0 && index < list.length) {
        list.splice(index, 1)
        saveWhitelist(list)
    }

    res.json({ success: true, numbers: list })
})

app.listen(port, () => {
    console.log(chalk.cyan(`\n🌐 Server management running on http://localhost:${port}`))
})
