var chars = ["Michael Scott", "Jim Halpert","Dwight Schrute"]

function renderButtons(){
    $('#office-input').empty();
    for (var i = 0; i < chars.length; i++) {
        console.log(chars[i]);
        $("#office-input").append("<button>" + chars[i] + "</button>");
      }

}

$('#add-office').on('click',function(event){
    event.preventDefault();
    var office = $("#office-input").val().trim();
    office.push(office);

    renderButtons();
});