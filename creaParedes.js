function puntoHV(HV,sentido,ancho,alto)	//Crea un punto horizontal o vertical.
{
	//HV 1 o 0 define si es horizontal o vertical, respectivamente.
	
	return[ancho*HV*(sentido||-1) , alto*!HV*(sentido||-1)]
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
		10,
		10
	);
	pared=new Pared([puntoIni,puntoIni]);
	var HV=true;
	
	for(var c=0;c<matriz.celda.length;c++)
	{
		//Defino los posibles sentidos.
		var HV=Math.random()*100;
		
		var punto;
		if(HV<25)
		{
			//Linea hacia la derecha.
			punto=puntoHV
			(
				1,
				1,
				matriz.an,
				matriz.al
			);
		}
		if(HV>=25&&HV<50)
		{
			//Linea hacia abajo.
			punto=puntoHV
			(
				0,
				0,
				matriz.an,
				matriz.al
			);
		}
		if(HV>=50&&HV<75)
		{
			//Linea hacia la izquierda.
			punto=puntoHV
			(
				1,
				0,
				matriz.an,
				matriz.al
			);
		}
		if(HV>=75&&HV<=100)
		{
			//Linea Hacia arriba.
			punto=puntoHV
			(
				0,
				1,
				matriz.an,
				matriz.al
			);
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