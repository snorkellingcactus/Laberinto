//Un circulo por seno y coseno.
Circulo=function(x,y,radio,rot)
{
	this.m=x;
	this.x=y;
	this.b=radio;
	this.a=rot;
	this.cord=[];
};
Circulo.prototype.calc=function()
{
	this.cord[0]=Math.cos(this.a)*this.b+this.m;
	this.cord[1]=Math.sin(this.a)*this.b+this.x;
	return this.cord;
}

//Una funcion lineal.
FnLin=function(m,x,b)
{
	this.m=m;	//Pendiente
	this.x=x;
	this.b=b;	//Ordenada al origen
	this.cord=[];
}
FnLin.prototype.calc=function()
{
	this.cord[0]=this.x;
	this.cord[1]=this.m*this.x+this.b;
	return this.cord;
}

//Una función cuadrática.
FnCuad=function(a,fn)
{
	this.a=a;
	this.m=fn.m;
	this.x=fn.x;
	this.b=fn.b;
	this.cord=[];
}
FnCuad.prototype.calc=function()
{
	this.cord[0]=this.x;
	this.cord[1]=this.a*Math.pow(this.x,2)+this.m*this.x+this.b;
	return this.cord;
}

//Bhascara.
function Bhaskara()
{
	return 
	[
		(-this.m+Math.sqrt(Math.pow(this.m,2)-4*this.a*this.b))/(this.a*2),
		(-this.m-Math.sqrt(Math.pow(this.m,2)-4*this.a*this.b))/(this.a*2)
	];
}

//Pitágoras.
function Hipo(a,b)
{
		return Math.sqrt
		(
			Math.abs(a*a+b*b)
		);
};