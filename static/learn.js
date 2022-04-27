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

function update_step(){
    step = step + 1
    if(step==drink_info.number_steps){//finished the recipe
        step=0
        $.ajax({
            type: "POST",
            url: "../update_step",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(step),
            success: function(result){
                $("#step_label").text("Congratulations! You finished your recipe. ")
                let ref = "window.location.href=" + "'/quiz/"+ drink_info.id + "';";
                $("#step_label").append('<input type="button" id="quiz_button" value="Quiz Me!" onclick="' + ref + '"></input>')
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
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
                $("#step_label").text("Step: " + drink_info.directions[step])
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

function update_cup(ingredient) {
    let new_ingredient = $("<div class = 'cup-ingredient'></div>");

    let color = ingredient_colors[ingredient]["color"];
    let r = color[0].toFixed(4);
    let g = color[1].toFixed(4);
    let b = color[2].toFixed(4);
    let a = color[3].toFixed(4);

    console.log(a);
    new_ingredient.css("background", "rgba("+r+","+g+","+b+","+a+")");

    console.log(new_ingredient.css("background"))
    $(".drink-outline").append(new_ingredient);
}

function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    var channelA = colorChannelA*(amountToMix);
    var channelB = colorChannelB*(1-(amountToMix));
    return parseInt(channelA+channelB);
}

function colorMixer(rgbA, rgbB, amountToMix){
    var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
    var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
    var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
    return [r,g,b,0.9]
}

function whisk() {

    let colors = [];

    $('.drink-outline').children().each(function () {
        colors.push($(this).css( "background" ).match(/\d+\,\s*\d+\,\s*\d+(,\s*\d*\.*\d*)*/i)[0].split(","));
    });

    console.log(colors);

    let finalResult = colors[0];

    for (let i = 1; i < colors.length; i++) {
        const checkAlpha = colors[i][3];
        let alpha = 0;
        if (checkAlpha > finalResult[3]) {
            alpha = checkAlpha;
            finalResult = colorMixer(colors[i], finalResult, alpha);
        } else {
            alpha = finalResult[3];
            finalResult = colorMixer(finalResult, colors[i], alpha);
        }

    }

    const rAvg = finalResult[0];
    const gAvg = finalResult[1];
    const bAvg = finalResult[2];
    const aAvg = finalResult[3];


    $(".drink-outline").children().css({
        "background": "rgb("+rAvg+","+gAvg+","+bAvg+","+aAvg+")"
    });
}

$(document).ready(function(){
    $("#step_label").text("Step: " + drink_info.directions[step])
    $(".ingredient_label").draggable({
        revert: "invalid",
        start: function(e, ui) {
            current_drag = $(this).attr("id")
						//console.log(current_drag)
						//console.log(drink_info.directions[step])

						//$(this).text()
            if(current_drag==drink_info.directions[step]){
                $(this).addClass("acceptable")
            }
        }

    });
    $("#cup").droppable({
        accept: ".acceptable",
        drop: function(event, ui) {
            current_click = current_drag
            current_drag = ""
            if(current_click==drink_info.directions[step]){
                update_step()
                update_cup(current_click)
                console.log("Step completed! new step: " + drink_info.directions[step])
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

            if (current_click == "Whisk") {
                whisk()
            }
        }
    })


})
