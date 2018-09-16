 var selectImg = $('selectImg')
        var selectorInd = false

        //loop to create images
        for (i = 1; i < 5; i++) {
            //add empty container div
            var emptyDiv = $("<div>")

            //add id and class to container
            emptyDiv.attr({id: 'imgCont' + i, value: i})

            //add container class
            emptyDiv.addClass('imgCont')
            emptyDiv.addClass('choices')
            //add new img 
            var Img = $("<img>")

            //set img src attribute and set unique id
            Img.attr({ src: '../assets/images/sw/' + i + '.jpg', id: 'img' + i})

            //add imgs class
            Img.addClass('imgs')

            //append to image class
            emptyDiv.append(Img)
            $('.selectImg').append(emptyDiv)

            //add br to emptyContatiner
            emptyDiv.append($("<br>"))

            //append HP text
            emptyDiv.append($("<div>HP:</div>"))

            //create HP Value div
            var hpCont = $("<span>")
            hpCont.attr('id','hp' + i)

            //append HP div to container
            emptyDiv.append(hpCont)
        }
      
        
        //declare values on all HPs (random from 100-300)
        var hp1 = Math.floor(Math.random()*201+100);
        var hp2 = Math.floor(Math.random()*201+100);
        var hp3 = Math.floor(Math.random()*201+100);
        var hp4 = Math.floor(Math.random()*201+100);

        //create divs connected to display divs
        var hp1Dis = $("#hp1")
        var hp2Dis = $("#hp2")
        var hp3Dis = $("#hp3")
        var hp4Dis = $("#hp4")

        //push hp from hp div to hp Display div
        hp1Dis.text(hp1)
        hp2Dis.text(hp2)
        hp3Dis.text(hp3)
        hp4Dis.text(hp4)

        //declare choosen char variables
        var charID
        var charHP
        var charAP 
        var charAPDis
        var charHPDis

        //declare opponents variables
        var defId;
        var defHP;
        var defAP;
        var defHPDis;
        var defAPDis;
        var choosenDef = false;
        var defenderId 
        var charHPbase

        //results & win lose texts (for displaying attack text)
        var resultsText1
        var resultsText1Dis = $("#resultsText1")
        var resultsText2
        var resultsText2Dis = $("#resultsText2")
        var winlose = $("#winlose")

        //set total defenderCount to 3. this number decreases by 1 every time a defender is defeated (once at 0, indicates the user has won)
        var defenderCount = 3


        //When click on selectImg
        $('.choices').on('click', function () {
     
            //if character has been selected, return
            if (selectorInd === true) {
                return
            }

            //append your image to your image div
            $('.yourImg').append(this)
            $(this).removeClass('choices')
            $(this).addClass('yourChar')

            //append rest of images to enemies div
            $('.enemies').append($('.selectImg'))

            //add enemy class, remove choices class
            $('.choices').addClass('enemy')
            $('.enemy').removeClass('choices')

            //change displayed text
            $('#selectText').text('')
            $('#charText').text('Your Character')
            $('#enemiesText').text('Enemies Available to Attack')

            //find choosen char id, run through if statements, declare AP, HP, displays
            charId = $(this).attr('value')
            console.log('charId is ' + charId)
            charAP = Math.floor(Math.random()*15)+3
            if(charId==1){
                charHP = hp1
                charHPDis = hp1Dis
            }
            if(charId==2){
                charHP = hp2
                charHPDis = hp2Dis
            }
            if(charId==3){
                charHP = hp3
                charHPDis = hp3Dis
            }
            if(charId==4){
                charHP = hp4
                charHPDis = hp4Dis
            }

            //get base AP value (for increasing AP on attacks)
            charAPbase = charAP

            //set selection indicator to true (this keeps user from selecting multiple characters)
            selectorInd = true

        });

        //when a defender is selected
        $(document).on('click', '.enemy', function () {

            //if defender has already been choosen, return
            if(choosenDef===true){
                return
            };

            //set block variable to true
            choosenDef = true;

            //set defender text
            $('.defenderText').text('Defender')

            //add image to defender variable
            $('.defender').append(this)
            
           defenderId =  $(this)

            //find defenders id, run through if statements, declare AP, HP, displays
            defAP = Math.floor(Math.random()*30)+10

            defId = $(this).attr('value')
            
            if(defId==1){
                defHP = hp1
                defHPDis = hp1Dis
            }
            if(defId==2){
                defHP = hp2
                defHPDis = hp2Dis
            }
            if(defId==3){
                defHP = hp3
                defHPDis = hp3Dis
            }
            if(defId==4){
                defHP = hp4
                defHPDis = hp4Dis
            }
        });
        
        //when attack button is clicked
        $("#attackBtn").on('click', function(){
            //if no defender has been choosen, return false
            if(choosenDef===false){
                return
            }
            
            //decrease HP of defender
            defHP = (defHP-charAP)
            defHPDis.text(defHP)
            
            //set text results for attack
            resultsText1 = 'You attacked your opponent with ' + charAP + ' attack power.'
            resultsText1Dis.text(resultsText1)

            //if defenders HP is under 0
            if(defHP <= 0){
                //set defender text
                $('#defeatedText').text('Defeated')

                //add image to defender variable
                $('.defeated').append(defenderId)

                //reset choosen defender to false
                choosenDef = false

                //reset text displays
                resultsText1Dis.text('')
                resultsText2Dis.text('')
                $('.defenderText').text('')

                //deduct one from remaining defender count
                defenderCount = (defenderCount - 1)

                //if there are no more defenders
                if(defenderCount===0){
                    winlose.text('You have won!! Press Reset to play again')
                }
                return
            }

            //decrease HP of yourChar
            charHP = (charHP-defAP)
            charHPDis.text(charHP)
            
            //increase AP of charAP
            charAP = (charAP + charAPbase)
            
            //set text results for opponent attack
            resultsText2 = 'Your opponent countered your attack by attacking you with ' + defAP + ' attack power.'
            resultsText2Dis.text(resultsText2)
            if(charHP <= 0){
                winlose.text('You have lost!. Press Reset to play again.')
                $('.defeated').append($('.yourImg'))
                $('.defenderText').text('Champion')
                $('#charText').text('Defeated')
                resultsText1Dis.text('')
                resultsText2Dis.text('')
                $('.defenderText').text('')
                return
            }

        });

        //reset button
        $(document).on('click','#resetBtn',function(){
            location.reload();
        });
