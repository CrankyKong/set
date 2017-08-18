var deck = [];
var presentSets = [];
var board = [];
var selected = [];
var colors = ['red', 'purple', 'green']; 
var shapes = ['squiggle', 'diamond', 'circle'];
var fills = ['solid', 'stripe', 'clear'];
var numbers = [1, 2, 3];

function main(){
    createDeck();
    //console.log(deck.length);
    /*****ShuffleArray commented out for testing check Set *******/
    //shuffleArray(deck);
    for(i=0;i<12;i++){
        board.push(deck[i]);
    }
    //console.log(board);
    var result = [1,2,3];
    console.time(isSetPresent);
    isSetPresent(board, 3, 0, result);
    console.timeEnd(isSetPresent);
    console.log(presentSets);
    //    var isSet = checkSet(deck[0], deck[1], deck[2]);
    //    console.log(deck[0], deck[1], deck[2] );
    //    console.log(isSet);
    for(i = 0; i < board.length; i++){
        var anotherOne = i+1;
        var spot = "spot" + anotherOne;
        var ele = document.getElementById(spot);
        ele.innerHTML = deck[i].display();
        var attShape = document.createAttribute("data-shape");
        attShape.value = deck[i].shape;
        ele.setAttributeNode(attShape);

        var attColor = document.createAttribute("data-color");
        attColor.value = deck[i].color;
        ele.setAttributeNode(attColor);

        var attFill = document.createAttribute("data-fill");
        attFill.value = deck[i].fill;
        ele.setAttributeNode(attFill);

        var attNum = document.createAttribute("data-number");
        attNum.value = deck[i].number;
        ele.setAttributeNode(attNum);
    }
}
   
var Card = function (color, shape, number, fill){
    "use strict"
    this.color = colors[color];
    this.shape = shapes[shape];
    this.number = numbers[number];
    this.fill = fills[fill];
    this.display = function(){
         return this.color + " " + this.shape + " " + this.number + " " + this.fill;
    }
}

function createDeck(){
    for(i=0; i< 3; i++){
        for(j=0; j<3; j++){
            for(k=0; k<3; k++){
                for(l=0; l<3; l++){
                    var card2 = new Card(i,j,k,l);
                    deck.push(card2);
                }
            }
        }
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function checkSet(cardA,cardB,cardC){
    if((cardA.color == cardB.color && cardA.color == cardC.color && cardB.color == cardC.color) || (cardA.color != cardB.color && cardA.color != cardC.color && cardB.color != cardC.color)){
     //console.log("color pass");
        if((cardA.shape == cardB.shape && cardA.shape == cardC.shape) || (cardA.shape != cardB.shape && cardA.shape != cardC.shape && cardB.shape != cardC.shape)){
         //console.log("shape pass");
            if((cardA.fill != cardB.fill && cardA.fill != cardC.fill && cardB.fill != cardC.fill) || (cardA.fill == cardB.fill && cardA.fill == cardC.fill)){
             //console.log("fill pass");
                if((cardA.number == cardB.number && cardA.number == cardC.number) || (cardA.number != cardB.number && cardA.number != cardC.number && cardB.number != cardC.number)){
                 //console.log("number pass");    
                    return true;
                }
            }
        }
    }       
    return false;       
}

function isSetPresent(arr, len, startPosition, result){
    if (len == 0){
        var bool = checkSet(result[0], result[1], result[2]);
        //console.log(result[0], result[1], result[2]);
        if(bool){
            var smallArray = [result[0], result[1], result[2]];
            presentSets.push(smallArray);  
        }
        return;
    }  
    for (var i = startPosition; i <= arr.length-len; i++){
        result[result.length - len] = arr[i];
        isSetPresent(arr, len-1, i+1, result);
    }
}

function select(ele){
    //console.log(ele);
    if (ele.className){
        ele.className = "";
    }
    else if(selected.length < 3){
        ele.className += "selected"; 
        var selectedCard = new Card(colors.indexOf(ele.dataset.color), shapes.indexOf(ele.dataset.shape), numbers.indexOf(ele.dataset.number), fills.indexOf(ele.dataset.fill));
        console.log(selectedCard);
        selected.push(selectedCard);
        console.log(selected);
    }
}

function dealCards(spots){
    console.log(spots);
}

function checkSelectedSet(){
    if(checkSet(selected[0], selected[1], selected[2])){
        console.log("ITS A SET");
        var spots = [];
        var selCards = document.getElementsByClassName('selected');
        for(i = 0; i < selCards.length; i++){
            spots.push(selCards[i].id);
        }
        dealCards(spots);
    }
    else{
        console.log("NOT A SET!");
    }
    selected = [];
    
}
