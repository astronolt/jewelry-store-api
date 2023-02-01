import client from '../../database/index'

export class SharedModel {
    async resetTable(tableName: string) {
        try {
            const conn = await client.connect()
            const sql = `TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`
            const result = await conn.query(sql)
            console.log('table truncated')

            conn.release()

            return result
        } catch (error) {
            console.log(error)

            throw new Error(`Could not truncate table. Error ${error}`)
        }
    }
}
