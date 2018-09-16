 //declare game variables
 var ranNumDis = $("#ranNum");
 var score = $("#score");
 var winCount = $("#wins");
 var loseCount = $("#losses")
 var scoreVal = 0
 var winVal = 0
 var loseVal = 0
 var numb = 0
 
 //loop to create images
 for(i=1; i<5; i++){

     //add new img 
     var crysImg = $("<img>")

     //set img src attribute and set unique id
     crysImg.attr({src:'../assets/images/crystal/crystal.jpg', id: 'btn' + i})

     //add imgs class
     crysImg.addClass('imgs')

     //append to crystals class
     $('.crystals').append(crysImg)

 }
 //call new game
 newGame();

 //new game function
 function newGame(){
     console.log("------NEW GAME-------")

     //determine random number
     numb = Math.floor(Math.random()*100+19)

     //find random button values
     var btnNum1 = Math.floor(Math.random()*11)+1;
     var btnNum2 = Math.floor(Math.random()*11)+1;
     var btnNum3 = Math.floor(Math.random()*11)+1;
     var btnNum4 = Math.floor(Math.random()*11)+1;

     //declare button value
     $("#btn1").val(btnNum1)
     $("#btn2").val(btnNum2)
     $("#btn3").val(btnNum3)
     $("#btn4").val(btnNum4)

     //log info 
     console.log("button1 value: " + $("#btn1").val())
     console.log("button2 value: " + $("#btn2").val())
     console.log("button3 value: " + $("#btn3").val())
     console.log("button4 value: " + $("#btn4").val())

     //display random number
     ranNumDis.text(numb)
 };

 //when button is clicked
 $(".imgs").on("click", function(){
     console.log(this)
     //log info
     console.log("---new btn pushed---")
     console.log("The pressed button's value is " + this.value)

     //declare/display new score
     console.log("the user's previous score is " + scoreVal)
     console.log("the new number to add to that score is " + this.value)
     scoreVal = (scoreVal + parseInt(this.value))
     score.text(scoreVal)

     //log info
     console.log("new score value: " + scoreVal)
     console.log("choosen number value: " + numb)

     //if users total goes over (lose)
     if(scoreVal > numb){
         ++loseVal
         loseCount.text(loseVal)  
         scoreVal = 0
         score.text(scoreVal)
         newGame();

     }

     //if users total is equal to chosen number (win)
     if(scoreVal===numb){
         ++winVal
         winCount.text(winVal)
         scoreVal = 0
         score.text(scoreVal)
         newGame();

     };

 });
