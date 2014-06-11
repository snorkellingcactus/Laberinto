//Un punto.
PuntoCol= function(posX , posY)
{
  this.posX=posX;
  this.posY=posY;
}

//Una especie de objeto algoritmo para crear puntos random.
PuntoColRandom=function()
{
	//Los posibles rangos de cada variable de las funciones.
	this.rangoM=[0,5];	//Valor de la pendiente m.
	this.rangoA=[0,5];	//Valor de A.
	this.rangoB=[0,0];	//Valor de B.
	this.rangoX=[5,10];	//Valor de X.
	
	this.fn=[];				//Lista de posibles funciones a utilizar.
	this.fnSel=-1;			//Qué fución se va a utilizar de la lista. Si es -1 se usa una al azar.
	
	//Método que genera y devuelve un punto calculado según los datos anteriores.
	this.gen=function(puntoCol)
	{
		var fnSel;
		//Si el valor de fnSel es menor a 0.
		if(this.fnSel<0)
		{
			fnSel=getRamon(0 , this.fn.length-1);		//Genero un número entre 0 y la cantidad de funciones.
		}
		else
		{
			fnSel=this.fnSel									//Sino, uso el numero que está predefinido.
		}
	
		//La función a usar.
		var fn=this.fn[fnSel];
		
		//Genero numeros random para cada variable segun cada rango posible anteriormente definido.
		fn.x=getRamon
		(
			this.rangoX[0],
			this.rangoX[1]
		);
		fn.m=getRamon
		(
			this.rangoM[0],
			this.rangoM[1]
		);
		fn.b=getRamon
		(
			this.rangoB[0],
			this.rangoB[1]
		);		
		fn.a=getRamon
		(
			this.rangoA[0],
			this.rangoA[1]
		);
	
		//Calculo Y.
		var cord=fn.calc();
		
		//Y creo un punto con las coordenadas X e Y obtenidas.
		return new PuntoCol
		(
			puntoCol.posX+Math.round(cord[0]),
			puntoCol.posY+Math.round(cord[1])
		);
	}
}

//Un objeto colector y procesador de puntosCol.
Pared=function()
{
	//Variable para colectar puntos alineados entre si, cada uno con su siguiente alineado 
	//de manera horizontal o vertical.
	this.puntosCol=[];
	
	//Si al instanciar esta clase, se pasaron argumentos, doy por echo que se trata de un listado de puntos XY
	//Y los proceso para generar los intermedios.
	if(arguments.length)
	{
		this.procesaPuntos(arguments[0]);
	}
}

//Genera los puntos alineados de manera vertical u horizontal intermedios entre dos o màs puntos.
Pared.prototype.procesaPuntos=function(listaPuntos)
{
	if(this.puntosCol.length)
	{
		var nCol=this.puntosCol.length-1;		//Numero del úlimo punto de la lista.
		
		nCol=this.puntosCol[nCol];					//Último punto de la lista.
		
		//A la lista de parámetros, le agrego el último punto de la pared. (para que se mantenga la correlatividad)
		listaPuntos.unshift
		(
			[
				nCol.posX,
				nCol.posY
			]
		)
	};
	
	for(var i=0;i<listaPuntos.length-1;i++)
	{
		var xA=listaPuntos[i][0];			//X del punto actual.
		var yA=listaPuntos[i][1];			//Y del punto actual.
		var xB=listaPuntos[i+1][0];		//X del punto siguiente.
		var yB=listaPuntos[i+1][1];		//Y del punto siguiente.
		
		var signoLX=1;							//Variable con el signo de X.
		var signoLY=1;							//Variable con el signo de Y.
		var signoM=1;							//Variable con el signo de M.
		var ladoX=xB-xA;						//Distancia X entre los puntos.
		var ladoY=yB-yA;						//Distancia Y entre los puntos.
		
		//Si la distancia X es 0.
		if(!ladoX)
		{
			//Hago que sea cercana a 1. (para evitar más adelante dividir por 0)
			ladoX=0.99;
		}
		//Conservo el signo de la distancia X.
		if(ladoX<0)
		{	
			signoLX=-1;
		}
		//Conservo el signo de la distancia Y.
		if(ladoY<0)
		{
			signoLY=-1;
		}
		
		//Una función lineal para calcular los puntos intermedios.
		var fn=new FnLin
		(
			ladoY/ladoX,
			1,
			0
		);
		
		//Conservo el signo de la pendiente.
		if(fn.m<0)
		{
			signoM=-1;
		}
		
		//Mientras x sea menor que la distancia X absoluta (positiva) entre los puntos.
		while(fn.x<=Math.abs(ladoX))
		{
			//Calculo X e Y;
			var xa=Math.round(fn.calc()[0]);
	 		var ya=Math.round(fn.calc()[1]);
	 		
	 		//Inserto un puntoCol con las coordenadas obtenidas más las del punto aterior
	 		//multiplicando para obtener los signos que deben ir.
	 		this.insertaCol
 			(
 				xA+(xa)*signoLX,
 				yA+(ya)*signoLY*signoM
 			);
 			
	 		//Calculo el incremento necesario de X para que Y aumente en 1.
	 		var inc=Math.abs(Math.round((1-fn.b)/fn.m))||1;
 			
 			fn.x+=inc
		};
		
		//Inserto el último punto.
		//Math.floor redondea para abajo, es por un error cuando la distancia X es 0
		//y se toma como 0.99 para evitar divisiones por 0.
		this.insertaCol
 		(
 			xA+Math.floor(ladoX),
 			yA+ladoY
 		);
	};
}
//Inserta un puntoCol en la lista con las coordenadas pasadas por parámetro.
Pared.prototype.insertaCol=function(xa , ya)
{
	this.puntosCol.push
	(
		new PuntoCol(xa , ya)
	);
}

