let x=0; 

// store user data
let user_choices = {}

// just to check if a choice has already been logged
let madeChoice = false

function displaythisstep(){
	$("#step_instructions").empty()
	var new_box=$("<div>")
	$("#step_instructions").text("Your next instruction is: "+drink_info.directions[x])
	console.log(drink_info.directions[x])

	//$(new_box).text(username+" "+tweet)
	//$("#listy").prepend(new_box)
}


$(document).ready(function(){
   displaythisstep()
   $(".ingredient_button").click(function(){

		// log user choice
	   if (!madeChoice) {
			console.log("add choice")

			choice = this.value;
			user_choices[x + 1] = drink_info.match[choice];

			madeChoice = true;
	   }

	   alert("Step completed, proceed to next step.")
   })
   $("#learn_next_step_button").click(function(){

	if(x<parseInt(drink_info.number_steps)-1){
		
		x=x+1
		displaythisstep()
		console.log(x)

		// reset madeChoice
		madeChoice = false
	}
	//else if(x==drink_info.number_steps-1){
		
	//}
	else{
		// get date + time
		let dt = new Date();
		let time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

		// make new entry for backend
		let new_entry = {
			time: time,
			user_choices: user_choices,
			name: drink_info.name
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
		$("#learn_next_step_button").html("Go To Quiz")
		window.location.href = "/quiz/"+drink_info.id;

	}



   })
    //change to dynamically go through steps
    //need iterate through steps and add UI for ingredients
    //remember to transition to the quiz once the user finishes the recipe
})
