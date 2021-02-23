const faunadb = require("faunadb");
const util = require("util");
const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET,
});

module.exports.getUser = () => {
  return client.query(
    q.Get(q.Ref(q.Collection("users"), "282652881944838658"))
  );
};

module.exports.load = () => {
  for (let i = 0; i < 1000; i++) {
    client
      .query(q.Get(q.Ref(q.Collection("users"), "282652881944838658")))
      .then(() => {
        console.info("ok ", i);
      })
      .catch((e) => {
        console.error(e, i);
      });
  }
  return 1;
};

function runStream(docRef) {
  let _stream = client.stream.document(docRef);
  _stream
    .on("start", (data, event) => {
      console.debug(`subscribed to Fauna events for `, docRef);
    })
    .on("error", (data, event) => {
      console.debug(
        "stream",
        docRef,
        JSON.stringify(data),
        JSON.stringify(event)
      );
      if (data.message == "network error") {
        console.debug("closing stream");
        _stream.close();
      }
    });
  _stream.start();
}

module.exports.startStream = () => {
  const docs = [
    q.Ref(q.Collection("users"), "288054280439464449"),
    q.Ref(q.Collection("users"), "288054280439465473"),
    q.Ref(q.Collection("users"), "288054280439466497"),
  ];

  docs.forEach((doc) => runStream(doc));
};
