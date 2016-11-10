	var template = '<div class="col s12 m4">'+
						'<div class="card horizontal">'+
							'<div class="card-stacked">'+
								'<div class="card-content yellow darken-1">'+
									'<p class="white-text">Hi, my name <strong>{{name}}</strong>.</p>'+
								'</div>'+
								'<div class="card-action">'+
									'<a class="about yellow-text darken-1" data-show-url="{{url}}">See more about me</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';

var datos = function(response){
	$("#total").text(response.results.length);
	var personajes = "";
	$.each(response.results, function(i, personaje){
		personajes+= template
		.replace("{{name}}", personaje.name)
		.replace("{{url}}", personaje.url);
	});
	$("#people").html(personajes);
	$("#next").attr("data-url", response.next);
	$("#prev").attr("data-url",response.previous);

	if(!response.next){
		$("#next").fadeOut();
	}else{
		$("#prev").fadeIn();
	}
	if(!response.previous){
		$("#prev").fadeOut();
	}else{
		$("#next").fadeIn();
	}
}
var siguiente = function(e){
	e.preventDefault();
	var url = $(this).attr("data-url");
	$.getJSON(url, datos);
}
var datosPersonaje = function(e){
	e.preventDefault();
	alert("Hola!");
}
var iniciar = function(){
	$.getJSON("http://swapi.co/api/people/", datos);
	$("#next").click(siguiente);
	$("#prev").click(siguiente);
	$("#people").on("click", ".about", datosPersonaje);
}
$(document).ready(iniciar);