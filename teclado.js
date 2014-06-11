//Clase que almacena teclas y los números asociados a estas.
Teclado=function()
{
	this.numTecla=[];		//Lista de números de tecla
	this.teclaEvt=[];		//Lista de objetos tecla.

	//En los dos arrays, debe coincidir el index de la tecla con el index del número de tecla,
	//de esta manera se asocian.
}

//Método manejador de eventos de teclado.
Teclado.prototype.detona=function(event)
{
	var nTecla=event.keyCode;			//Número de tecla pulsada.
	var accion=event.type;				//Tipo de evento ocurrido.
	
	//Recorro las teclas.
	for(var i=0;i<this.numTecla.length;i++)
	{
		//Si el número de tecla coincide con un número del array.
		if(nTecla==this.numTecla[i])
		{
			//Cancelo los eventos predeterminados correspondientes a esa tecla
			//(por ej. para que no suba el scroll al pulsar la flecha hacia abajo).
			event.preventDefault();
			
			//Invoco al método detona del objeto tecla correspondiente.
			this.teclaEvt[i].detona(accion);
		}
	}
}
//Método que agrega una nueva tecla y su numero correspondiente a la lista.
Teclado.prototype.nEvt=function(num , teclaEvt)
{
	this.numTecla.push(num);
	this.teclaEvt.push(teclaEvt);
};

//Clase para crear teclas con varios manejadores de eventos posibles.
TeclaEvt=function(cfg)
{
	//Cfg es un objeto con cada función para cada tipo de evento.
	this.keyPress=false;					//¿Hay una tecla presionada?
	
	this.onKeyDown=cfg.keydown;		//Funcion llamada al presionar una tecla.
	this.onKeyUp=cfg.keyup;				//Funcion llamada al soltar una tecla.
	this.onKeyPress=cfg.keypress;		//Funcion llamada al presionar y soltar una tecla.
	
	this.jugador=cfg.jugador;			//Jugador asociado a esta tecla.
}

//Método llamado al soltar una tecla.
TeclaEvt.prototype.keyup=function()
{
	if(this.keyPress)
	{
		this.keyPress=false;		//La tecla ya no está presionada.
	}
	
	if(this.onKeyUp)
	{
		this.onKeyUp();			//Llamo al método personalizado que se pasó para este tipo de evento al crear la instancia.
		
		//Si la tecla estaba ya presionada, y existe un método personalizado para este tipo de evento.
		if(this.onKeyPress && this.keyPress)
		{
			this.onKeyPress();	//Llamo al método personalizado que se pasó para este tipo de evento al crear la instancia.
		}
	}
};
TeclaEvt.prototype.keydown=function()
{
	if(this.onKeyDown)
	{
		this.onKeyDown();
	}
	if(!this.keyPress)
	{
		this.keyPress=true;		//La tecla está presionada.
	}
};
TeclaEvt.prototype.detona=function(accion)
{
	//acción = tipo de evento. Ejemplo: "click".
	if(this[accion])
	{
		this[accion]();			//Ejecuto el método de la tecla correspondiente a tal tipo de evento.
	}
}