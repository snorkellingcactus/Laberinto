function creaMapa(cantidad)
{
	
	 pared=new Pared
	(
		[
			[50,100],
			[51,100]
		]
	);
	
	puntoColRandom=new PuntoColRandom();
	puntoColRandom.fn.push
	(
		new FnLin
		(
			0,
			0,
			1
		)
	);
	
	puntoColRandom.rangoLong=[-1,20]
	puntoColRandom.rangoM=[-2,2];
	puntoColRandom.rangoA=[-1,1];
	pared.genRandom(cantidad , puntoColRandom);
	
	graficaPared(pared);
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