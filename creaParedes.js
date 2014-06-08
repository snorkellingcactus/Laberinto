function puntoHV(HV,sentido,longX,longY)
{
	var largo=getRamon
	(
		longX*sentido,
		longY*sentido
	);
	
	
	return[		largo*HV	,		largo*!HV	]
}
function creaMapa(cantidad,puntoIni,ladoMax)
{
	
	pared=new Pared
	(
		puntoIni
	);
	var puntos=[]
	
	var HV=true;
	var sentidos=[];
	
	for(var c=0;c<cantidad;c++)
	{
		var puntoHVRandom;
		var lastX;
		var lastY=pared.puntosCol.length-1;
		
		lastX=pared.puntosCol[lastY].posX;
		lastY=pared.puntosCol[lastY].posY;
		
		if(sentidos.length>4)
		{
			sentidos.shift();
		};
		
		sentidos.push(getBinRamon()||-1);
		if(sentidos.length>3&&sentidos[3]!=sentidos[1])
		{
			sentidos[3]*=-1;
		}
		
		puntoHVRandom=puntoHV(HV,sentidos[sentidos.length-1],ladoMax[0],ladoMax[1]);
		
		puntoHVRandom[0]+=lastX;
		puntoHVRandom[1]+=lastY;
		
		pared.procesaPuntos
		(
			[
				puntoHVRandom
			]
		)
		HV=!HV
	}
	
	graficaPared(pared);
	return pared
	
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