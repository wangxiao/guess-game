AV.initialize('11io8mpr1tzbudo29bp7air3c9kbltnbornk5the3s5a6bbd', 
    'se3zmk1jlm7jfezikc43r4cj6ghr3anfez5178mdwbe8fz33');

var resultList = [];
function getData(startIndex) {
    if (!startIndex) {
        startIndex = 0;
    }
    var result = AV.Object.extend('template');
    var query = new AV.Query(result);
    query.equalTo('name');
    query.skip(startIndex);
    query.find({
        success: function(data) {
            for (var i = 0, l = data.length; i < l; i ++) {
                var n = data[i].attributes.name;
                if (n) {
                    n = String(n).replace(/（.+）/g, '');
                    if (resultList.length) {
                        if (resultList[resultList.length - 1] !== n) {
                            console.log(n);
                            resultList.push(n);
                        }
                    } else {
                        console.log(n);
                        resultList.push(n);
                    }
                }
            }
            if (data.length) {
                getData(startIndex + data.length);
            } else {
                console.log(resultList.length);
            }
        }
    });
}

getData();

var dom = document.getElementById('show-word');
var btn = document.getElementById('button');
var time = document.getElementById('time');
var timeLength = 0;
var interval;

btn.addEventListener('click', function() {
    if (!timeLength) {
        timeLength = 2 * 60 - 1;
        // timeLength = 0;
        interval = setInterval(function() {
            time.innerText = timeLength --;
            if (!timeLength) {
                stop();
            }
        }, 1000);
    }
    getWordRandom();
});

function stop() {
    dom.innerText = '准备开始';
    clearInterval(interval);
}

function getWordRandom() {
    var n = Math.floor(Math.random() * resultList.length);
    resultList.splice(n - 1, 1);
    dom.innerText = resultList[n];
}


