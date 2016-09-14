function getColor1() {
    var promise = new Promise(function(resolve) {
        "use strict";
        let symbol = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += symbol[Math.round(Math.random() * 16)];
        }

        let timer = getRandomTime1();

        setTimeout(() => {
            resolve(color);
    }, timer);
    });
    promise
        .then(
            color => {
        console.log(color);
}
)
}
function getName1() {
    var promise = new Promise(function(resolve) {
        "use strict";
        let name = ['Jane', 'Nata', 'Alla', 'Alex','Ed', 'Serge'];
        let timer = getRandomTime1();
        setTimeout(() => {
            resolve(name[Math.round(Math.random() * (name.length - 1))]);
    }, timer);
    });
    promise
        .then(
            name => {
        console.log(name)
}

)
}
function getNumber1() {
    var promise = new Promise(function(resolve) {
        let timer = getRandomTime1();
        setTimeout(() => {
            resolve(Math.round(Math.random() * 100));
    }, timer);
    });
    promise
        .then(
            number => {
        console.log(number)
}
)
}
function getRandomTime1() {
    let time = 1000;
    return(Math.round(Math.random() * 4) + 1) * time;
}

function getServer1() {
    let promise = new Promise((resolve) => {
            "use strict";
    let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
    let arr = [];
    requestPromise.then((response) => {
        let dataPromise = response.json();
    dataPromise.then((data) => {
        for (let i = 0; i < data.length; i++) {
        arr.push('title : ' + data[i].title);
    }
    resolve(arr);
})
})
});
    return promise;
}
function nativePart() {
    "use strict";
    getColor1();
    getName1();
    getNumber1();
    getServer1().then(callback);
}

function nativePart2() {
    "use strict";
    Promise.all([getColor1(), getName1(), getNumber1(), getServer1()]).then(results => {
        console.log(results.join(' '));
})
}

function nativePart3() {
    "use strict";
    Promise.all([getColor1(), getName1(), getNumber1(), getServer1()]).then(results => {
        console.log(results.join(' '));
})
}