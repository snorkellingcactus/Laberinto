Teclado=function()
{
	this.numTecla=[];
	this.teclaEvt=[];
}
Teclado.prototype.detona=function(event)
{
	var nTecla=event.keyCode;
	var accion=event.type;
	
	for(var i=0;i<this.numTecla.length;i++)
	{
		if(nTecla==this.numTecla[i])
		{
			event.preventDefault();
			
			this.teclaEvt[i].detona(accion);
		}
	}
}
Teclado.prototype.nEvt=function(num , teclaEvt)
{
	this.numTecla.push(num);
	this.teclaEvt.push(teclaEvt);
};
TeclaEvt=function(cfg)
{
	this.keyPress=false;
	
	this.onKeyDown=cfg.keydown;
	this.onKeyUp=cfg.keyup;
	this.onKeyPress=cfg.keypress;
	
	this.jugador=cfg.jugador;
}
TeclaEvt.prototype.keyup=function()
{
	if(this.keyPress)
	{
		this.keyPress=false;
	}
	
	if(this.onKeyUp)
	{
		this.onKeyUp();
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
		this.keyPress=true;
		if(this.onKeyPress)
		{
			this.onKeyPress();
		}
	}
};
TeclaEvt.prototype.detona=function(accion)
{
	if(this[accion])
	{
		this[accion]();
	}
}