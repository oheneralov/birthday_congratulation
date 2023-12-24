async function sleep(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, 1000 * delay);
    });
}

async function fadeIn(element) {
    let op = 0;  // initial opacity
    const iter = 40;
    for (let counter = 0; counter <= iter; counter++) {
        await sleep(0.05);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += 1.0 / iter;

    }
}


async function fadeOut(element) {
    let op = 1;  // initial opacity
    const iter = 40;
    for (let counter = 0; counter <= iter; counter++) {
        await sleep(0.05);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= 1.0 / iter;;

    }
}

async function showImages() {
    const dir = 'file:///home/alex/alex/music/frameworkbirthday/images/';
    const images =
        ['1.png', '2.png', '3.png'];
    document.getElementById('scene').opacity = 0;
    for (let image of images) {
        const fullDir = dir + image;
        document.getElementById('scene').src = fullDir;
        await fadeIn(document.getElementById('scene'));
        await sleep(1);
        await fadeOut(document.getElementById('scene'));
        await sleep(1);
    }
}

// saruwakakun.com/en/web-safe-fonts
async function showText() {
    const words =
        ['Merry Christmas!', 'Mr. Moon will congratulate you with Christmas'];
    const elem = document.getElementById('text');
    elem.style.opacity = 0;

    for (let word of words) {
        elem.innerText = word;
        await fadeIn(elem);
        await sleep(2);
        await fadeOut(elem);
        await sleep(2);
    }
}

function shouldPause(interval, pauses) {
    const result = pauses.find(elem => interval >= elem.start && interval <= elem.end);
    if (result === undefined) {
        return false
    }
    return true;
}

async function moveLips(generalPlayTime = 0, pauses) {
    const start = Date.now() / 1000;
    const myAudio = document.getElementById("myAudio");

    const lips = document.getElementById('lips');
    const mouthHeight = lips.height;
    const mouthOpenHeight = 5;
    let timePassed = 0;
    myAudio.play();

    while ( timePassed  < generalPlayTime  ) {
        timeNow =  Date.now() / 1000;
        timePassed =  timeNow - start;
        console.log(timePassed);
        if (shouldPause(timePassed, pauses) === false) {
            lips.height = mouthHeight + mouthOpenHeight; // open mouth
            await sleep(0.2);
            lips.height = mouthHeight;  // close mouth
            await sleep(0.2);
        } 
    }
}
