$(document).ready(function(){
    $("#update2").append('<br>')
    $("#update2").append('<br>')
    $("#update2").append('<input type="button" class="make"  style = "width: 150px" value="Learn Recipe"></input>')
    $("#update2").append('<br>')
    $("#update2").append('<br>')
    $("#update2").append('<input type="button" class="make2"  style = "width: 150px" value="Recipe Quiz"></input>')
    
    $(".make").click(function() {
        let ref = '/front' + "/" + drink_info.id
        location.href = ref;
    })
    $(".make2").click(function() {
        let ref = '/quiz' + "/" + drink_info.id
        location.href = ref;
    })
})

