function Car() {
    this.x = 700;
    this.y = 350;
    this.direct = "up";
    this.speed = 10;

    this.draw = function () {
        this.image = this.direct + ".png";
    }
    this.draw();

    this.move = function () {
        switch (this.direct) {
            case "down":
                this.y += this.speed;
                break;
            case "up":
                this.y -= this.speed;
                break;
            case "left":
                this.x -= this.speed;
                break;
            case "right":
                this.x += this.speed;
                break;
        }
    };

    this.show = function (ctx) {
        let image = new Image();
        let x = this.x;
        let y = this.y;
        image.onload = function () {
            ctx.drawImage(image, x, y);
        };
        image.src = "images/" + this.image;
    }
}

function Rock() {
    this.x = Math.floor(Math.random()*window.innerWidth);
    this.y = Math.floor(Math.random()*window.innerHeight);
    this.show = function (ctx) {
        let image = new Image();
        let x = this.x;
        let y = this.y;
        image.onload = function () {
            ctx.drawImage(image, x, y);
        };
        image.src = "images/rock.png";
    }
}

function Coin() {
    this.x = Math.floor(Math.random()*window.innerWidth);
    this.y = Math.floor(Math.random()*window.innerHeight);
    this.show = function (ctx) {
        let image = new Image();
        let x = this.x;
        let y = this.y;
        image.onload = function () {
            ctx.drawImage(image, x, y);
        };
        image.src = "images/coin.png";
    }
}

function GameBoard() {
    this.car = new Car();
    this.poin = 0;

    this.rocks = new Array();
    for(let i = 0; i<5; i++)
        this.rocks[i] = new Rock();

    this.coins = new Array();
    for(let i = 0; i<8; i++)
        this.coins[i] = new Coin();

    this.ctx = undefined;
    this.start = function () {
        this.ctx = document.getElementById("gameCar").getContext("2d");
        this.car.show(this.ctx);
        for (let i =0; i < this.rocks.length; i++)
            this.rocks[i].show(this.ctx);
        for (let i =0; i < this.coins.length; i++)
            this.coins[i].show(this.ctx);
    };

    this.render = function () {
        this.ctx.clearRect(0,0,1500,1000);
        this.car.show(this.ctx);
        for (let i =0; i < this.rocks.length; i++)
            this.rocks[i].show(this.ctx);
        for (let i =0; i < this.coins.length; i++)
            this.coins[i].show(this.ctx);
    };

    this.moveCar = function (event) {
            switch (event.which) {
                case 37:
                    this.car.direct = "left";
                    break;
                case 38:
                    this.car.direct = "up";
                    break;
                case 39:
                    this.car.direct = "right";
                    break;
                case 40:
                    this.car.direct = "down";
                    break;
            }
            this.car.draw();
            this.car.move();
            for (let i=0; i< this.rocks.length; i++)
                if(this.checkTouch(this.car.x, this.rocks[i].x, this.car.y, this.rocks[i].y))
                    alert("Game over!");
                else
                    this.render();

            for (let i =0; i < this.coins.length; i++)
                if(this.checkTouch(this.car.x, this.coins[i].x, this.car.y, this.coins[i].y)){
                    this.poin += 100;
                    alert("Congrat! You have " + this.poin + "poins");
                    this.coins.splice(i,1);
                }
            this.render();
        }

    this.checkTouch = function (xA, xB, yA, yB) {
        if((Math.abs(xA - xB) <= 50 && Math.abs(yA - yB) <= 50) ||
        (Math.abs(yA - yB) <= 50 && Math.abs(xA - xB) <= 50))
            return true;
        else
            return false;
    }
}

let gameBoard = new GameBoard();
gameBoard.start();