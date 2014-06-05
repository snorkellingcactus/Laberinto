function creaMapa(cantidad)
{
	
	 pared=new Pared
	(
		[
			[	100	,	100	],
			[	200,		100	],
			[	100	,	150	],
			[	200,		150	]
		]
	);
	
	genLColRandom=new GenLColRandom();
	genLColRandom.fn.push
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
	genLColRandom.rangoM=[0,0];
	genLColRandom.rangoA=[0,0];
	
	//window.console.log(genLColRandom.fn[0]);
	
	//pared.genRandom(cantidad,genLColRandom);
	
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