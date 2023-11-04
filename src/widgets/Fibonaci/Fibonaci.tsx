import { useState } from 'react';
import './Fibonacy.css';
import { generateGoldenSpiral } from './GoldenSpiral';

function GoldenSpiral() {
    const [iterations, setIterations] = useState(1);
    const [error, setError] = useState('');
    const [isSpiralGenerated, setIsSpiralGenerated] = useState(false);

    const handleGenerateSpiral = () => {
        generateGoldenSpiral(iterations, setError);
        setIsSpiralGenerated(true);
    };

    const handleResetSpiral = () => {
        const svgToRemove = document?.querySelector('main')?.querySelector('svg');
        document.querySelector('main')?.removeChild(svgToRemove as Node);
        setIsSpiralGenerated(false);
    };

    return (
        <div>
            {!isSpiralGenerated && <div>
                <label>Iterations: </label>
                <input
                    type="number"
                    value={isNaN(iterations) || iterations <= 0 ? '' : iterations}
                    onChange={(e) => setIterations(parseInt(e.target.value, 10))}
                />
            </div>}
            <button onClick={isSpiralGenerated ? handleResetSpiral : handleGenerateSpiral}>
                {isSpiralGenerated ? 'Сбросить' : 'Генерировать'}
            </button>
            {error && <div>{error}</div>}
        </div>
    );
}

export default GoldenSpiral;
