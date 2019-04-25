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

var dir;
var crouching;
var jumping;

var player;
var platforms;
var cursors;
var background;
var enemies;
var boss1;
var projectiles;
var score = 0;
var highscore = 0;

var game = new Phaser.Game(config);

function preload() {
    
    this.load.image('sky', 'assets/sky.png');
    this.load.image('brickground', 'assets/brickground.png');
    this.load.image('brick', 'assets/brickloop.png');
    this.load.image('logo', 'assets/smallJumpman.png');
    //this.load.image('coin', 'assets/coin.png');
    //this.load.image('coin', 'assets/coin.png');
    this.load.spritesheet('enemy', 'assets/enemy_gun.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 78, frameHeight: 64 });
    this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 120, frameHeight: 142 });
    this.load.spritesheet('projectile', 'assets/projectile.png', { frameWidth: 8, frameHeight: 8 });
    this.load.image('head', 'assets/head.png');
    this.load.image('coin', 'assets/coin.png');
}

function create() {
    highscore = JSON.parse(localStorage.getItem('highscore'));
    
    dir = 1;
    
    background = this.physics.add.staticGroup();    // make background stationary
    background.create(512, 384, 'sky');             // create background
    
    platforms = this.physics.add.staticGroup();     // make platforms stationary
    enemies = this.physics.add.staticGroup();       // make enemies stationary

    //platforms.create(400, 568, 'wall').setScale(2).refreshBody();

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
    
    
    platforms.create(814, 400, 'brickground');
    platforms.create(782, 400, 'brickground');
    platforms.create(750, 400, 'brickground');
    platforms.create(718, 400, 'brickground');
    platforms.create(686, 400, 'brickground');
    platforms.create(654, 400, 'brickground');
    platforms.create(622, 400, 'brickground');
    platforms.create(590, 400, 'brickground');


    player = this.physics.add.sprite(100, 450, 'player');   // create player
    enemies = this.physics.add.sprite(600, 450, 'enemy');   // create enemy
    
    boss1 = this.physics.add.sprite(300, 200, 'boss');      // create boss
    
    boss1.body.velocity.setTo(200, 200);        // set motion of boss
    boss1.body.bounce.set(1);                   // allow boss to bounce off walls
    
    player.setCollideWorldBounds(true);         // allow player to collide with edges of screen
    player.body.setSize(48, 64, 40, 32);        // set player collision mask
    
    enemies.setCollideWorldBounds(true);        // allow enemies to collide with edges of screen
    
    boss1.setCollideWorldBounds(true);          // allow boss to collide with edges of screen
    
    this.anims.create({ // player walking left animation
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({ // player facing right standing still animation
        key: 'rStill',
        //frames: [ { key: 'player', frame: 6 } ],
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({ // player facing left standing still animation
        key: 'lStill',
        //frames: [ { key: 'player', frame: 5 } ],
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

    cursors = this.input.keyboard.createCursorKeys();   // read keyboard input

    this.physics.add.collider(player, platforms);   // allow collisions between player and platforms
    this.physics.add.collider(player, enemies);     // allow collisions between player and enemies
    this.physics.add.collider(enemies, platforms);  // allow collisions between enemies and platforms
    
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
    
    if (boss1.body.onFloor() || boss1.body.touching.down) {     // flash boss' eyes on when colliding with bottom of screen
        boss1.anims.play('flashOn');
    } else if (boss1.body.velocity.y >= 0) {                    // flash boss' eyes off when reaching peak of jump
        boss1.anims.play('flashOff');
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
        projectiles = this.physics.add.sprite(player.body.position.x, player.body.position.y, 'projectile');
        projectiles.body.setVelocityX(2000*dir);                // set projectile speed to 2000
        projectiles.body.setVelocityY(-10);                     // set projectile vertical speed slightly upward
        this.physics.add.collider(projectiles, enemies);        // allow collisions between projectiles and enemies
    }
    
    saveHighScore();
}

function saveHighScore() {
    if (score >= highscore) {                                       // TODO: replace >= with > once testing done
        localStorage.setItem('highscore', JSON.stringify(score));   // when score is saved, store score locally
    }
}
