var template = '<div class="col s12 m4">'+
					'<div class="card horizontal">'+
						'<div class="card-stacked">'+
							'<div class="card-content yellow darken-3">'+
								'<p class="white-text">Hi, my name <strong>{{name}}</strong>.</p>'+
							'</div>'+
							'<div class="card-action">'+
								'<a class="about grey-text darken-4" data-show-url="{{url}}">See more about me</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';

var opciones ='<option value="{{num}}">{{name}}</option>';

var datos = function(response){
	$("#total").text(response.results.length);
	/*console.log(response);*/
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
	var spe = "";
	$.each(res.results, function(i, espec){
		var d = "";
		var n = "http://swapi.co/api/people/";
		$.each(espec.people, function(i, direc){
			console.log(direc);
			d += direc.replace(n,"");
		});
		/*console.log(d);*/
		spe += opciones
		.replace("{{num}}", d.substring(0, d.length-1))
		.replace("{{name}}", espec.name);
	});
	/*console.log(spe);*/
	$("#mostrarEsp").append(spe);
}

var mostrarPersonaje = function(){
	/*console.log(this);*/
	$("#masEsp").html("");
	var numDirec = $(this).val().split("/");
	/*console.log(numDirec);*/
	for(var i =0, l = numDirec.length; i<l; i++){
   		$.getJSON("http://swapi.co/api/people/" + numDirec[i]+"/", function(resp){
   			var cadaEsp = template
   							.replace("{{name}}", resp.name)
   							.replace("{{url}}", resp.url);
   			$("#masEsp").append(cadaEsp);
   		});
	}
}
var iniciar = function(){
	$.getJSON("https://swapi.co/api/people/", datos);
	$.getJSON("https://swapi.co/api/species/", especies);
	$("#next").click(siguiente);
	$("#prev").click(siguiente);
	$("#people").on("click", ".about", datosPersonaje);
	$(".container").on("change", "#mostrarEsp", mostrarPersonaje);
}
$(document).ready(iniciar);