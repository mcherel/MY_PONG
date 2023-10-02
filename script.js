var DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
};

var rounds = [5, 4, 3, 2 , 1];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];

/* The ball object */
var Ball = {
    new: function (incrementedSpeed) {
        return {
            width: 18,
            height: 18,
            x: (this.canvas.width / 2) - 9,
            y: (this.canvas.height / 2) - 9,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || 7
        };
    }
};

/* The ai object */
var Ai = {
    new: function (side){
        return {
            width: 20,
            height: 200,
            x: side === 'left' ? 150 : this.canvas.width - 150,
            y: (this.canvas.height / 2) - 35,
            score : 0,
            move: DIRECTION.IDLE,
            speed: 8
        };
    }
};
var Game = {
    initialize: function () {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        
        this.canvas.width = 1400;
        this.canvas.height = 1000;
 
        this.canvas.style.width = (this.canvas.width / 2) + 'px';
        this.canvas.style.height = (this.canvas.height / 2) + 'px';
 
        this.player1 = Ai.new.call(this, 'left');
        this.player2 = Ai.new.call(this, 'right');
        this.ball = Ball.new.call(this);

        this.running = this.over = false;
        this.turn = this.player1;
        this.timer = this.round = 0;
        this.color = 'green';

        Pong.menu();
        Pong.listen();
    },

    endGameMenu: function (text) {

    },

    menu: function () {
        Pong.draw();

    },

    update: function () {

    },

    draw: function () {
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.context.fillStyle = this.color;

        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.context.fillStyle = '#ffffff';

        /* Draw Player1 */
        this.context.fillRect(
            this.player1.x,
            this.player1.y,
            this.player1.width,
            this.player1.height
        );

        /* Draw Player2 */
        this.context.fillRect(
            this.player2.x,
            this.player2.y,
            this.player2.width,
            this.player2.height
        );
        
        /* Draw Ball */
        if ((new Date().getTime() - this.timer >= 1000)){
            this.context.fillRect(
                this.ball.x,
            this.ball.y,
            this.ball.width,
            this.ball.height
            );
        }

        /* Draw the line in the middle */
        this.context.beginPath();
        this.context.setLineDash([7, 15]);
        this.context.moveTo((this.canvas.width / 2), this.canvas.height -140);
        this.context.lineTo((this.canvas.width / 2), 140);
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#ffffff';
        this.context.stroke();

        /* Draw player score */
        this.context.font = '90px Courier New';
        this.context.textAlign = 'center';

        this.context.fillText(
            this.player1.score.toString(),
            (this.canvas.width / 2) - 300,
            200
        );

        this.context.fillText(
            this.player2.score.toString(),
            (this.canvas.width /2) + 300,
            200
        );
        this.context.font = '30px Courier New';

        this.context.fillText(
            'Round ' + (Pong.round + 1),
            (this.canvas.width / 2),
            35
        );

        this.context.font = '40px Courier New';

        this.context.fillText(
            rounds[Pong.round] ? rounds[Pong.round] : rounds[Pong.round - 1],
            (this.canvas.width / 2),
            100
        );  
    },

    loop: function () {

    },

    listen: function () {

    },

    _generateRoundColor: function () {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        if (newColor === this.color) return Pong._generateRoundColor();
        return newColor;
    }
};
var Pong = Object.assign({}, Game);
Pong.initialize();