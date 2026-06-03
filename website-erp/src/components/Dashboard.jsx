/* Dashboard Component - src/components/Dashboard.jsx */

import React from 'react';
import { useAppState } from '../context/StateContext';

const Dashboard = () => {
    const { batches, dryerTemp, setDryerTemp, isIceIceOutbreakDetected } = useAppState();

    // Calculate total dry weight of Grade A & B ready stocks
    const readyStock = batches
        .filter(b => b.grade === 'GRADE A' || b.grade === 'GRADE B')
        .reduce((acc, curr) => acc + (curr.beratKering || 0), 0);

    const isOutbreak = isIceIceOutbreakDetected();
    const isOverheat = dryerTemp > 40.0;

    const recentBatches = batches.slice(0, 3);

    return (
        <div className="view-dashboard-react">
            <h1 className="dashboard-title">Dashboard Koperasi</h1>
            <p className="dashboard-subtitle">Ringkasan operasional budidaya & logistik rumput laut</p>

            <div className="metrics-grid">
                {/* Card 1: Stok Siap Jual */}
                <div className="metric-card stok">
                    <div className="metric-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                            <line x1="12" y1="22.08" x2="12" y2="12"/>
                        </svg>
                    </div>
                    <div className="metric-details">
                        <div className="metric-label">Stok Kering Gudang</div>
                        <div className="metric-value">
                            {readyStock.toFixed(1)} <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>kg</span>
                        </div>
                        <div className="metric-subtext">Grade A & B siap distribusi</div>
                    </div>
                </div>

                {/* Card 2: Suhu Dryer */}
                <div className="metric-card pengering">
                    <div className="metric-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
                        </svg>
                    </div>
                    <div className="metric-details">
                        <div className="metric-label">Suhu Alat Pengering</div>
                        <div className="metric-value">{dryerTemp.toFixed(1)}°C</div>
                        <div className="metric-subtext">Optimal panen: 35°C - 40°C</div>
                    </div>
                </div>

                {/* Card 3: Lahan Warning */}
                <div className={`metric-card lahan ${isOutbreak ? 'alert pulse-warning' : ''}`}>
                    <div className="metric-icon-wrapper" style={{ color: isOutbreak ? 'var(--color-warning)' : 'var(--color-success)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="5" r="3"/>
                            <line x1="12" y1="22" x2="12" y2="8"/>
                            <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
                            <path d="M19 12l-3-3M5 12l3-3"/>
                        </svg>
                    </div>
                    <div className="metric-details">
                        <div className="metric-label">Status Lingkungan Lahan</div>
                        <div className="metric-value" style={{ fontSize: 'var(--font-size-md)' }}>
                            {isOutbreak ? 'Siaga Ice-Ice' : 'Lahan Aman'}
                        </div>
                        <div className="metric-subtext">
                            {isOutbreak ? 'Terdeteksi gejala wabah ice-ice!' : 'Kondisi air & salinitas aman.'}
                        </div>
                    </div>
                    <span className={`metric-badge ${isOutbreak ? 'danger' : 'safe'}`}>
                        {isOutbreak ? 'Waspada' : 'Aman'}
                    </span>
                </div>
            </div>

            {/* Simulated Dryer Controls */}
            <div className="simulator-section">
                <div className="simulator-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                    </svg>
                    <span className="simulator-title">Simulator Suhu Pengering Portable</span>
                </div>
                <div className="simulator-display">
                    <div className="temp-gauge">
                        <span className="temp-label">Kondisi Dryer</span>
                        <span className="temp-val">{dryerTemp.toFixed(1)} °C</span>
                    </div>
                    <span className={`status-indicator ${isOverheat ? 'overheat' : 'optimal'}`}>
                        {isOverheat ? 'OVERHEAT' : 'OPTIMAL'}
                    </span>
                </div>
                <div className="control-slider-wrapper">
                    <div className="slider-labels">
                        <span>30.0°C (Dingin)</span>
                        <span>45.0°C (Panas)</span>
                    </div>
                    <input 
                        type="range" 
                        className="temp-slider" 
                        min="30" 
                        max="45" 
                        step="0.5" 
                        value={dryerTemp} 
                        onChange={(e) => setDryerTemp(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            {/* Recent Batches List */}
            <div className="recent-header">
                <span class="recent-title">Riwayat Batch Terbaru</span>
            </div>
            <div className="recent-list">
                {recentBatches.length === 0 ? (
                    <div className="recent-empty">Belum ada data produksi masuk.</div>
                ) : (
                    recentBatches.map(b => (
                        <div key={b.id} className="batch-item-card" style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <div className="batch-item-header">
                                <div>
                                    <div className="batch-number">{b.id}</div>
                                    <div className="batch-date">Panen: {b.tanggalPanen}</div>
                                </div>
                                <span className={`quality-badge ${b.grade === 'GRADE A' ? 'grade-a' : (b.grade === 'GRADE B' ? 'grade-b' : 'reject')}`}>
                                    {b.grade}
                                </span>
                            </div>
                            <div className="batch-info-grid">
                                <div className="info-item">
                                    <span className="info-label">Kadar Air</span>
                                    <span className="info-value">{b.kadarAir}%</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Berat Kering</span>
                                    <span className="info-value">{b.beratKering} kg</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
