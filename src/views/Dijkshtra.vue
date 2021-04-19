<template>
    <div class="navv">
        <div class="brand">Dijkshtra Shortest Path Algorithm Visualizer</div>
    </div>
    <div class="m-body">
        <div class="table-class">
            <table align="center">
                <tr
                    v-for="(firstList, firstListIndex) in grid"
                    :key="firstListIndex"
                >
                    <td
                        v-for="(item, itemIndex) in firstList"
                        :key="itemIndex"
                        :class="{
                            restricted: item == 1,
                            path: item == 2,
                            start:
                                firstListIndex == start[0] &&
                                itemIndex == start[1],
                            end:
                                firstListIndex == end[0] && itemIndex == end[1],
                            visiting: item == 5,
                        }"
                    ></td>
                </tr>
            </table>

            <div class="btn-class">
                <button class="btn" @click="fillpathandscore">
                    Find Path!
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Dijkshtra",
    data() {
        return {
            grid: [
                [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1],
                [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
                [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
            ],
            start: [0, 0],
            end: [19, 19],
            priorityqueue: [],
            scores: [],
            paths: [],
        };
    },
    methods: {
        fillpathandscore() {
            for (var i = 0; i < this.grid.length; i++) {
                var temp = [];
                for (var j = 0; j < this.grid[0].length; j++) {
                    temp.push(5000000);
                }
                this.scores.push(temp);
            }
            for (i = 0; i < this.grid.length; i++) {
                temp = [];
                for (j = 0; j < this.grid[0].length; j++) {
                    temp.push([null, null]);
                }
                this.paths.push(temp);
            }
            this.finding();
        },
        arrayRemove(arr, value) {
            return arr.filter(function(ele) {
                return ele != value;
            });
        },
        timeout(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        poppriorityqueue() {
            console.log("Here in poppq");
            var val = this.priorityqueue[0];
            var el;
            for (var i = 1; i < this.priorityqueue.length; i++) {
                el = this.priorityqueue[i];
                if (el[0] < val[0]) {
                    val = el;
                } else if (el[0] == val[0] && el[1] < val[1]) {
                    val = el;
                }
            }
            //this.priorityqueue.splice(index);
            this.priorityqueue = this.arrayRemove(this.priorityqueue, val);
            console.log("Going out of poppq");
            return val;
        },
        async backtract() {
            var i, j;
            i = this.end[0];
            j = this.end[1];
            var ti, tj;
            this.grid[this.start[0]][this.start[1]] = 2;
            while (i != this.start[0] || j != this.start[1]) {
                this.grid[i][j] = 2;
                await this.timeout(50);
                ti = this.paths[i][j][0];
                tj = this.paths[i][j][1];
                i = ti;
                j = tj;
            }
            this.grid[i][j] = 2;
        },
        async finding() {
            this.priorityqueue.push([0, this.start[0], this.start[1]]);
            var cur;
            var i, j;
            var a, b;
            while (this.priorityqueue.length != 0) {
                cur = this.poppriorityqueue();
                i = cur[1];
                j = cur[2];
                this.grid[i][j] = 5;

                await this.timeout(30);
                //console.log(i, j, this.priorityqueue.length);
                if (i == this.end[0] && j == this.end[1]) {
                    this.backtract();
                    break;
                }
                if (this.scores[i][j] < cur[0]) {
                    continue;
                } else {
                    if (i > 0) {
                        console.log("1 in");
                        a = i - 1;
                        b = j;
                        if (
                            cur[0] + 1 < this.scores[a][b] &&
                            this.grid[a][b] != 1
                        ) {
                            this.scores[a][b] = cur[0] + 1;
                            this.priorityqueue.push([cur[0] + 1, a, b]);
                            this.paths[a][b] = [i, j];
                        }
                        console.log("1 out");
                    }
                    if (j > 0) {
                        console.log("2 in");
                        a = i;
                        b = j - 1;
                        if (
                            cur[0] + 1 < this.scores[a][b] &&
                            this.grid[a][b] != 1
                        ) {
                            this.scores[a][b] = cur[0] + 1;
                            this.priorityqueue.push([cur[0] + 1, a, b]);
                            this.paths[a][b] = [i, j];
                        }
                        console.log("2 out");
                    }
                    if (i < this.grid.length - 1) {
                        a = i + 1;
                        b = j;
                        if (
                            cur[0] + 1 < this.scores[a][b] &&
                            this.grid[a][b] != 1
                        ) {
                            this.scores[a][b] = cur[0] + 1;
                            this.priorityqueue.push([cur[0] + 1, a, b]);
                            this.paths[a][b] = [i, j];
                        }
                    }
                    if (j < this.grid[0].length - 1) {
                        a = i;
                        b = j + 1;
                        if (
                            cur[0] + 1 < this.scores[a][b] &&
                            this.grid[a][b] != 1
                        ) {
                            this.scores[a][b] = cur[0] + 1;
                            this.priorityqueue.push([cur[0] + 1, a, b]);
                            this.paths[a][b] = [i, j];
                        }
                    }
                }
            }
        },
    },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
.navv {
    height: 12vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e9896a;
}
.brand {
    font-size: 30px;
    color: #424642;
    font-family: "Montserrat";
}
.m-body {
    height: 88vh;
    background-color: #f8f5f1;
}
table {
    padding-top: 20px;
    border-collapse: separate;
    border-spacing: 0px;
}
td {
    margin: 0px;
    padding: 0px;
    height: 25px;
    width: 25px;
    text-align: center;
    border: 1px solid #222831;
    font-size: 30px;
    font-family: "Montserrat";
    font-weight: 500;
    color: #222831;
}
.restricted {
    background-color: #222831;
}
.start {
    background-color: #28527a;
}
.end {
    background-color: #d44000;
}
.btn {
    /* height: 5px;
    width: 10px; */
    border: 1px solid #222831;
    border-radius: 2px;
    background-color: #222831;
    color: #f8f5f1;
    font-family: "Montserrat";
}
.btn-class {
    display: flex;
    justify-content: center;
    padding-top: 60px;
}
.path {
    background-color: #81b214;
}
.visiting {
    background-color: #c15050;
}
</style>
