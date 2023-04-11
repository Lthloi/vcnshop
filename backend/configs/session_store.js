import MongoStore from 'connect-mongo'

const { MONGODB_URI, SESSION_EXPIRE } = process.env

const mongoStore = new MongoStore({
    mongoUrl: MONGODB_URI,
    ttl: SESSION_EXPIRE * 1,
    collectionName: 'sessions',
})

export default mongoStore