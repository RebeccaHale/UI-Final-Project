let num_correct = 0
let current_step = 0
$(document).ready(function(){
    //need iterate through steps and add UI for ingredients
    //need to add back end saving of user input, keeping track of user quiz score
    
    for(x of drink_info.ingredients){
        element = document.getElementById(x)
        element.onclick = function(){checkAnswer(this)};
        
    }

    for(x of drink_info.tools){
        element = document.getElementById(x)
        element.onclick = function(){checkAnswer(this)};
    }
})


function checkAnswer(button){
    //console.log(x.value)
    choice = button.value
    $("#chosen_step").empty()
    if(drink_info.directions[current_step] == drink_info.match[choice]){
        //corect answer
        num_correct = num_correct+1
        $("#chosen_step").text("Correct! You chose: "+ choice)
	
    }   
    else{
        //wrong answer
        console.log("wrong answer")
        $("#chosen_step").text("Incorrect! You chose:" + choice  + ". Correct answer is:" + drink_info.directions[current_step])
	

    }
    $("#current_score").text(num_correct+ "/" + drink_info.number_steps)
	current_step = current_step+1
    if(current_step == drink_info.number_steps){
        //end of quiz
        //do something else
    }
	console.log(drink_info.directions[x])

    

}
