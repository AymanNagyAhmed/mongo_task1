const { MongoClient } = require("mongodb");
const url =
  "mongodb://admin:%4012345Admin@localhost:27017/?authMechanism=DEFAULT";
const dbName = "test_db";
const client = new MongoClient(url);

async function main() {
  await client.connect();
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const users = db.collection("users");

  ////////////////////////////////// insertOne ///////////////////////////
  const user1 = {
    first_name: "ayman",
    last_name: "test",
    age: 20,
    email: "ayman@test.com",
    password: "123456789",
  };
  const user2 = {
    first_name: "nagy",
    last_name: "test",
    age: 22,
    email: "nagy@test.com",
    password: "123456789",
  };
  const insertResult1 = await users.insertOne(user1);
  const insertResult2 = await users.insertOne(user2);
  console.log("Inserted documents =>", insertResult1);
  console.log("Inserted documents =>", insertResult2);

  ////////////////////////////////// insertMany ///////////////////////////
  const insertManyResult = await users.insertMany([
    {
      first_name: "islam",
      last_name: "test",
      age: 27,
      email: "islam@test.com",
      password: "123456789",
    },
    {
      first_name: "adel",
      last_name: "test",
      age: 27,
      email: "adel@test.com",
      password: "123456789",
    },
    {
      first_name: "reem",
      last_name: "test",
      age: 27,
      email: "reem@test.com",
      password: "123456789",
    },
    {
      first_name: "tasneem",
      last_name: "test",
      age: 27,
      email: "tasneem@test.com",
      password: "123456789",
    },
    {
      first_name: "khalid",
      last_name: "test",
      age: 27,
      email: "khalid@test.com",
      password: "123456789",
    },
    {
      first_name: "dodo",
      last_name: "test",
      age: 6,
      email: "dodo@test.com",
      password: "123456789",
    },
    {
      first_name: "fofo",
      last_name: "test",
      age: 7,
      email: "fofo@test.com",
      password: "123456789",
    },
    {
      first_name: "bar",
      last_name: "test",
      age: 8,
      email: "bar@test.com",
      password: "123456789",
    },
    {
      first_name: "mohamed",
      last_name: "test",
      age: 9,
      email: "mohamed@test.com",
      password: "123456789",
    },
    {
      first_name: "mido",
      last_name: "test",
      age: 10,
      email: "mido@test.com",
      password: "123456789",
    },
  ]);
  console.log("Inserted documents =>", insertManyResult);

  ////////////////////////////////// find ///////////////////////////

  const query = { age: 27 };
  const findOptions = {
    sort: { fist_name: -1 },
  };
  const findByIdResult = await users
    .find(query, findOptions)
    .limit(3)
    .toArray();
  console.log("Found documents => ", findByIdResult);

  ////////////////////////////////// update many ///////////////////////////
  const filter1 = { age: 27 };
  const updateOptions1 = { limit: 4 };
  const updateDocs1 = {
    $set: { first_name: "ahmed" },
    $inc: { age: 4 },
  };
  const updatedResult1 = await users.updateMany(
    filter1,
    updateDocs1,
    updateOptions1
  );
  console.log("updated documents count =>", updatedResult1.modifiedCount);
  console.log("updated document =>", updatedResult1);

  ////////////////////////////////// update many ///////////////////////////
  const filter2 = {};
  const updateOptions2 = {};
  const updateDocs2 = {
    $inc: { age: 10 },
  };
  const updatedResult2 = await users.updateMany(
    filter2,
    updateDocs2,
    updateOptions2
  );
  console.log("updated documents count =>", updatedResult2.modifiedCount);
  console.log("updated document =>", updatedResult2);

  ////////////////////////////////// delete many ///////////////////////////
  const deleteQuery = { age: 41 };
  const deletedResult = await users.deleteMany(deleteQuery);
  console.log("count of deleted documents => ", deletedResult.deletedCount);
  if (deletedResult.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }

  return "done.";
}

main()
  .then(() => {
    console.log("then");
  })
  .catch(console.error)
  .finally(() => client.close());
