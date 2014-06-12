function puntoHV(HV,sentido,ancho,alto)	//Crea un punto horizontal o vertical.
{
	//HV 1 o 0 define si es horizontal o vertical, respectivamente.
	sentido=(sentido||-1)					//Si sentido es 0 se queda con -1. Si sentido es 1, no evalua y se queda con 1.
	
	return[ancho*HV*sentido , alto*!HV*sentido]
}

//Función que genera puntos random y devuelve una pared con esos puntos.
function creaMapa(cantidad,puntoIni,puntoFin)
{
	//Creo una grilla de 10x10.
	matriz=new MatrizXY
	(
		puntoIni[0],
		puntoIni[1],
		puntoFin[0],
		puntoFin[1],
		20,
		20
	);
	pared=new Pared([puntoIni,puntoIni]);
	var HV=true;
	
	for(var c=0;c<matriz.celda.length;c++)
	{
		//Creo divs para graficar la grilla en el documento HTMl.
		
		//Divs para las lineas horizontales.
		spanA=document.createElement("div");
		spanA.style.backgroundColor="silver";
		spanA.style.width=matriz.an;
		spanA.style.height="1px";
		spanA.style.top=matriz.celda[c].y;
		spanA.style.left=matriz.celda[c].x;
		spanA.style.position="absolute";
		
		//Divs para las lineas verticales.
		spanB=document.createElement("div");		//Creo el elemento div.
		spanB.style.backgroundColor="silver";
		spanB.style.width="1px";
		spanB.style.height=matriz.al;					//Tendrá el alto calculado por el obj matriz.
		spanB.style.top=matriz.celda[c].y;		//Le asigno la posición X de la columna actual.
		spanB.style.left=matriz.celda[c].x;	//Le asigno la posición X de la fila actual.
		spanB.style.position="absolute";				//Tienen posición absoluta.
		
		//Inserto los divs en el cuerpo del documento.
		document.body.appendChild(spanA);
		document.body.appendChild(spanB);
	};
	
	var nCelda=0;
	for(var i=0;i<cantidad;i++)
	{
		//Defino los posibles sentidos.
		var HV=getBinRamon();				//Horizontal hacia la derecha, vertical hacia abajo.
		var sentido=getBinRamon();			//Hacia la izquierda o hacia arriba.
		var noHV;								//Que no se puedan hacer lineas horizontales hacia la derecha o verticales hacia abajo.
		var noSentido;							//Que no se puedan hacer lineas horizontales hacia la izquierda o verticales hacia arriba.
		
		if(!matriz.haySobre(nCelda)&&!HV || !matriz.hayIzquierda(nCelda)&&HV)
		{
			sentido=1;
		};
		if(!matriz.hayDebajo(nCelda)&&!HV || !matriz.hayDerecha(nCelda)&&HV)
		{
			sentido=0;
		};
		//Punto random.
		var punto=puntoHV
		(
			HV,
			sentido,
			matriz.an,
			matriz.al
		);
		//Me muevo a la celda de la derecha
		if(HV&&!sentido)
		{
			nCelda=matriz.derecha(nCelda);
		}
		//Me muevo a la celda de la izquierda
		if(HV&&sentido)
		{
			nCelda=matriz.izquierda(nCelda);
		}
		//Me muevo a la celda de abajo
		if(!HV&&!sentido)
		{
			nCelda=matriz.debajo(nCelda);
		}
		//Me muevo a la celda de arriba
		if(!HV&&sentido)
		{
			nCelda=matriz.sobre(nCelda);
		}
		
		//Le asigno el punto random generado a la pared. 
		pared.procesaPuntos
		(
			[
				[
					pared.puntosCol[pared.puntosCol.length-1].posX+punto[0],
					pared.puntosCol[pared.puntosCol.length-1].posY+punto[1]
				]
			]
		);
	}
	//Dibujo los puntos de la pared.
	graficaPared(pared);
	
	//Devuelvo la pared.
	return pared;
}

// funcion que da numeros random
function getRamon(min, max) 
{
    return Math.random() * (max - min) + min;
}
//Genera un 0 o 1 aleatoriamente.
function getBinRamon()
{
	return Math.round(Math.random());
}