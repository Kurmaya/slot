const iconWidth = 79,
 iconHeight = 79,
 numIcons = 9,
 time_per_icon = 100,
 indexes = [ 0 , 0 , 0],
 nameIndex =["Banana" , "Seven", "Cherry", "Berry", "Orange", "Bell","Bar", "Lemon", "Watermelon"];

const roll = (reel , offset = 0) => {
const delta = (offset + 2 )* numIcons + Math.round(Math.random()* numIcons) ;
const style = getComputedStyle(reel),
backgroundPositionY = parseFloat(style['backgroundPositionY']),
targetBackgroundPositionY = backgroundPositionY + delta * iconHeight,
normalTargetBackgroundPositionY = targetBackgroundPositionY%(numIcons * iconHeight);

return new Promise((resolve , reject)=> {

    reel.style.transition = `background-position-y ${8 + delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
    reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
    


    setTimeout(() => {
        reel.style.transition=`none`;
        reel.style.backgroundPositionY = `${normalTargetBackgroundPositionY}px`;
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
    .all( [...reelsList].map((reel,i) => roll(reel,i)) )
    .then((deltas)=> {
        deltas.forEach((delta,i)=>indexes[i] =(indexes[i] + delta)%numIcons);
        indexes.map((index) => {console.log(nameIndex[index],indexes)})
        document.querySelector('.roll').disabled=false;
        if (indexes[0] == indexes[1] || indexes[1] == indexes[2]){
            console.log('WIN WIN WIN');
            alert('WIN WIN WIN!');
        }
    })
    //check win conditions

    // [...reelsList].map((reel , i )=> {

    //     console.log(reel,i);
    //     roll(reel , i).then((delta) => {console.log(delta)});
    // })
}
document.querySelector('.roll').addEventListener('click',rollAll);