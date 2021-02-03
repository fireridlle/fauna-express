const faunadb = require('faunadb')
const util = require('util')
const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET
})

module.exports.getUser = () => {
    return client.query(q.Get(q.Ref(q.Collection('users'),'282652881944838658')))
}

module.exports.load = () => {
  for (let i = 0; i < 1000; i++) {
    client
      .query(q.Get(q.Ref(q.Collection('users'), '282652881944838658')))
      .then(() => {
        console.info('ok ', i)
      })
      .catch(e => {
        console.error(e, i)
      })
  }
  return 1
}

module.exports.startStream =() => {
    client.stream.document(q.Ref(q.Collection('users'),'282652881944838658'))
    .on('snapshot', snapshot => {
      console.log('snapshot')
      console.log(util.inspect(snapshot, { showHidden: false, depth: null }))
    })
    .on('version', version => {
      console.log(util.inspect(version, { showHidden: false, depth: null }))
      console.log(stream._client._state)
    })
    .on('error', error => console.error('Error: %s', error))
    .start()
  }