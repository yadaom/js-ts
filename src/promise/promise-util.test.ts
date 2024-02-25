import promiseUtil from "./promise-util";

function delayTest() {
  promiseUtil
  .delay("World!", 1000)
  .then((data: string) => {
    console.log(new Date(), "Resolved after sometime", "Hello", data);
  });
}

function wrapTest() {
  const remoteRequest = Promise.resolve("I am remote request data");
  promiseUtil.wrap(remoteRequest, {
    before: () => console.log(new Date(), "Before remote request. I can show loading."),
    error: (e) => console.log(new Date(), "Error remote request. I can show error."),
    result: (r) => console.log(new Date(), "Success remote request. I can process result here. Data: ", r),
    finally: () => console.log(new Date(), "Always remote request. I can hide the loading."),
  }).then((data) => {
    console.log(new Date(), "Data:", data);
  });
}

function logTest() {
  const remoteRequest = Promise.resolve("Promise log test.");
  promiseUtil.log(remoteRequest, "Sending remote request...", "Remote request finished")
  .then((data) => {
    console.log(new Date(), "Remote request data: ", data);
  });
}

function promisifyTest() {
  function work() {
    return promiseUtil.delay("promisifyTest data", 500);
  }

  let supplier: () => void = work;
  promiseUtil
  .promisify(supplier)
  .then((data) => {
    console.log(new Date(), "Remote request data: ", data);
  })
}


function delayTest() {
  promiseUtil
  .delay("World!", 1000)
  .then((data: string) => {
    console.log(new Date(), "Resolved after sometime", "Hello", data);
  });
}

function main() {
  console.log(new Date(), "Adding one second delay.");
  delayTest();
  //wrapTest();
  //logTest();
  //promisifyTest();
}

main();