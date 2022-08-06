import { connect } from "mongoose";

export class DatabaseConnection {
    async conection() {
        await connect(process.env.MONGOURL || 'mongodb://localhost:27017/jetsun')
        console.log('MongoDB up')
    }
}