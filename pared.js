lineaColision= function(xIni , yIni , xFin , yFin)
{
  this.posXIni=xIni;
  this.posYIni=yIni;
  this.posXFin=xFin;
  this.posYFin=yFin;
}

lineaColision.prototype.concatena=function(xFin , yFin)
{
	return new lineaColision
	(
		this.posXFin ,
		this.posYFin ,
		xFin ,
		yFin
	);
}
lineaColision.prototype.genRandom=function(genLColRandom)
{
	return genLColRandom.gen(this);
}
GenLColRandom=function()
{
	this.rangoLong=[5,20];
	this.rangoM=[0,5];
	this.rangoA=[0,5];
  	
	this.fn=[];
	this.fnSel=-1;
	
	this.gen=function(lineaCol)
	{
		if(this.fnSel<0)
		{
			var fnSel=getRamon(0 , this.fn.length-1);
			//window.console.log(fnSel);
		}
	
		var fn=this.fn[fnSel];
		
		fn.x=getRamon
		(
			this.rangoLong[0],
			this.rangoLong[1]
		);
		fn.m=getRamon
		(
			this.rangoM[0],
			this.rangoM[1]
		);		
		fn.a=getRamon
		(
			this.rangoA[0],
			this.rangoA[1]
		);
		
		window.console.log(" X = "+fn.x);
		window.console.log(" M = "+fn.m);
		window.console.log(" B = "+fn.b);
	
		var cord=fn.calc();
		
		window.console.log("Resultado= ( "+cord[0]+" ; "+cord[1]+" )");
		
		return lineaCol.concatena
		(
			lineaCol.posXFin+cord[0],
			lineaCol.posYFin+cord[1]
		);
	}
}
Pared=function(puntos)
{
	this.lineasColision=[];
	this.procesaPuntos(puntos);
}
Pared.prototype.procesaPuntos=function(puntos)
{
	for(var i=1;i<puntos.length;i++)
	{
		var xA=puntos[i-1][0];
		var yA=puntos[i-1][1];
		var xB=puntos[i][0];
		var yB=puntos[i][1];
		
		//window.console.log("PuntoA = ("+xA+" ; "+yA+")");
		//window.console.log("PuntoB = ("+xB+" ; "+yB+")");
		
		var ladoX=xB-xA;
		var ladoY=yB-yA;
		
		//window.console.log("Delta X = "+ladoX);
		//window.console.log("Delta Y = "+ladoY);
		
		var fn=new FnLin
		(
			ladoY/ladoX,
			0,
			1
		);
		
		//window.console.log("fnLin ("+ladoY/ladoX+" , "+0+" , "+1);
		
		for(var j=0;j<ladoX;j++)
		{
			var xa=Math.round(fn.calc()[0]);
	 		var ya=Math.round(fn.calc()[1]);
	 		
	 		//window.console.log("Cuando Xa = "+xa+" Ya = "+ya);
 			
 			fn.x+=1;
 			
 			var xb=Math.round(fn.calc()[0]);
	 		var yb=Math.round(fn.calc()[1]);
 			
 			//window.console.log("Cuando Xb = "+xb+" Yb = "+yb);
 			//window.console.log("Desde ( "+(xA+xa)+" ; "+(yA+ya)+" )");
			//window.console.log("Hasta ( "+(xA+xb)+" ; "+(yA+yb)+" )");
 			
 			this.insertaColision(xA+xa , yA+ya , xA+xb , yA+yb);
		}
	};
}
Pared.prototype.insertaColision=function(xa , ya , xb , yb)
{
	this.lineasColision.push
	(
		new lineaColision(xa , ya , xb , yb)
	);
}
Pared.prototype.genRandom=function(cantidad , genLColRandom)
{
	for(var i=0;i<cantidad;i++)
	{
		var nColAct=this.lineasColision.length-1;
		var lColAct=this.lineasColision[nColAct];
		var nColRandom=lColAct.genRandom(genLColRandom);
		
		this.procesaPuntos
		(
			[
				[
					nColRandom.posXIni,
					nColRandom.posYIni
				],
				[
					nColRandom.posXFin,
					nColRandom.posYFin
				]
			]
		);
	}
}
function graficaPared(pared)
{
	for(var i=0;i<pared.lineasColision.length;i++)
	{
		var lineaCol=pared.lineasColision[i];
		var span=document.createElement("span");
		
		span.setAttribute("class" , "pared");
		span.style.width=(lineaCol.posXFin-lineaCol.posXIni)||1;
		span.style.height=(lineaCol.posYFin-lineaCol.posYIni)||1;
		span.style.left=lineaCol.posXIni;
		span.style.top=lineaCol.posYIni;
		
		document.body.appendChild(span);
	}
}
	
	