var d=1, l=5, h;
var A, B, C,D, E, F, G, I, J, M, N;
var AB, BC, CA, DE, EF, FG, GD, IJ, JN, NM, MI;
var qboard;
var x,y;
var t1, t2, t3, t4, t5;
var rectangleA, rectangleB;
var alpha;
var showingSolution;

function generateTriangleAndRectangle(){
	
    h=l*Math.sqrt(3)/2;
    alpha = (Math.random() * 4.33).toFixed(2);
    if(alpha>3.8){
        alpha-=0.5;
    }
    if(alpha<0.5){
        alpha = 0.8;
    }
    qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-d, h+d, l+3*d, -d],  keepaspectratio: true, showcopyright: false});

    //vertices of triangle
    A = qboard.create('point', [0,0], {name: "A", color:'blue', fixed:true, label:{offset:[-10,-10]}});
    B = qboard.create('point', [l, 0], {name: "B", color:'blue', fixed:true, label:{offset:[10, 10]}});
    C = qboard.create('point', [l/2, h], {name: "C", color:'blue', fixed:true});	

    //sides of triangle
    AB = qboard.create('segment', [A, B], {color:'black', fixed:true, strokeWidth: 1});
    BC = qboard.create('segment', [B, C], {color:'black', fixed:true, strokeWidth: 1});
    CA = qboard.create('segment', [C, A], {color:'black', fixed:true, strokeWidth: 1});

    E = qboard.create('point', [(alpha*0.57),alpha], {name: "E", color:'red', label:{offset:[-15,6]}});	
    E.makeGlider(CA);
    D = qboard.create('perpendicularpoint', [E, AB], {name:"D", withLabel:true, color:'blue', label:{offset:[-10,-12]}});
    F = qboard.create('point', [function(){return E.X()+(2*(C.X()-E.X()));},
                                function(){return E.Y();}], 
                                {name:"F", withLabel:true, color:'blue'});
    G = qboard.create('perpendicularpoint', [F, AB], {name:"G", withLabel:true, color:'blue', label:{offset:[-10,-12]}});
    
    DE = qboard.create('segment', [D, E], {color:'black', fixed:true, strokeWidth: 1});
    EF = qboard.create('segment', [E, F], {name:"x", withLabel:true, color:'black', fixed:true, strokeWidth: 1});
    FG = qboard.create('segment', [F, G], {name:"y", withLabel:true, color:'black', fixed:true, strokeWidth: 1});
    GD = qboard.create('segment', [G, D], {color:'black', fixed:true, strokeWidth: 1});
    
    rectangleA = qboard.create('polygon', [F, G, D, E], {name: "S",withLabel:true});
    
    E.on("drag", function(){
        clearElements();
        generateDistances();
	});
}

function generateDistances(){
    
    x = E.Dist(F);
    y = F.Dist(G);

    generateTexts();

    if(showingSolution){
        I = qboard.create('point', [1.27,2.20], {name:"I", color:'yellow', fixed:true, label:{offset:[-15,6]}});
        J = qboard.create('point', [3.73,2.20], {name:"J", color:'yellow', fixed:true});
        M = qboard.create('point', [1.27,0], {name:"M", color:'yellow', fixed:true, label:{offset:[-10,-12]}});
        N = qboard.create('point', [3.73,0], {name:"N", color:'yellow', fixed:true, label:{offset:[-10,-12]}});
        
        IJ = qboard.create('segment', [I, J], {color:'black', fixed:true, strokeWidth: 1});
        JN = qboard.create('segment', [J, N], {color:'black', fixed:true, strokeWidth: 1});
        NM = qboard.create('segment', [N, M], {color:'black', fixed:true, strokeWidth: 1});
        MI = qboard.create('segment', [M, I], {color:'black', fixed:true, strokeWidth: 1});
        
        rectangleB = qboard.create('polygon', [I, J, N, M], {color:"yellow"});
        
        //pontos para mostrar altura h 
        Q1 = qboard.create('point', [l+2*(d-0.3), 0], {withLabel:false, fixed:true, color:'black'});
        J1 = qboard.create('point', [l+2*(d-0.3), h], {color:'black', withLabel:false, fixed:true});
        //linhas pontilhadas
        CJ1 = qboard.create('segment', [C, J1], { color:'black', dash:2});
        BQ1 = qboard.create('segment', [B, Q1], { color:'black', dash:2});
        Q1J1 = qboard.create('segment', [Q1, J1], {name:"h", withLabel:true, color:'black', label:{offset:[10, 0]}});
    }
}

