const iconWidth = 79,
 iconHeight = 79,
 numIcons = 9,
 time_per_icon = 100,
 indexes = [ 0 , 0 , 0];

const roll = (reel , offset = 0) => {
const delta = (offset + 2 )* numIcons + Math.round(Math.random()* numIcons) ;
const style = getComputedStyle(reel),
backgroundPositionY = parseFloat(style['backgroundPositionY']);
return new Promise((resolve , reject)=> {

    reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms`;
    reel.style.backgroundPositionY = `${backgroundPositionY + delta *iconHeight}px`;
    setTimeout(() => {
        resolve(delta%numIcons)
    }, 8 + delta * time_per_icon)
})

};

function rollAll() {
    const reelsList = document.querySelectorAll('.slots > .reel');
    document.querySelector('.roll').disabled = true;
    // setTimeout(()=>{
        
    // },4000);
    Promise
    .all([...reelsList].map((reel,i) => roll(reel,i)))
    .then((deltas)=> {
        deltas.forEach((delta,i)=>indexes[i] =(indexes[i] + delta)%numIcons);
        console.log(indexes)
        document.querySelector('.roll').disabled=false;
    })
    // [...reelsList].map((reel , i )=> {

    //     console.log(reel,i);
    //     roll(reel , i).then((delta) => {console.log(delta)});
    // })
}
document.querySelector('.roll').addEventListener('click',rollAll);