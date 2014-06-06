function creaMapa(cantidad)
{
	
	 pared=new Pared
	(
		[
			[100,100],
			[150,100],
			[150,150],
			[200,150],
			[200,200]
		]
	);
	
	puntoColRandom=new PuntoColRandom();
	puntoColRandom.fn.push
	(
		new FnCuad
		(
			0,
			new FnLin
			(
				0,
				0,
				1
			)
		)
	);
	puntoColRandom.rangoM=[0,0];
	puntoColRandom.rangoA=[0,0];
	
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