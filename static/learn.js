let x=0; 

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
   $("#learn_next_step_button").click(function(){
	if(x<parseInt(drink_info.number_steps)-1){
		
		x=x+1
		displaythisstep()
		console.log(x)
	}
	//else if(x==drink_info.number_steps-1){
		
	//}
	else{
		$("#learn_next_step_button").html("Go To Quiz")
		window.location.href = "/quiz/"+drink_info.id;

	}



   })
    //change to dynamically go through steps
    //need iterate through steps and add UI for ingredients
    //need to add back end saving of user input
    //remember to transition to the quiz once the user finishes the recipe
})
