export const commafy = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number, y: number } => {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
    ].join(' ');
    return d;
};
