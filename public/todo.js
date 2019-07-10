
//toggling from line-through and color
$("ul").on("click","li",function(){
    $(this).toggleClass("completed");
});

//deleting the todo item
$("ul").on("click","#delete",function(event){
    $(this).parent().fadeOut(200,function(){
        $(this).remove();
    });
    event.stopPropagation();
});

// $("#addbutton").click(function(){
//     var newTodo = $("#addtext").val();
//     if(newTodo!==""){
//         $(".thelist").append("<li>" + newTodo + "<span><i class='fas fa-trash'></i></span></li>");
//     }
//     $("#addtext").val("");
// });

$(".fa-plus").click(function(){
    $("#addDiv").fadeToggle();
});
