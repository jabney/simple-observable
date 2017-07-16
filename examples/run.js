/*
  Helper to run example classes

  To build source:
  > npm run build

  To run class examples
  > node examples/composition.js
  > node examples/inheritance.js
*/

module.exports = function run(Observable) {
  var subject = new Observable()
  subject.go(100)

  var subscriptions = [
    subject.subscribe(function (data, id) {
      console.log('\nobserver1: event ' + data.event)
    }),

    subject.subscribe(function (data, id) {
      console.log('observer2: event ' + data.event)
    }),

    subject.subscribe(function (data, id) {
      console.log('observer3: event ' + data.event)
    })
  ]

  const intervalId = setInterval(function () {
    subscriptions.pop().unsubscribe()

    if (subscriptions.length === 0) {
      clearInterval(intervalId)
      console.log('\nall observers unsubscribed')

      setTimeout(function () {
        subject.stop()
      }, 1000)
    }
  }, 1000)
}
