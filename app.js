import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ⚠️ IMPORTANT:
// Vercel filesystem itu ephemeral.
// File write tidak akan permanen setelah cold start.

const whitelistPath = path.join(__dirname, 'database', 'whitelist.json')

// Safe read
function getWhitelist() {
    try {
        if (!fs.existsSync(whitelistPath)) return []
        return JSON.parse(fs.readFileSync(whitelistPath, 'utf8'))
    } catch {
        return []
    }
}

// Safe write
function saveWhitelist(data) {
    try {
        fs.writeFileSync(whitelistPath, JSON.stringify(data, null, 2))
    } catch (err) {
        console.log("Write error:", err.message)
    }
}

app.get('/', (req, res) => {
    res.render('index', { numbers: getWhitelist() })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username === 'admin' && password === 'admin') {
        return res.json({ success: true })
    }

    res.json({ success: false })
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

// ✅ WAJIB untuk Vercel
export default app
