import { describeArc, commafy } from './helpers';

export const generateGoldenSpiral = (iterations: number, setError: (val: string) => void) => {
    if (isNaN(iterations) || iterations <= 0) {
        setError('Пожалуйста, введите допустимое положительное число для итераций.');
        return;
    }

    const seq = [1, 1];
    const seq_length = seq.length;
    let prev = seq_length - 1;
    const iteration_size = 8;
    const total_count = iterations * iteration_size;

    for (let i = 0; i < total_count - seq_length; i++) {
        const a = seq[prev - 1] + seq[prev];
        prev++;
        seq.push(a);
    }

    const h = seq[seq.length - 1];
    const w = h + seq[seq.length - 2];
    const gtr = 1;
    const scale = window.innerWidth / w;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgNS = svg.namespaceURI;

    svg.setAttribute('class', 'goldenSpiral');
    svg.setAttribute('width', '80%');
    svg.setAttribute('height', '80%');
    svg.setAttribute('viewBox', `0 0 ${w * scale + gtr} ${h * scale + gtr}`);

    let prev_x = gtr / 2;
    let prev_y = gtr / 2;
    let prev_di = 0;

    const rects = document.createElementNS(svgNS, 'g');
    const paths = document.createElementNS(svgNS, 'g');
    const circles = document.createElementNS(svgNS, 'g');
    const texts = document.createElementNS(svgNS, 'g');

    for (let i = seq.length - 1; i >= 0; i--) {
        const rect = document.createElementNS(svgNS, 'rect');
        const path = document.createElementNS(svgNS, 'path');
        const circle = document.createElementNS(svgNS, 'circle');
        const text = document.createElementNS(svgNS, 'text');
        const di = seq[i] * scale;

        let x, y, d, c;

        switch (i % 4) {
            case 3:
                x = prev_x;
                y = Math.max(prev_y - di, gtr / 2);
                d = describeArc(x + di, y + di, di, 270, 360);
                c = [x + di, y + di, di];
                break;
            case 2:
                x = prev_x + prev_di;
                y = prev_y;
                d = describeArc(x, y + di, di, 0, 90);
                c = [x, y + di, di];
                break;
            case 1:
                x = prev_x + prev_di - di;
                y = prev_y + prev_di;
                d = describeArc(x, y, di, 90, 180);
                c = [x, y, di];
                break;
            case 0:
                x = prev_x - di;
                y = prev_y + prev_di - di;
                d = describeArc(x + di, y, di, 180, 270);
                c = [x + di, y, di];
                break;
        }

        const ratio = di / (w * scale + gtr);

        if (x && y && d && c) {
            text.textContent = commafy(seq[i]);
            text.setAttribute('x', String(x + di / 2));
            text.setAttribute('y', String(y + di / 2));
            text.setAttribute('font-size', String(ratio * 300));
            texts.appendChild(text);

            rect.setAttribute('x', String(x));
            rect.setAttribute('y', String(y));
            rect.setAttribute('width', String(di));
            rect.setAttribute('height', String(di));
            rects.appendChild(rect);

            path.setAttribute('d', d);
            paths.appendChild(path);

            circle.setAttribute('cx', String(c[0]));
            circle.setAttribute('cy', String(c[1]));
            circle.setAttribute('r', String(c[2]));
            circles.appendChild(circle);

            prev_x = x;
            prev_y = y;
            prev_di = di;
        }
    }

    const master = document.createElementNS(svgNS, 'g');
    master.setAttribute('class', 'master');

    master.appendChild(rects);
    master.appendChild(circles);
    master.appendChild(paths);
    master.appendChild(texts);

    svg.appendChild(master);

    document.querySelector('main')?.appendChild(svg)
};
