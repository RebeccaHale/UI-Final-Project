$(document).ready(function(){
    $("#update").append(drink_info.name)
    $("#update").append('<input type="button" class="make" value="Make this drink"></input>')
    $(".make").click(function() {
        let ref = '/front' + "/" + drink_info.id
        location.href = ref;
    })
})