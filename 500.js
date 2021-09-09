


var games = [
    [[[1, 11], [6, 7]], [[2, 5], [3, 8]], [[4, 9], [10, 12]]],//w1
    [[[6, 9], [8, 12]], [[7, 2], [10, 11]], [[3, 1], [5, 4]]],//w2
    [[[4, 3], [9, 11]], [[1, 2], [7, 10]], [[5, 8], [6, 12]]],//w3
    [[[7, 3], [9, 5]], [[8, 10], [11, 4]], [[12, 1], [2, 6]]],//w4
    // [[[12, 11], [3, 2]], [[10, 9], [8, 1]], [[7, 5], [4, 6]]]//w5
]

var Wins = [
    [[[1], [0]], [[0], [1]], [[1], [0]]],//w1
    [[[1], [0]], [[0], [1]], [[0], [1]]],//w2
    [[[1], [0]], [[1], [0]], [[1], [0]]],//w3
    [[[0], [1]], [[0], [1]], [[1], [0]]],//w4
    // [[[0], [0]], [[0], [0]], [[0], [0]]]//w5
]
var players = {
    1: {
        wins: 0,
        ag: [],
        team: []
    },
    2: {
        wins: 0,
        ag: [],
        team: []
    },
    3: {
        wins: 0,
        ag: [],
        team: []
    },
    4: {
        wins: 0,
        ag: [],
        team: []
    },
    5: {
        wins: 0,
        ag: [],
        team: []
    },
    6: {
        wins: 0,
        ag: [],
        team: []
    },
    7: {
        wins: 0,
        ag: [],
        team: []
    },
    8: {
        wins: 0,
        ag: [],
        team: []
    },
    9: {
        wins: 0,
        ag: [],
        team: []
    },
    10: {
        wins: 0,
        ag: [],
        team: []
    },
    11: {
        wins: 0,
        ag: [],
        team: []
    },
    12: {
        wins: 0,
        ag: [],
        team: []
    }
}
for (var i = 0; i < games.length; i++) {
    //weeks
    for (var j = 0; j < games[i].length; j++) {
        //game
        // for (var k = 0; k < games[i][j].length; k++) {
        if (Wins[i][j][0][0]) {

            players[games[i][j][0][0]].wins = players[games[i][j][0][0]].wins + 1;
            players[games[i][j][0][1]].wins = players[games[i][j][0][1]].wins + 1;
        }
        if (Wins[i][j][1][0]) {

            players[games[i][j][1][0]].wins = players[games[i][j][1][0]].wins + 1;
            players[games[i][j][1][1]].wins = players[games[i][j][1][1]].wins + 1;

        }
        players[games[i][j][0][0]].ag.push(games[i][j][1][0]);
        players[games[i][j][0][0]].ag.push(games[i][j][1][1]);
        players[games[i][j][0][0]].team.push(games[i][j][0][1]);
        players[games[i][j][0][1]].ag.push(games[i][j][1][0]);
        players[games[i][j][0][1]].ag.push(games[i][j][1][1]);
        players[games[i][j][0][1]].team.push(games[i][j][0][0]);
        players[games[i][j][1][0]].ag.push(games[i][j][0][0]);
        players[games[i][j][1][0]].ag.push(games[i][j][0][1]);
        players[games[i][j][1][0]].team.push(games[i][j][1][1]);
        players[games[i][j][1][1]].ag.push(games[i][j][0][0]);
        players[games[i][j][1][1]].ag.push(games[i][j][0][1]);
        players[games[i][j][1][1]].team.push(games[i][j][1][0]);
    }
}
scoreArry = [];
for (var i = 1; i <= 12; i++) {
    for (var j = 1; j <= 12; j++) {
        if (i !== j) {
            for (var k = 1; k <= 12; k++) {
                if ((i !== k) && (j !== k)) {
                    for (var l = 1; l <= 12; l++) {
                        if ((i !== l) && (j !== l) && (k !== l)) {
                            if (!checkAlreadyRunOp(i, j, k, l)) {
                                var newScr = (getScore(players[i], j, k, l) + getScore(players[j], i, k, l) + getScore(players[k], l, j, i) + getScore(players[l], k, j, i));

                                if ((newScr > 0)) {
                                    scoreArry.push({ scr: newScr, grp: [i, j, k, l] });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
console.log("Calculating...")
function checkAlreadyRunOp(i, j, k, l) { // reduce dups
    //5,4,3,2
    //[i,j,l,k] 5,4,2,3    k>l
    //[j,i,k,l]4,5,3,2  i>j
    //[j,i,l,k]4,5,2,3 i>j && k>l
    //[k,l,i,j]3,4,1,2       4,5,1,2      1,2,4,5 
    //[k,l,j,i]3,4,2,1
    //[l,k,j,i]4,3,2,1 k>l  3,4,2,1
    //[l,k,i,j]4,3,1,2 k>l
    if (l) {
        if (k > l) {
            return true;
        }
    }
    if (i > j) {
        return true;
    }
    if (i > k) {
        return true;
    }
    if (l) {
        if (i > l) {
            return true;
        }
    }
    return false;
}
function getScore(player, a, b, c) {
    var checky = 0; // increase this if no value - blocks one person over play another
    var score = 0;
    var aT = 0;
    var bT = 0;
    var cT = 0;
    for (var i = 0; i < player.ag.length; i++) {
        if (player.ag[i] === a) {
            if (aT > checky) {
                score = score - 1000000000000;
            }
            aT++;
            score++;
        } else if (player.ag[i] === b) {
            if (bT > checky) {
                score = score - 1000000000000;
            }
            bT++;
            score++;
        } else if (player.ag[i] === c) {
            if (cT > checky) {
                score = score - 1000000000000;
            }
            cT++;
            score++;
        }
    }
    for (var i = 0; i < player.team.length; i++) {
        if (player.team[i] === a) {
            score = score - 1000000000000;
            if (aT > checky) {
                score = score - 1000000000000;
            }
            aT++;
        } else if (player.team[i] === b) {
            score = score + 1;
            if (bT > checky) {
                score = score - 1000000000000;
            }
            bT++;
        } else if (player.team[i] === c) {
            score = score + 1;
            if (cT > checky) {
                score = score - 1000000000000;
            }
            cT++;
        }
    }
    return score;
}

function check(a, b, c) {
    for (var i = 0; i < a.grp.length; i++) {
        for (var j = 0; j < b.grp.length; j++) {
            if (a.grp[i] === b.grp[j]) {
                return false;
            }
        }
        for (var k = 0; k < c.grp.length; k++) {
            if (a.grp[i] === c.grp[k]) {
                return false;
            }
        }
    }
    for (var i = 0; i < b.grp.length; i++) {
        for (var k = 0; k < c.grp.length; k++) {
            if (b.grp[i] === c.grp[k]) {
                return false;
            }
        }
    }
    return true;
}
var newArr = [];
for (var i = 0; i < scoreArry.length; i++) {
    for (var j = 0; j < scoreArry.length; j++) {
        if ((i !== j)) {
            for (var k = 0; k < scoreArry.length; k++) {
                if ((j !== k) && (k != i)) {
                    if (!checkAlreadyRunOp(i, j, k, null)) {
                        if (check(scoreArry[i], scoreArry[j], scoreArry[k])) {
                            newArr.push({ scr: (scoreArry[i].scr + scoreArry[j].scr + scoreArry[k].scr), grp: [scoreArry[i].grp, scoreArry[j].grp, scoreArry[k].grp] })
                        }
                    }
                }
            }
        }
    }
}
newArr.sort((a, b) => { return a.scr > b.scr ? 1 : -1 })
for (var m = 0; m < 25; m++) {
    console.log(newArr[m])

}
