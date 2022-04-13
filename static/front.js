$(document).ready(function(){
    $("#update").append(drink_info.name)
    $("#update").append('<div id="tools">tools:</div>')//add tools by iterating through array stored by server
    $("#update").append('<div id="ingredients">ingredients:</div>')//add ingredients by iterating through array stored by server
    //images for all tools and ingredients are in a data set in the server and are accessible by name
    $("#update").append('<input type="button" class="make" value="Start this recipe"></input>')
    $(".make").click(function() {
        let ref = '/learn' + "/" + drink_info.id
        location.href = ref;
    })
})
