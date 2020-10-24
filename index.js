var express = require('express')
var app = express()

const port = process.env.PORT || 3000

var server = app.listen(port, function () {
    console.log('The port is running!')
})

app.get('/api/leaderboard', function (req, res) {
    console.log('lead endpoint')

    var result = getJson(req.query.pName, req.query.pAttempts) //JSON string

    res.send(result)
})


let getJson = function (param1, param2) {

    //return random number of 1 - 15
    var namesOnly = [
		'GOD',
		'Mitch',
		'Betsy',
		'Edna',
		'Opal',
		'Janet',
		'Louis',
		'Hazel',
		'Dora',
		'Thomas',
		'Stan',
		'Connie',
		'Noel',
		'Keith',
		'Roxanne',
		'Gilbert',
		'Isabel',
		'Wilma',
		'Zack',
		'Paloma',
		'Frederic',
		'Alicia',
		'Cesar',
		'Loser'
	]

    var initAtt = 15

    //score for GOD
    var attemptsOnly = [12]

    for (i = 1; i < namesOnly.length - 1; i++) {
        attemptsOnly.push(randomScore(initAtt))
        initAtt = initAtt + 3
    }

    //score for Loser
    attemptsOnly.push(999)

    //push data from queries
    if (param1 && param2) {
        namesOnly.push('*' + param1 + '*')
        attemptsOnly.push(parseInt(param2))
    }

    console.log(namesOnly)
    console.log(attemptsOnly)

    convertToJSON(namesOnly, attemptsOnly)

    return objectJSON
}

let Player = function (pName, attmpts) {
    this.pName = pName
    this.pAttempts = attmpts
}

let convertToJSON = function (arr1, arr2) {
    var tmp = new Array()

    for (i = 0; i < arr1.length; i++) {
        tmp[i] = new Player(arr1[i], arr2[i])
    }
    console.log(tmp)

    var order = arr2.sort()
    var tmp2 = mapOrder(tmp, order, 'pAttempts')

    myDataObj = new Object()
    myDataObj.Players = tmp2

    objectJSON = JSON.stringify(myDataObj)
    console.log(objectJSON)
}

let mapOrder = function (arr, order, key) {
    arr.sort(function (a, b) {
        var A = a[key],
            B = b[key]
        if (order.indexOf(A) > order.indexOf(B)) {
            return 1
        } else {
            return -1
        }
    })
    return arr
}

let randomScore = function (num) {
    return num + Math.floor(Math.random() * 15) + 1
}