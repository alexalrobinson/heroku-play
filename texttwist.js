$(document).ready(function(){
  let score = 0;
  let words = [];
  let currentdisplay = [];
  let wordlength = 0;
  let filler = "<i class=\"fas fa-ghost\"></i>&nbsp;"
  let line = "";
  function newGame(rack){
	  document.querySelector("#alert").classList.add("d-none");
    score = 0;
	  currentdisplay = [];
    words = [];
	  document.querySelector("p").classList.remove("d-none");
	  $("#words").html('');
	  $("#alert").html('');
    $("#newGame").html('<i class="fas fa-sync"></i>');
    //alert(rack["words"]);
    words = rack["words"].split("@@");
    wordlength = words[0].length;
    for(var i = 0; i < words.length; i++){
      line = filler.repeat(wordlength);
      currentdisplay[i] = line;
	    $("#words").append('<li class=\"list-group-item text-center bg-dark text-white\">'+currentdisplay[i]+'</li>');
    }
    document.querySelector("#twistedtext").innerHTML = rack["rack"];
  }
	
  $("#newGame").on("click", function(){
    $.ajax({
      method: "GET",
      url: "api.php?button=newGame",
      dataType: 'json',
      success: data=>{ newGame(data)}
    });
  });
  
	$("#guess").on("change", function(){
    if(score < words.length){
	    document.querySelector("#alert").classList.add("d-none");
      let guess = document.querySelector("#guess").value.toUpperCase();
      $("#alert").html('');
      for(var i = 0; i < words.length; i++){
	      if(guess === words[i] && guess !== currentdisplay[i]){
	        score++;
	        currentdisplay[i] = words[i];
	        $("#words").html('');
	        for(var i = 0; i < words.length; i++){
	          $("#words").append('<li class=\"list-group-item text-center bg-dark text-white\">'+currentdisplay[i]+'</li>');
	        }
	        if (score === words.length){
	          $("#alert").html('You win!');
		        document.querySelector("#alert").classList.remove("d-none");
          }
	      }
	      else{
	        $("#alert").html('Incorrect guess!');
	        document.querySelector("#alert").classList.remove("d-none");
        }
      }
	  }
  });
})
