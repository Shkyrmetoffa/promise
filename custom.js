var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function MyPromise(fn) {
    // store state which can be PENDING, FULFILLED or REJECTED
    var state = PENDING;

    // store value once FULFILLED or REJECTED
    var value = null;

    // store sucess & failure handlers
    var handlers = [];

    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject);
                return
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }

    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state === REJECTED && typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }

    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'object' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }

    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function (value) {
                    if (done) return;
                    done = true;
                    onFulfilled(value)
                },
                function (reason) {
                    if (done) return;
                    done = true;
                    onRejected(reason)
                })
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex)
        }
    }

    this.done = function (onFulfilled, onRejected) {
        setTimeout(function () {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    };

    this.then = function (onFulfilled, onRejected) {
        var self = this;
        return new MyPromise(function (resolve, reject) {
            return self.done(function (result) {

                    if (typeof onFulfilled === 'function') {

                        try {
                            return resolve(onFulfilled(result));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {

                        return resolve(result);
                    }
                },
                function (error) {
                    if (typeof onRejected === 'function') {
                        try {
                            return resolve(onRejected(error));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return reject(error);
                    }
                });
        });
    };

    doResolve(fn, resolve, reject);


    MyPromise.all = function (arrPromise) {
        var arr = [];
        var ready = new MyPromise((resolve) => { return resolve(null)});

        arrPromise.forEach(function (promise) {
            ready = ready.then(function () {
                return promise;
            }).then(function (value) {
                arr.push(value);
            });
        });

        return ready.then(function () { return arr; });
    }
}
function getCustomName() {
    let promise = new MyPromise((resolve) => {
        let name = "Alla";
        let time = getRandomTime();
        setTimeout (() => {
            resolve('Name: ' + name);
        }, time);
    });
    return promise;
}
function getCustomNumber() {
    let promise = new MyPromise((resolve) => {
    let number = "48";
    let time = getRandomTime();
    setTimeout(() => {
        resolve('Number: ' + number);
    }, time);
    });
    return promise;
}
function getCustomColor() {
    let promise = new MyPromise((resolve) => {
    let color = "yellow";
    let time = getRandomTime();
    setTimeout (() => {
        resolve('Color: ' + color);
    }, time);
    });
    return promise;
}
function getCustomServer() {
    let promise = new MyPromise((resolve) => {
            let arr =[];
    let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
    requestPromise.then((response) => {
        let dataPromise = response.json();
    dataPromise.then((data) => {
        for (let i = 0; i < data.length; i++) {
        arr.push(data[i].title);
    }
    resolve('title : ' + arr)
})
})
});
    return promise;
}


function customPart() {

    getCustomColor().then(console.log.bind(console));
    getCustomName().then(console.log.bind(console));
    getCustomNumber().then(console.log.bind(console));
    getCustomServer().then(console.log.bind(console));
}

function customPart2() {
    getCustomColor().then(console.log.bind(console));
    getCustomName().then(console.log.bind(console));
    getCustomNumber().then(console.log.bind(console));
    getCustomServer().then(console.log.bind(console));
}

function customPart3()  {
    let arrPromise = [getCustomName(), getCustomNumber(), getCustomColor(), getCustomServer()];

    MyPromise.all(arrPromise).then((promiseArray) => {
        promiseArray.forEach((item) => {
        if (typeof item === 'object') {
        item.forEach((elem) => { console.log(elem)});
    } else {
        console.log(item);
    }
});
});
}