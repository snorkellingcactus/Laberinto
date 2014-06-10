PuntoCol= function(posX , posY)
{
  this.posX=posX;
  this.posY=posY;
}
PuntoColRandom=function()
{
	this.rangoM=[0,5];
	this.rangoA=[0,5];
	this.rangoB=[0,0];
	this.rangoX=[5,10];
	
	this.fn=[];
	this.fnSel=-1;
	
	this.gen=function(puntoCol)
	{
		if(this.fnSel<0)
		{
			var fnSel=getRamon(0 , this.fn.length-1);
		}
	
		var fn=this.fn[fnSel];
		
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
	
		var cord=fn.calc();
		
		return new PuntoCol
		(
			puntoCol.posX+Math.round(cord[0]),
			puntoCol.posY+Math.round(cord[1])
		);
	}
}
Pared=function()
{
	this.puntosCol=[];
	
	if(arguments.length)
	{
		this.procesaPuntos(arguments[0]);
	}
}
Pared.prototype.procesaPuntos=function(listaPuntos)
{
	if(this.puntosCol.length)
	{
		var nCol=this.puntosCol.length-1;
		
		nCol=this.puntosCol[nCol];
		
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
		var xA=listaPuntos[i][0];
		var yA=listaPuntos[i][1];
		var xB=listaPuntos[i+1][0];
		var yB=listaPuntos[i+1][1];
		
		var signoLX=1;
		var signoLY=1;
		var signoM=1;
		var ladoX=xB-xA;
		var ladoY=yB-yA;
		
		
		if(!ladoX)
		{
			ladoX=0.99;
		}
		if(ladoX<0)
		{
			signoLX=-1;
		}
		if(ladoY<0)
		{
			signoLY=-1;
		}

		var fn=new FnLin
		(
			ladoY/ladoX,
			1,
			0
		);
		
		if(fn.m<0)
		{
			signoM=-1;
		}
		
		while(fn.x<=Math.abs(ladoX))
		{
			var xa=Math.round(fn.calc()[0]);
	 		var ya=Math.round(fn.calc()[1]);
	 		
	 		var inc=Math.abs(Math.round((1-fn.b)/fn.m))||1;
 			this.insertaCol
 			(
 				xA+(xa)*signoLX,
 				yA+(ya)*signoLY*signoM
 			);
 			
 			fn.x+=inc
		}
		
		this.insertaCol
 		(
 			xA+ladoX,
 			yA+ladoY
 		);
	};
}
Pared.prototype.insertaCol=function(xa , ya)
{
	this.puntosCol.push
	(
		new PuntoCol(xa , ya)
	);
}
Pared.prototype.genRandom=function(cantidad , puntoColRandom)
{
	for(var i=0;i<cantidad;i++)
	{
		var nColAct=this.puntosCol.length-1;
		var pColAct=this.puntosCol[nColAct];
		
		var nColRandom=puntoColRandom.gen(pColAct);
		
		//window.console.log(nColRandom);
		
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
function graficaPuntos(pCol,pColSig)
{
		var posX=0;
		var posY=0;
		var fixX=0;
		var fixY=0;
		var ancho=Math.ceil(pColSig.posX-pCol.posX);
		var alto=Math.ceil(pColSig.posY-pCol.posY);
		
		if(ancho<0)
		{
			fixX=ancho;
		}
		if(alto<0)
		{
			fixY=alto;
		}
		var span=document.createElement("span");
		
		span.setAttribute("class" , "pared");
		span.style.width=Math.abs(ancho)||Math.abs(posX)||1;
		span.style.height=Math.abs(alto)||Math.abs(posY)||1;
		span.style.left=pCol.posX+fixX;
		span.style.top=pCol.posY+fixY;
		
		return span
}
function graficaPared(pared)
{
	
	//window.console.log(pared.puntosCol);
	for(var i=0;i<pared.puntosCol.length-1;i++)
	{
		var pCol=pared.puntosCol[i];
		var pColSig=pared.puntosCol[i+1];
		document.body.appendChild
		(
			graficaPuntos(pCol , pColSig)
		);
	}
}
VerifCol=function(puntoCol , puntoColMax , puntoColMin)
{
	this.puntoCol=puntoCol;
	this.puntoColMax=puntoColMax;
	this.puntoColMin=puntoColMin;

}
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