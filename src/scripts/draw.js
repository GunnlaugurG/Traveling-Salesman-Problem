console.log("Draw up and running");


// keep function like this if i need to add to export.. change to named function if not used
let drawService = () => {
    return {        
        drawLine: (ctx, vert, last) => {
            if(last){
                drawRect(ctx, vert.fromX, vert.fromY, true);
            }
            else{
                drawRect(ctx, vert.fromX, vert.fromY, false);
            }
            ctx.beginPath();
            ctx.moveTo(vert.fromX, vert.fromY);
            ctx.lineTo(vert.toX, vert.toY);
            ctx.lineWidth = "2";
            ctx.strokeStyle = "white";
            ctx.stroke();
        }
    };
};

function drawRect (ctx, x, y, last){
    ctx.beginPath();
    ctx.lineWidth = "6";
    if(last){
        ctx.fillStyle = "white";
    }else{
        ctx.fillStyle = "yellow";
    }
    ctx.rect(x-4, y-4, 8, 8); 
    ctx.fill();
}

export default drawService();

