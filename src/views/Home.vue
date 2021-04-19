<template>
    <div class="nav">
        <div class="brand">Algorithm Visualizer</div>
        <div class="links">
            Github
        </div>
    </div>
    <div class="m-body">
        <router-link to="/sudoku-solver"
            ><div class="items-of-vis">Sudoku Solver</div></router-link
        >
        <router-link to="/dijkshtra"
            ><div class="items-of-vis">
                Dijkshtra Shortest Path
            </div></router-link
        >
        <router-link to="/a-star-pathfinder"
            ><div class="items-of-vis">A* Pathfinder</div></router-link
        >
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
body {
    box-sizing: border-box;
    margin: 0px;
}
.nav {
    height: 12vh;
    background-color: #f3f4ed;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.brand {
    font-size: 50px;
    color: #424642;
    font-family: "Montserrat";
}
.links {
    font-size: 30px;
    color: #424642;
    font-family: "Montserrat";
}
.m-body {
    height: 88vh;
    background-color: #dddddd;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.items-of-vis {
    margin-top: 20px;
    margin-bottom: 25px;
    font-family: "Montserrat";
    font-size: 20px;
    color: #424642;
    border: 3px solid #424642;
    border-radius: 4px;
    padding: 5px 10px;
    transition: 0.25s;
}
.items-of-vis:hover {
    background-color: #424642;
    color: #f3f4ed;
}
a {
    text-decoration: none;
}
</style>
