score = 0
cross = true

audio = new Audio('music.mp3');
audioGameOver = new Audio('gameover.mp3');

setTimeout(()=>{
    audio.play()
}, 1000)

document.onkeydown = function (e) {
    console.log("Keycode is: ", e.keyCode)
    if(e.keyCode == 38){dino = document.querySelector('.dino')
    dino.classList.add('dino-animate')
    setTimeout(()=>{
        dino.classList.remove('dino-animate')
    },700)}
   
    //for right arrow key
    if(e.keyCode == 39){
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left')) 
        dino.style.left = dinoX + 212 + "px"
    }
    //for left arrow key
    if(e.keyCode == 37){
        dino = document.querySelector('.dino')
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left')) 
        dino.style.left = (dinoX - 212) + "px"
    }
}

setInterval(() => {
    dino = document.querySelector('.dino')
    gameover = document.querySelector('.gameover')
    obstacle = document.querySelector('.obstacle')

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'))
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'))

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'))
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'))

    offsetX = Math.abs(dx-ox)
    offsetY = Math.abs(dy-oy)

    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "Game over - Reload to play again."
        obstacle.classList.remove('obstacle-animate')
        audioGameOver.play()
        setTimeout(() => {
            audioGameOver.pause()
            audio.pause()
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1
        updateScore(score)
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000);
        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'))
            newDuration = aniDuration - 0.1 
            obstacle.style.animationDuration = newDuration + 's'
            console.log('new animation duration is: ', newDuration)

        }, 500);
    }
}, 10);

function updateScore(score){
    document.getElementById("score-count").innerHTML = "Your Score: " + score
}
