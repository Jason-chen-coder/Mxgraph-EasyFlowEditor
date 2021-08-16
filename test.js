function sleep (fn, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fn);
    }, time);
  });
}
let saySomething = (name) => console.log(`hello,${name}`)
async function autoPlay () {
  let demo = await sleep(saySomething('Jason Chen'), 1000)
  let demo2 = await sleep(saySomething('节省钱'), 1000)
}
autoPlay()