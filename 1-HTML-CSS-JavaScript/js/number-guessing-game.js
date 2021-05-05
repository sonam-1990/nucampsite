function runGame(){
    let guessstring='';
    let guessnumber=0;
    let correct=false;
    let numtries=0;

    const randomnumber=Math.random() *100;
    const randominteger=Math.floor(randomnumber);
    const target = randominteger+1;
    do{
        guessstring = prompt('I am thinking of range between 1-100\n\n What is a number?');
        if (guessstring === null) {
            return;
        }
        guessnumber= +guessstring;
        
        numtries +=1;
        correct=checkGuess(guessnumber,target);

    }while(!correct);

    alert('You Got IT! The number was '+ target +'\n\n It took u'+ numtries +'tries to guess correctly');
}
function checkGuess(guessnumber,target){
    let correct=false;
    if(isNaN(guessnumber)){
        alert('Guess must me number\n\n ENter the number between 1-100 range');
    } else if((guessnumber < 1) ||(guessnumber > 100) ) {
        alert('The number is not in range/n/n Enter the number between 1-100 range');
    } else if(guessnumber > target) {
        alert('The number is too Large!');
    } else if(guessnumber < target) {
        alert('The number is too Small!');
    }else {
        correct=true;
    }
    return correct;


}
