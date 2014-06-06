Tipito=function()
{
	this.posX=0;
	this.posY=0;
	
	if(arguments.length)
	{
		this.setPosXY(arguments[0] , arguments[1]);
	};
};
Tipito.prototype.refresca=function(){};
Tipito.prototype.setPosX=function(inc)
{
	this.posX+=inc;
	this.refresca();
};
Tipito.prototype.setPosY=function(inc)
{
	this.posY+=inc;
	this.refresca();
};
Tipito.prototype.setPosXY=function(xInc , yInc)
{
	this.setPosX(xInc);
	this.setPosY(yInc);
};