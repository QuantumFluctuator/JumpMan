var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

audio: {
        disableWebAudio: true
    }


var dir;
var crouching;
var jumping;
var coins;
var player;
var platforms;
var cursors;
var background;
var enemies;
var projectiles;
var score = 0;
var highscore = 0;
var heads;
var scoreText, highScoreText;

var game = new Phaser.Game(config);

function preload() {
    
    this.load.image('sky', 'assets/bg3.png');
    this.load.image('box', 'assets/16by16box.png');
    this.load.image('brickground', 'assets/brickground.png');
    this.load.image('brick', 'assets/brickloop.png');
    this.load.image('logo', 'assets/smallJumpman.png');
    this.load.spritesheet('enemy', 'assets/enemy_gun.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 78, frameHeight: 64 });
    this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 120, frameHeight: 142 });
    this.load.spritesheet('projectile', 'assets/projectile.png', { frameWidth: 8, frameHeight: 8 });
    this.load.image('head', 'assets/head.png');
    this.load.image('coin', 'assets/coin.png');
    
    
}

function create() {
    highscore = localStorage.getItem('highscore');
    
    dir = 1;
    
    background = this.physics.add.staticGroup();    // make background stationary
    background.create(512, 384, 'sky');             // create background
    
    platforms = this.physics.add.staticGroup();     // make platforms stationary
    enemies = this.physics.add.staticGroup();       // make enemies stationary

    //platforms.create(400, 568, 'wall').setScale(2).refreshBody();

    //platforms.create(400, 600, 'brickground');             // create platforms
    //platforms.create(464, 600, 'brickground');
    //platforms.create(600, 400, 'brickground');
    //platforms.create(664, 400, 'brickground');
    //platforms.create(150, 375, 'brickground');
    //platforms.create(114, 375, 'brickground');
    //platforms.create(50, 250, 'brickground');
    //platforms.create(50, 250, 'brickground');
    //platforms.create(750, 220, 'brickground');
    //platforms.create(814, 220, 'brickground');
    //platforms.create(500, 700, 'brickground');
    //platforms.create(564, 700, 'brickground');
    //platforms.create(300, 550, 'brickground');
    //platforms.create(364, 550, 'brickground');
    
    platforms.create(950,  30, 'logo');
    
    platforms.create(1006, 752, 'brickground');
    platforms.create(974, 752, 'brickground');
    platforms.create(942, 752, 'brickground');
    platforms.create(974, 752, 'brickground');
    platforms.create(910, 752, 'brickground');
    platforms.create(878, 752, 'brickground');
    platforms.create(846, 752, 'brickground');
    platforms.create(814, 752, 'brickground');
    platforms.create(782, 752, 'brickground');
    platforms.create(750, 752, 'brickground');
    platforms.create(718, 752, 'brickground');
    platforms.create(686, 752, 'brickground');
    platforms.create(654, 752, 'brickground');
    platforms.create(622, 752, 'brickground');
    platforms.create(590, 752, 'brickground');
    platforms.create(558, 752, 'brickground');
    platforms.create(526, 752, 'brickground');
    platforms.create(494, 752, 'brickground');
    platforms.create(462, 752, 'brickground');
    platforms.create(430, 752, 'brickground');
    platforms.create(398, 752, 'brickground');
    platforms.create(366, 752, 'brickground');
    platforms.create(334, 752, 'brickground');
    platforms.create(302, 752, 'brickground');
    platforms.create(270, 752, 'brickground');
    platforms.create(238, 752, 'brickground');
    platforms.create(206, 752, 'brickground');
    platforms.create(174, 752, 'brickground');
    platforms.create(142, 752, 'brickground');
    platforms.create(110, 752, 'brickground');
    platforms.create(78, 752, 'brickground');
    platforms.create(46, 752, 'brickground');
    platforms.create(14, 752, 'brickground');
    

    
    
    platforms.create(366, 300, 'brickground');
    platforms.create(334, 300, 'brickground');
    platforms.create(302, 300, 'brickground');
    platforms.create(270, 300, 'brickground');
    
    platforms.create(398, 600, 'brickground');
    platforms.create(366, 600, 'brickground');
    platforms.create(334, 600, 'brickground');
    platforms.create(302, 600, 'brickground');
    platforms.create(270, 600, 'brickground');
    platforms.create(238, 600, 'brickground');
    platforms.create(206, 600, 'brickground');
    platforms.create(174, 600, 'brickground');
    platforms.create(142, 600, 'brickground');
    platforms.create(110, 600, 'brickground');
    platforms.create(78,  600, 'brickground');
    platforms.create(46,  600, 'brickground');
    platforms.create(14,  600, 'brickground');

    platforms.create(680, 150, 'brick');
    platforms.create(648, 150, 'brick');
    platforms.create(616, 150, 'brick');
    
    platforms.create(814, 432, 'brick');
    platforms.create(814, 400, 'brick');
    platforms.create(814, 368, 'brick');
    platforms.create(814, 336, 'brick');
    platforms.create(814, 304, 'brick');
    platforms.create(782, 432, 'brick');
    platforms.create(782, 400, 'brick');
    platforms.create(782, 368, 'brick');
    platforms.create(782, 336, 'brick');
    platforms.create(750, 432, 'brick');
    platforms.create(750, 400, 'brick');
    platforms.create(750, 368, 'brick');
    platforms.create(750, 336, 'brick');
    platforms.create(718, 432, 'brick');
    platforms.create(718, 400, 'brick');
    platforms.create(718, 368, 'brick');
    platforms.create(686, 432, 'brick');
    platforms.create(686, 400, 'brick');
    platforms.create(686, 368, 'brick');
    platforms.create(654, 432, 'brick');
    platforms.create(654, 400, 'brick');
    platforms.create(622, 432, 'brick');
    platforms.create(622, 400, 'brick');
    platforms.create(590, 432, 'brick');
    platforms.create(558, 432, 'brick');

    platforms.create(400, 576, 'box');
    platforms.create(360, 276, 'box');
    
    player = this.physics.add.sprite(100, 450, 'player');   // create player
    enemies = this.physics.add.sprite(600, 450, 'enemy');   // create enemy
    
    player.setCollideWorldBounds(true);         // allow player to collide with edges of screen
    player.body.setSize(48, 64, 40, 32);        // set player collision mask
    
    enemies.setCollideWorldBounds(true);        // allow enemies to collide with edges of screen
    
    
    this.anims.create({ // player walking left animation
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({ // player facing right standing still animation
        key: 'rStill',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({ // player facing left standing still animation
        key: 'lStill',
        frames: this.anims.generateFrameNumbers('player', { start: 16, end: 19 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({ // player walking right animation
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({ // player facing right standing still animation
        key: 'rJump',
        frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23 }),
        frameRate: 5
    });
    
    this.anims.create({ // player facing right standing still animation
        key: 'lJump',
        frames: this.anims.generateFrameNumbers('player', { start: 24, end: 27 }),
        frameRate: 5
    });
    
    this.anims.create({ // player facing right standing still animation
        key: 'rFall',
        frames: this.anims.generateFrameNumbers('player', { start: 28, end: 29 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({ // player facing right standing still animation
        key: 'lFall',
        frames: this.anims.generateFrameNumbers('player', { start: 30, end: 31 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({ // boss flashing eyes on animation
        key: 'flashOn',
        frames: this.anims.generateFrameNumbers('boss', { start: 1, end: 3}),
        frameRate: 5
    });
    
    this.anims.create({ // boss flashing eyes off animation
        key: 'flashOff',
        frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3}),
        frameRate: -5
    });
    
    //  Some coins to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    heads = this.physics.add.group();
    projectiles = this.physics.add.group();
     //  The score
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    highScoreText = this.add.text(16, 48, 'High Score: 0', {fontSize: '32px', fill: '#000'});
    coins = this.physics.add.group({
        key: 'coin',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
     coins.children.iterate(function (child) {

        //  Give each coin a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    cursors = this.input.keyboard.createCursorKeys();   // read keyboard input

    this.physics.add.collider(player, platforms);   // allow collisions between player and platforms
    this.physics.add.collider(player, enemies);     // allow collisions between player and enemies
    this.physics.add.collider(enemies, platforms);  // allow collisions between enemies and platforms
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(heads, platforms);
    
    
    //  Checks to see if the player overlaps with any of the coins, if he does call the collectcoins function
    this.physics.add.overlap(player, coins, collectcoins, null, this);
    

    this.physics.add.collider(player, heads, hitHead, null, this);
}

function update() {
    if (cursors.left.isDown && !crouching) {            // move left if left is pressed and player is not crouching
        player.setVelocityX(-160);
        dir = -1;
        
        if (!jumping) {
            player.anims.play('left', true);
        } else if (player.body.velocity.y < 0) {
            player.anims.play('lJump', true);
        } else {
            player.anims.play('lFall', true);
        }
    } else if (cursors.right.isDown && !crouching) {    // move right if right is pressed and player is not crouching
        player.setVelocityX(160);
        dir = 1;
        
        if (!jumping) {
            player.anims.play('right', true);
        } else if (player.body.velocity.y < 0) {
            player.anims.play('rJump', true);
        } else {
            player.anims.play('rFall', true);
        }
    } else {                                            // if neither right nor left is pressed, stand still
        player.setVelocityX(0);
        
        if (dir === 1) {                                // if player was previously walking right, face right
            if (player.body.velocity.y === 0) {
                player.anims.play('rStill');
            } else if (player.body.velocity.y < 0) {
                player.anims.play('rJump', true);
            } else {
                player.anims.play('rFall', true);
            }
        } else if (dir === -1) {                        // else if player was previously walking left, face left
            if (player.body.velocity.y === 0) {
                player.anims.play('lStill');
            } else if (player.body.velocity.y < 0) {
                player.anims.play('lJump', true);
            } else {
                player.anims.play('lFall', true);
            }
        }
    }
    
    if (player.body.onFloor() || player.body.touching.down) {   // if player is on ground, set jumping to false
        jumping = false;
    }

    if (cursors.up.isDown && (player.body.onFloor() || player.body.touching.down)) {    // if player is on the ground and up is being pressed, jump
        player.setVelocityY(-500);
        jumping = true;
    }
    
    if (cursors.down.isDown && !jumping) {                      // if player is not in air and is holding down, crouch
        crouching = true;
    } else {                                                    // else set crouching to false
        crouching = false;
    }
    
    if (cursors.space.isDown) {                                 // if space is being pressed, create projectile at player's coordinates
        var projectile = projectiles.create(player.body.position.x+32, player.body.position.y+32, 'projectile');
        projectile.body.setVelocityX(2000*dir);                // set projectile speed to 2000
        projectile.body.setVelocityY(-10);                     // set projectile vertical speed slightly upward
    }
    
    saveHighScore();
}

function saveHighScore() {
    if (score > highscore) {
        localStorage.setItem('highscore', score);   // when score is saved, store score locally
    }
}

function killheads (head, projectiles) {
    head.disableBody(true, true);
    projectiles.disableBody(true, true);
}

function collectcoins (player, coin)
{
    coin.disableBody(true, true);

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    highScoreText.setText('High Score: ' + score);

    if (coins.countActive(true) === 0)
    {
        //  A new batch of coins to collect
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var head = heads.create(x, 16, 'head');
        head.setBounce(1);
        head.setCollideWorldBounds(true);
        head.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.physics.add.overlap(head, projectiles, killheads, null, this);
    }
}


function hitHead (player, head)
{
    this.physics.pause();

    player.setTint(0xff0000);
    
    if (dir == 1) {
        player.anims.play('rStill');
    } else if (dir == -1) {
        player.anims.play('lStill');
    }

    gameOver = true;
}

