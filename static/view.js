$(document).ready(function(){
    $("#update2").append('<br>')
    $("#update2").append('<br>')
    $("#update2").append('<input type="button" class="make buttoncolors LearnRecipe"  style = "width: 150px" value="Learn Recipe"></input>')
    $("#update2").append('<br>')
    $("#update2").append('<br>')
    $("#update2").append('<input type="button" class="make buttoncolors RecipeQuiz"  style = "width: 150px" value="Recipe Quiz"></input>')

    $(".LearnRecipe").click(function() {
        let ref = '/front' + "/" + drink_info.id
        location.href = ref;
    })
    $(".RecipeQuiz").click(function() {
        let ref = '/quiz' + "/" + drink_info.id
        location.href = ref;
    })
})
