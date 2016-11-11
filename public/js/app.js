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

var opciones ='<option value="{{num}}">{{name}}</option>';

var datos = function(response){
	$("#total").text(response.results.length);
	console.log(response);
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
var especies = function(res){
	console.log(res);
	var spe = "";
	$.each(res.results, function(i, espec){
		var d = "";
		for(var i=0, m=espec.people.length; i<m ;i++){
			d += espec.people[i].substr(-3);
		}
		spe += opciones
		.replace("{{num}}", d)
		.replace("{{name}}", espec.name);
	});
	console.log(spe);
	$("#mostrarEsp").append(spe);
}
var mostrarPersonaje = function(){
    $.getJSON("http://swapi.co/api/people/" + $(this).val(), mostrarP);
    /*function mostrarP (response){
      	console.log(response);
      	var contenido = "";
      	$.each(response.results, function(i, pers){
      		contenido+=template
      		.replace("{{name}}", personaje.name)
			.replace("{{url}}", personaje.url);
      	});
      	$("#masEsp").html(contenido);
    }*/
}
var iniciar = function(){
	$.getJSON("http://swapi.co/api/people/", datos);
	$.getJSON("http://swapi.co/api/species/", especies);
	$("#next").click(siguiente);
	$("#prev").click(siguiente);
	$("#people").on("click", ".about", datosPersonaje);
	$(".container").on("change", "#mostrarEsp", mostrarPersonaje);
}
$(document).ready(iniciar);