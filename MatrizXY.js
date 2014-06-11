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