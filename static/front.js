$(document).ready(function(){
    $("#update").append(drink_info.name)
    $("#update").append('<div id="tools">tools</div>')//add tools
    $("#update").append('<div id="ingredients">ingredients</div>')//add ingredients
    $("#update").append('<input type="button" class="make" value="Make this drink"></input>')
    $(".make").click(function() {
        let ref = '/learn' + "/" + drink_info.id
        location.href = ref;
    })
})