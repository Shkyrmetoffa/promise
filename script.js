function getColor(callback) {
    let symbol = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += symbol[Math.round(Math.random() * 16)];
    }

    let timer = getRandomTime();

    setTimeout(() => {
        callback(color);
}, timer);
}

function getName(callback) {
    let name = ['Jane', 'Nata', 'Alla', 'Alex','Ed', 'Serge'];

    let timer = getRandomTime();
    setTimeout(() => {
        callback(name[Math.round(Math.random() * (name.length - 1))]);
}, timer);
}

function getNumber(callback) {
    let timer = getRandomTime();
    setTimeout(() => {
        callback(Math.round(Math.random() * 100));
}, timer);
}

function getRandomTime() {
    let time = 1000;
    return(Math.round(Math.random() * 4) + 1) * time;
}

function callback(x){
    console.log(x);
}

function firstStep() {
    getColor(callback);
    getName(callback);
    getNumber(callback);
    getServer(callback);
}
function thirdStep () {
    "use strict";
    getName(function(name) {
        getColor(function(color) {
            getNumber(function(number) {
                getServer(function(title) {
                    console.log (name, color, number, title);
                })
            })
        })
    })
}

var arr = [];

function secondTask (param) {
    arr.push(param);
    if(arr.length === 6){
        let str = arr.join('\n');
        console.log(str);
        arr = [];
    }
}
function secondStep() {
    getColor(secondTask);
    getName(secondTask);
    getNumber(secondTask);
    getServer(secondTask);
}

function getServer(func) {
    let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
    requestPromise.then((response) => {
        let dataPromise = response.json();
    dataPromise.then((data) => {
        for (let i = 0; i < data.length; i++) {
        func('title : ' + data[i].title)
    }
})
})
}