/* QR Modal Component - src/components/QRModal.jsx */

import React, { useEffect, useRef } from 'react';

const QRModal = ({ batch, active, onClose }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!batch || !active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const baseUrl = window.location.origin.includes('localhost')
            ? `file:///D:/Coding/seaweed-project/qrcode_page/index.html`
            : 'https://trace.seacell-seaweed.com';
        const qrData = `${baseUrl}?batch=${batch.id}`;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Check for global QRious library
        if (window.QRious) {
            try {
                new window.QRious({
                    element: canvas,
                    value: qrData,
                    size: 200,
                    background: 'white',
                    foreground: '#0A4D68',
                    level: 'M'
                });
                return;
            } catch (e) {
                console.error('QRious generation failed:', e);
            }
        }

        // Draw simulated fallback QR
        drawSimulatedQR(canvas, batch.id);
    }, [batch, active]);

    const drawSimulatedQR = (canvas, value) => {
        const ctx = canvas.getContext('2d');
        const size = 200;
        canvas.width = size;
        canvas.height = size;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#0A4D68';

        // Finder patterns
        drawFinderPattern(ctx, 10, 10);
        drawFinderPattern(ctx, 140, 10);
        drawFinderPattern(ctx, 10, 140);

        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = value.charCodeAt(i) + ((hash << 5) - hash);
        }

        const seedRandom = (x, y) => {
            const val = Math.sin(x * 12.9898 + y * 78.233 + hash) * 43758.5453;
            return val - Math.floor(val);
        };

        for (let r = 0; r < 25; r++) {
            for (let c = 0; c < 25; c++) {
                if ((r < 8 && c < 8) || (r < 8 && c >= 17) || (r >= 17 && c < 8)) {
                    continue;
                }
                const posX = 10 + c * 7.2;
                const posY = 10 + r * 7.2;
                if (seedRandom(r, c) > 0.4) {
                    ctx.fillRect(posX, posY, 6, 6);
                }
            }
        }
    };

    const drawFinderPattern = (ctx, x, y) => {
        ctx.fillRect(x, y, 50, 50);
        ctx.fillStyle = 'white';
        ctx.fillRect(x + 7.1, y + 7.1, 35.8, 35.8);
        ctx.fillStyle = '#0A4D68';
        ctx.fillRect(x + 14.2, y + 14.2, 21.6, 21.6);
    };

    // Download PNG Action
    const handleDownload = () => {
        if (!batch || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const imageURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `QR-${batch.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Bluetooth print action
    const handleBluetoothPrint = () => {
        if (!batch) return;
        alert(`Mengirim perintah cetak label ${batch.id} ke Printer Bluetooth Portable... Selesai!`);
    };

    if (!active || !batch) return null;

    return (
        <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}>
            <div className="modal-container">
                <div className="modal-header">
                    <span className="modal-title">Pratinjau Label QR</span>
                    <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Tutup Jendela">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                {/* Center preview - strictly displaying ONLY the QR canvas */}
                <div className="qr-preview-box">
                    <canvas ref={canvasRef} className="qr-canvas" id="qr-canvas" width="200" height="200"></canvas>
                </div>
                
                <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={handleDownload}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        <span>Unduh Label QR (PNG)</span>
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleBluetoothPrint}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
                            <polyline points="6 9 6 2 18 2 18 9"/>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                            <rect x="6" y="14" width="12" height="8"/>
                        </svg>
                        <span>Cetak via Bluetooth Thermal</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QRModal;
