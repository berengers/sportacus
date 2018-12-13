import { db } from '../../actions/db'


db.token = () => "admin_token"
db.url = ' http://localhost:5000/api'


describe('TESTING: fetchPrograms', async () => {    


    test('fetchPrograms is define', () => {
        expect(db.fetchPrograms).toBeDefined()
    })

    test('typeof fetchPrograms return "object"', async () => {
        expect.assertions(1)
        const programs = await db.fetchPrograms()
        expect(typeof programs).toEqual('object')
    })

    test('fetchPrograms return a list of object with a key "id"', async () => {
        expect.assertions(1)
        const programs = await db.fetchPrograms()
        expect(typeof programs[0].id).toBe('number')
    })

    test('fetchPrograms with a parameter works -> integer 1', async () => {
        expect.assertions(1)
        const programs = await db.fetchPrograms(1)
        expect(typeof programs).toEqual('object')
    })

    test('fetchPrograms with a parameter works -> string "random"', async () => {
        expect.assertions(1)
        const programs = await db.fetchPrograms("random")
        expect(typeof programs).toEqual('object')
    })
})

describe('TESTING: fetchProgram', async () => {

    test('fetchProgram is define', () => {
        expect(db.fetchProgram).toBeDefined()
    })

    test('typeof fetchProgram(1) return "object"', async () => {
        expect.assertions(1)
        const program = await db.fetchProgram(1)
        expect(typeof program).toEqual('object')
    })

    test('fetchProgram return an object with a key "id"', async () => {
        expect.assertions(1)
        const program = await db.fetchProgram(1)
        expect(typeof program.id).toBe('number')
    })

    // test('fetchProgram with an id dont exist return an error message -> integer 999999', async () => {
    //     // expect.assertions(1)
    //     await expect(db.fetchProgram(999999)).rejects.toEqual('object')
    // })

    // test('fetchProgram with a parameter works -> string "random"', async () => {
    //     const program = await newDb.fetchProgram("random")
    //     expect(typeof program).toEqual('object')
    // })
})


