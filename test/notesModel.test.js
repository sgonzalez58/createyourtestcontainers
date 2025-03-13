const { Pool } = require("pg");
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require("../models/notesModel")

require('dotenv').config();

jest.setTimeout(30000);

describe("Notes with pg", () => {

    let pool;

    beforeAll(async () => {
        connectionString = process.env.DB_URI
        pool = new Pool({ connectionString })

        jest.mock("../models/notesModel", () => {
            return pool
        })

        await pool.query(`CREATE TABLE notes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    })

    afterAll(async () => {
        await pool.query(`DROP TABLE "notes"`)
        await pool.end()
    })

    afterEach(async () => {
        await pool.query('DELETE FROM notes')
    })

    test("create a note", async() => {
        const note = await createNote('premiere note', 'je teste la premiere fonction')

        const notes = await getNotes();
        expect(notes[0]).toHaveProperty("id")
        expect(notes[0].title).toBe(note.title)
        expect(notes[0].content).toBe(note.content)
    })
})