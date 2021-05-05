function rollDice(){
    let goldcoins=0;
    for(let i=0;i<10;i++){
        const roll=Math.floor(Math.random()*6 )+1;
        alert('YOU roll a  '+roll+'.');
        if(roll===1){
            alert('Game over,no more rolls!');
            break;
        }

        if(roll<4){
            continue;
        }
        if(roll===4)  {
            if(goldcoins>0){
            goldcoins--;
            alert('gold coin-1');
            }
            continue;
        }
       
         
         goldcoins+=roll;
        alert('Congratuations! You win '+roll+'goldcoin');
        alert('You have won a total of  '+goldcoins+' goldcoins');
         
       
    }
    

}