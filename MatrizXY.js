//Un objeto que genera información util para manejar grillas o cuadrículas.
MatrizXY=function(xa,ya,xb,yb,columnas,filas)
{
	//Diferencia de coordenadas para sacar el ancho y alto de la grilla.
	var difX=xb-xa;
	var difY=yb-ya;
	
	this.margX=xa;				//Margen horizontal de la grilla
	this.margY=ya;				//Margen horizontal de la grilla
	this.an=difX/columnas;	//El ancho fijo de cada columna.
	this.al=difY/filas;		//El alto fijo de cada fila.
	this.ancho=difX;			//Ancho total de la grilla calculado anteriormente.
	this.alto=difY;			//Alto total de la grilla calculado anteriormente.
	this.columnas=columnas;	//Cantidad de columnas.
	this.filas=filas;			//Cantidad de filas.
	
	this.celda=[];		//Array unidimensional con todas las celdas.
	for(i=0;i<filas;i++)
	{
		//Genero los valores XY de cada celda.
		x=0;
		for(z=i*columnas;z<i*columnas+columnas;z++)
		{
			this.celda[z]={};
			this.celda[z].x=this.margX+this.an*x++;
			this.celda[z].y=this.margY+this.al*i;
			this.celda[z].vacio=0;
		}
	}
}
//Devuelve el número de celda de la celda que está sobre el número de celda que recibe.
MatrizXY.prototype.sobre=function(nCelda)
{ 
	var n=nCelda-this.columnas;
	if(n<0)
	{
		return this.celda.length+n;
	}
	return n;
}
//Devuelve el número de celda de la celda que está debajo del número de celda que recibe.
MatrizXY.prototype.debajo=function(nCelda)
{
	var n=nCelda+this.columnas;
	
	if(n>this.celda.length)
	{
		return n-this.celda.length
	}
	return n;
}
//Devuelve el número de celda de la celda que está a la derecha del número de celda que recibe.
MatrizXY.prototype.derecha=function(nCelda)
{
	var n=nCelda+1;
	
	if(n>this.celda.length)
	{
		return n-this.celda.length
	}
	return n;
}
//Devuelve el número de celda de la celda que está a la izquierda del número de celda que recibe.
MatrizXY.prototype.izquierda=function(nCelda)
{
	var n=nCelda-1;
	
	if(n<0)
	{
		return this.celda.length+n
	}
	return n;
}
//Devuelve 1 o 0 si es que hay o no (respectivamente) una celda sobre el número de celda que recibe.
MatrizXY.prototype.haySobre=function(nCelda)
{
	if(this.sobre(nCelda)>nCelda)
	{
		return 0;
	}
	return 1;
}
//Devuelve 1 o 0 si es que hay o no (respectivamente) una celda debajo del número de celda que recibe.
MatrizXY.prototype.hayDebajo=function(nCelda)
{
	if(this.debajo(nCelda)<nCelda)
	{
		return 0;
	}
	return 1;
}
//Devuelve 1 o 0 si es que hay o no (respectivamente) una celda a la izquierda del número de celda que recibe.
MatrizXY.prototype.hayIzquierda=function(nCelda)
{
	if((nCelda)<=Math.floor(nCelda/this.filas)*this.filas)
	{
		return 0;
	}
	return 1;
}
//Devuelve 1 o 0 si es que hay o no (respectivamente) una celda a la derecha del número de celda que recibe.
MatrizXY.prototype.hayDerecha=function(nCelda)
{
	if((nCelda+1)>=(Math.ceil((nCelda+1)/this.filas))*(this.filas))
	{
		return 0;
	}
	return 1;
}