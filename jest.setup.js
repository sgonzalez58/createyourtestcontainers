const { PostgreSqlContainer } = require('@testcontainers/postgresql')
const dotenv = require('dotenv')

dotenv.config()

let containerpg
let connectionString

beforeAll(async () => {
    containerpg = await new PostgreSqlContainer()
        .withDatabase('notesdb')
        .start()
    connectionString = containerpg.getConnectionUri()
    process.env.DB_URI = connectionString
})

afterAll(async () => {
    await containerpg.stop()
})

module.exports = { connectionString }