console.log("Draw up and running");

// keep function like this if i need to add to export.. change to named function if not used
let drawService = () => {
    return {        
        drawLine: (ctx, vert) => {
            ctx.beginPath();
            ctx.moveTo(vert.fromX, vert.fromY);
            ctx.lineTo(vert.toX, vert.toY);
            ctx.lineWidth = "2";
            ctx.strokeStyle = "lightgreen";
            ctx.stroke();
        },
        clear: (ctx, c) => {
            ctx.clearRect(0,0, c.width, c.height);
        },
        drawDots: (ctx, points) => {
            drawRect(ctx, points[0].x, points[0].y, true);
            for(var i = 1; i < points.length; i++){
                drawRect(ctx, points[i].x, points[i].y, false);
            }
        }
    };
};

function drawRect (ctx, x, y, last){
    ctx.beginPath();
    ctx.lineWidth = "6";
    if(last){
        ctx.fillStyle = "red";
    }else{
        ctx.fillStyle = "white";
    }
    ctx.rect(x-4, y-4, 8, 8); 
    ctx.fill();
}

export default drawService();

