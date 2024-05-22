export function fromPathString(s) {
    // Create an SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.visibility = "hidden";
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", s);
    svg.appendChild(path);
    document.body.appendChild(svg);
    const bbox = path.getBBox();
    document.body.removeChild(svg);

    return {
        path: new Path2D(s),
        data: s,
        bbox: bbox
    } 
}


export function _fillPath2D(ctx, p, rect) {
    return function () {
        const scaleWidth = rect.width / p.bbox.width 
        const scaleHeight = rect.height / p.bbox.height
        const scale = Math.min(scaleWidth, scaleHeight)
        const translateX = rect.x + (rect.width - p.bbox.width * scale) / 2 - p.bbox.x * scale;
        const translateY = rect.y + (rect.height - p.bbox.height * scale) / 2 - p.bbox.y * scale;

        ctx.save()
        ctx.translate(translateX,translateY)
        ctx.scale(scale,scale)
        ctx.fill(p.path)
        ctx.restore()
    }
}

export function _strokePath2D(ctx, p, rect) {
    return function () {
        const scaleWidth = rect.width / p.bbox.width 
        const scaleHeight = rect.height / p.bbox.height
        const scale = Math.min(scaleWidth, scaleHeight)
        const translateX = rect.x + (rect.width - p.bbox.width * scale) / 2 - p.bbox.x * scale;
        const translateY = rect.y + (rect.height - p.bbox.height * scale) / 2 - p.bbox.y * scale;

        ctx.save()
        ctx.translate(translateX,translateY)
        ctx.scale(scale,scale)
        ctx.stroke(p.path)
        ctx.restore()
    }
}

export function boundingBox(p) {
    return p.bbox;
}
