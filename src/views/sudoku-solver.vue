<template>
    <div>
        <div class="header">
            SUDOKU SOLVER
        </div>
        <div class="main-body">
            <table align="center">
                <tr
                    v-for="(firstList, firstListIndex) in board"
                    :key="firstListIndex"
                >
                    <td
                        v-for="(item, itemIndex) in firstList"
                        :key="itemIndex"
                        :class="{
                            'border-right': itemIndex == 2 || itemIndex == 5,
                            'border-bottom':
                                firstListIndex == 2 || firstListIndex == 5,
                            'active-cell':
                                firstListIndex == row && itemIndex == col,
                        }"
                    >
                        {{ item }}
                    </td>
                </tr>
            </table>

            <div class="but">
                <button @click="solution">Solve!</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sudoku",
    data() {
        return {
            board: [
                [7, 8, 0, 4, 0, 0, 1, 2, 0],
                [6, 0, 0, 0, 7, 5, 0, 0, 9],
                [0, 0, 0, 6, 0, 1, 0, 7, 8],
                [0, 0, 7, 0, 4, 0, 2, 6, 0],
                [0, 0, 1, 0, 5, 0, 9, 3, 0],
                [9, 0, 4, 0, 6, 0, 0, 0, 5],
                [0, 7, 0, 3, 0, 0, 0, 1, 2],
                [1, 2, 0, 0, 0, 7, 4, 0, 0],
                [0, 4, 9, 2, 0, 6, 0, 0, 7],
            ],
            keys: [11, 22, 33, 44, 55, 66, 77, 88, 99],
            row: 0,
            col: 0,
            count: 0,
            level: 0,
        };
    },
    methods: {
        async sleep(ms) {
            console.log("Here");
            return new Promise((resolve) => setTimeout(resolve, ms));
        },
        solution() {
            console.log("Let's Solve!");
            this.sodokoSolver(this.board, 0);
            for (var i = 0; i < this.board.length; i++) {
                for (var j = 0; j < this.board[0].length; j++) {
                    console.log(this.board[i][j]);
                }
            }
            console.log("Count" + this.count);
        },
        isValid(board, row, col, customk) {
            for (let i = 0; i < 9; i++) {
                const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
                const n = 3 * Math.floor(col / 3) + (i % 3);
                if (
                    board[row][i] == customk ||
                    board[i][col] == customk ||
                    board[m][n] == customk
                ) {
                    return false;
                }
            }
            return true;
        },

        async sodokoSolver(data, customi) {
            this.level += 1;
            console.log("Im Here");
            for (let i = customi; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    await this.sleep(10);
                    this.row = i;
                    this.col = j;
                    if (data[i][j] == 0) {
                        this.count += 1;

                        for (let k = 1; k <= 9; k++) {
                            if (this.isValid(data, i, j, k)) {
                                data[i][j] = k;
                                if (await this.sodokoSolver(data, i)) {
                                    this.level -= 1;
                                    return true;
                                } else {
                                    data[i][j] = 0;
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        },
    },
    computed: {
        checker(i) {
            return i % 2 == 0;
        },
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
body {
    margin: 0;
}
.header {
    height: 20vh;
    background-color: #222831;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat";
    font-weight: 500;
    font-size: 70px;
    color: #e7e6e1;
}

.main-body {
    height: 80vh;
    background-color: #30475e;
}

table {
    padding-top: 20px;
    border-collapse: separate;
    border-spacing: 0px;
}
td {
    margin: 0px;
    padding: 0px;
    height: 50px;
    width: 50px;
    text-align: center;
    border: 1px solid #222831;
    font-size: 30px;
    font-family: "Montserrat";
    font-weight: 500;
    color: #222831;
}

.border-right {
    border-right: 5px solid #222831;
}
.border-bottom {
    border-bottom: 5px solid #222831;
}
.active-cell {
    background-color: #e7e6e1;
}
.but {
    padding-top: 30px;
    display: flex;
    justify-content: center;
}
button {
    -webkit-border-radius: 12;
    -moz-border-radius: 12;
    border-radius: 12px;
    -webkit-box-shadow: 2px 4px 3px #222831;
    -moz-box-shadow: 2px 4px 3px #222831;
    box-shadow: 2px 4px 3px #222831;
    font-family: Arial;
    color: #e7e6e1;
    font-size: 20px;
    background: #222831;
    padding: 11px 20px 10px 20px;
    text-decoration: none;
}

button:hover {
    background: #e7e6e1;
    color: #222831;
}
</style>
