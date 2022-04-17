// variables for quiz step checking
let current_step = 0
let quiz_over = false

// log for user choices
let user_choices = {}

$(document).ready(function(){

    // click listeners
    for(x of drink_info.ingredients){
        element = document.getElementById(x)
        element.onclick = function(){checkAnswer(this)};
        
    }

    for(x of drink_info.tools){
        element = document.getElementById(x)
        element.onclick = function(){checkAnswer(this)};
    }

})

// check answer
function checkAnswer(button){
    
    // if the quiz is not finished
    if (!quiz_over) {
        // get user choice
        choice = button.value
        $("#chosen_step").empty()

        // store user choice
        user_choices[current_step + 1] = drink_info.match[choice];

        // if correct answer is chosen
        if(drink_info.directions[current_step] == drink_info.match[choice]){

            // increment num correct
            num_correct = num_correct + 1

            // display feedback
            $("#chosen_step").text("Correct! You chose: "+ choice)
        
        }   

        // if wrong answer is chosen
        else{
            
            // display feedback
            $("#chosen_step").text("Incorrect! You chose: " + choice  + ". Correct answer is: " + drink_info.directions[current_step])

        }

        // move on to next step
        current_step = current_step + 1
    }

    // display new score
    $("#current_score").text(num_correct+ "/" + drink_info.number_steps)
    

    // if the quiz has been finished, just move on
    if (quiz_over) {
        console.log("Quiz already over!")
    }

    // if the quiz just finished, log the user choices to backend
    else if (current_step == drink_info.number_steps){

        // display feedback
        $("#chosen_step").text("Congrats! You finished the quiz. Score: ")
        $("#exit").text("Click on a drink type in the navigation bar to exit.")
        // set quiz over
        quiz_over = true

        // get date + time
        let dt = new Date();
        let time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

        // make new entry for backend
        let new_entry = {
            time: time,
            user_choices: user_choices,
            name: drink_info.name,
            score: num_correct
        }

        // ajax post
        $.ajax({
            type: "POST",
            url: "add",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(new_entry),
            success: function(result){
                console.log(result);
                console.log(result["user_choices"])
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
        

    } 
    
}



