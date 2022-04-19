let current_click = ""
let current_drag = ""
/*function run(current_step, current_num){
    console.log("step = " + current_num + ": " + current_step)
    let isTool = 0
    if(current_step.includes("Ingredients")==true){
        isTool++
    }
    if(isTool){
        //fix later 
        return 1
    }
    else{
        //check draggable
        current_ingredient = current_step.substring(4)
        if(current_click==current_ingredient){
            return 1
        }
        return 0
    }
}*/
function mistake(){
    score=score+1
    $.ajax({
        type: "POST",
        url: "../update_score",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(score),
        success: function(result){
            //check that step in server is updating
            //$("#step_label").text("Step: " + drink_info.directions[step])
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
function update_step(){
    step = step + 1
    if(step==drink_info.number_steps){//finished the recipe
        step=0
        console.log("final ajax score=" + score)
        $("#score_label").text("Congratulations! You finished your recipe. ")
        $("#score_label").append('You made ' + score + " mistake(s)")
        $.ajax({
            type: "POST",
            url: "../update_step",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(step),
            success: function(result){
                $("#step_label").text("Steps complete: " + drink_info.number_steps + " out of " + drink_info.number_steps)
                let ref = "window.location.href=" + "'/'";
                $("#score_label").append('<input type="button" id="quiz_button" value="Go to the home page!" onclick="' + ref + '"></input>')
            
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });

        score=-1
        mistake()
    }
    else{
        $.ajax({
            type: "POST",
            url: "../update_step",                
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(step),
            success: function(result){
                //check that step in server is updating
                //$("#step_label").text("Step: " + drink_info.directions[step])
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

$(document).ready(function(){
    //$("#step_label").text("Step: " + drink_info.directions[step])
    $(".ingredient_label").draggable({
        revert: "invalid",
        start: function(e, ui) {
            current_drag = $(this).text()
        }
        
    });
    $("#cup").droppable({
        drop: function(event, ui) {
            current_click = current_drag
            current_drag = ""
            if(current_click==drink_info.directions[step]){
                update_step()
                $("#step_label").text("Steps complete: " + step + " out of " + drink_info.number_steps)
                //console.log("Step completed! new step: " + drink_info.directions[step])
            }
            else{
                console.log("mistake!")
                mistake()
            }
        }
    })
    /*$.each(steps, function( value ) {
        console.log(  steps[value] );
    });*/

    $(".tool_button").click(function(){
        current_click = $(this).val()
        if(current_click==drink_info.directions[step]){
            update_step()
            $("#step_label").text("Steps complete: " + step + " out of " + drink_info.number_steps)
        }
        else{
            console.log("mistake!")
            mistake()
        }
    })
    

})