function generateTexts(){
    //texts
    t1 = qboard.create('text',[0, -d, "x = "+x.toFixed(2)], {fixed:true});
    t2 = qboard.create('text',[0, -3*d/2, "y = "+y.toFixed(2)], {fixed:true});
    t3 = qboard.create('text',[l/2,-d, "AB = "+(A.Dist(B)).toFixed(2)], {fixed:true});
    //área do retângulo
    t4 = qboard.create('text',[l/2, -3*d/2, "S = "+(x*y).toFixed(2)], {fixed:true});
    if(showingSolution){
        //altura
        t5 = qboard.create('text',[l/2,-2*d, "h = "+(C.Y()).toFixed(2)], {fixed:true});
    }
}

function clearElements(){
    t1.remove();
    t2.remove();
    t3.remove();
    t4.remove();

    if(showingSolution){
        t5.remove();
        I.remove();
        J.remove();
        M.remove();
        N.remove();
        IJ.remove();
        JN.remove();
        NM.remove();
        MI.remove();
        rectangleB.remove();
        Q1.remove();
        J1.remove();
        CJ1.remove();
        BQ1.remove();
        Q1J1.remove();
    }
}

function generateSolution(){
    clearElements();
    showingSolution=true;
    generateDistances();
}

function showAnswer(){
    $("#showAnswer").attr("disabled",true);
    $("#answerExplanation").removeClass("hidden");
    $("#answerExplanation").html("<b>Solução:</b><br/>"+
    "<div class='justify'>Num triângulo equilátero de lado 5,podemos calcular sua altura a partir do teorema de pitágoras,onde:</div>"+
    "<br/>"+
    "<div class='center'>`h^2 + (l/2)^2 = l^2`</div>"+
    "<br/>"+
    "<div class='justify'>Desenvolvendo isso,concluimos que a fórmula para calcular a altura do triângulo equilátero é:</div>"+
    "<br/>"+
    "<div class='center'>`sqrth^2 = sqrt((3l^2)/4) => h = l/2*sqrt3 => 5/2*sqrt3 = 4.33`</div>"+
    "<br/>"+
    "<div class='justify'>Considere EF = x e CH = h. Da semelhança entre `\Delta`CEF e `\Delta`CAB,temos:</div>"+
    "<br/>"+
    "<div class='center'>`x/5 = h/4.33 => 5*h = 4.33*x => h = 4.33/5*x`</div>"+
    "<br/>"+
    "<div class='justify'>Podemos então escrever a área do retângulo DEFG em função de x </div>"+
    "<br/>"+
    "<div class='center'>`A(x) = (4.33/5 - h)*x`</div>"+
    "<br/>"+
    "<div class='center'>`=(4.33/5 - 4.33/5*x)*x`</div>"+
    "<br/>"+
    "<div class='center'>`= 4.33/5*x-4.33/5*x^2`</div>"+
    "<br/>"+
    "<div class='justify'>Sendo a área uma função quadrática de x,temos que seu valor máximo é dado por</div>"+
    "<br/>"+
    "<div class='center'>`A_(M) = -\Delta/(4a) = 5.41`</div>"+
    "<br/>"+
    "<div class='justify'>Ou uma forma mais fácil de descobrir a área máxima do retângulo é sabendo que ela vale metade da área do triângulo,logo:</div>"+
    "<br/>"+
    "<div class='center'>`A_(T) = (b*h)/2 => (5*4.33)/2 => 10.82`, assim:</div>"+
    "<br/>"+
    "<div class='center'>`A_(M) = 10.82/2 => 5.41`</div>"+
    "<br/>"+
    "<div class='justify'>Movimente o ponto E, na figura, para ver a variação da área do retângulo ao longo do segmento AC.</div>");
    generateSolution();
    compileMathJaxCode();
}

function resetAnswer(){
    showingSolution=false;
    $("#showAnswer").attr("disabled",false);
    $("#answerExplanation").addClass("hidden");
}	

function compileMathJaxCode(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function generateNewGame(){
    resetAnswer();
    generateTriangleAndRectangle();
    generateDistances();
}