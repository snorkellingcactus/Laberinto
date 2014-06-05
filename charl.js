CtlMover=function()
{
	this.posX=0;
	this.posY=0;
	
	if(arguments.length)
	{
		this.setPosXY(arguments[0] , arguments[1]);
	};
};
CtlMover.prototype.refresca=function(){};
CtlMover.prototype.setPosX=function(inc)
{
	this.posX+=inc;
	this.refresca();
};
CtlMover.prototype.setPosY=function(inc)
{
	this.posY+=inc;
	this.refresca();
};
CtlMover.prototype.setPosXY=function(xInc , yInc)
{
	this.setPosX(xInc);
	this.setPosY(yInc);
};

function capEntrada(event)
{
	switch(event.keyCode)
	{
		case 39:
			control.setPosX(2);
		break;
		case 37:
			control.setPosX(-2);
		break;
		case 38:
			control.setPosY(-2);
		break;
		case 40:
			control.setPosY(2);
		break;
	}
}