$(document).ready(function(){
    $("#update").append('<input type="button" class="make"  style = "width: 150px" value="Make this drink"></input>')
    $(".make").click(function() {
        let ref = '/front' + "/" + drink_info.id
        location.href = ref;
    })
})
