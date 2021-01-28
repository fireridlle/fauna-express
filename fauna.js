const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET
})

module.exports.getUser = () => {
    return client.query(q.Get(q.Ref(q.Collection('users'),'282652881944838658')))
}