//Crea una cantidad puntos aleatorios según la información de una instancia de puntoColRandom.
Pared.prototype.genRandom=function(cantidad , puntoColRandom)
{
	for(var i=0;i<cantidad;i++)
	{
		var nColAct=this.puntosCol.length-1;			//El número del último punto.
		var pColAct=this.puntosCol[nColAct];			//El último punto.
		
		var nColRandom=puntoColRandom.gen(pColAct);	//Almaceno el punto random generado por el método gen del objeto puntoColRandom.
		
		//window.console.log(nColRandom);
		
		//Lo guardo en la lista.
		this.procesaPuntos
		(
			[
				[
					nColRandom.posX,
					nColRandom.posY
				]
			]
		);
	}
}

//Para graficar una linea determinada por dos puntos.
function graficaPuntos(pCol,pColSig)
{
		//Inicializo variables.
		var posX=0;												//Posición X.
		var posY=0;												//Posición X.
		var fixX=0;												//Valor para corregir la posición X cuando la distancia X de los puntos es negativa.
		var fixY=0;												//Valor para corregir la posición Y cuando la distancia Y de los puntos es negativa.
		var ancho=Math.ceil(pColSig.posX-pCol.posX);	//Obtengo la distancia X de los puntos redondeada hacia arriba.
		var alto=Math.ceil(pColSig.posY-pCol.posY);	//Obtengo la distancia Y de los puntos redondeada hacia arriba.
		
		if(ancho<0)
		{
			fixX=ancho;
		}
		if(alto<0)
		{
			fixY=alto;
		}
	
		//El elemento HTML.
		var span=document.createElement("span");
		
		span.setAttribute("class" , "pared");						//Le asigno la clase "pared".
		span.style.width=Math.abs(ancho)||Math.abs(posX)||1;	//Establezco el ancho. Si el ancho es 0, tomo un 1 para que sea visible.
		span.style.height=Math.abs(alto)||Math.abs(posY)||1;	//Establezco el ancho. Si el ancho es 0, tomo un 1 para que sea visible.
		span.style.left=pCol.posX+fixX;								//La posición X menos el ancho si este es negativo.
		span.style.top=pCol.posY+fixY;								//La posición Y menos el alto si este es negativo.
		
		//Devuelvo el elemento HTML.
		return span
}

//Grafica con lineas la pared según sus puntos.
function graficaPared(pared)
{
	
	//window.console.log(pared.puntosCol);
	//Recorro los puntos de la pared.
	for(var i=0;i<pared.puntosCol.length-1;i++)
	{
		var pCol=pared.puntosCol[i];					//El punto actual.
		var pColSig=pared.puntosCol[i+1];			//El punto siguiente.
		
		//Inserto el elemento HTML devuelto por graficaPuntos.
		document.body.appendChild
		(
			graficaPuntos(pCol , pColSig)
		);
	}
}

//Intento de clase para chequear una colisión entre dos puntos.
VerifCol=function(puntoCol , puntoColMax , puntoColMin)
{
	this.puntoCol=puntoCol;
	this.puntoColMax=puntoColMax;
	this.puntoColMin=puntoColMin;

}
//Método que devuelve 1 si se produce una colisión o 0.
VerifCol.prototype.colisiona=function()
{
	if(this.puntoColposX>this.puntoColMax.posX||this.puntoColposY>this.puntoColMax.posY||this.puntoColposX<this.puntoColMin.posX||this.puntoColposY<this.puntoColMin.posY)
	{
		return 1;
	}
	else
	{
		return 0;
	}
}