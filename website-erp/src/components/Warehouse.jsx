/* Warehouse Component - src/components/Warehouse.jsx */

import React, { useState } from 'react';
import { useAppState } from '../context/StateContext';
import QRModal from './QRModal';

const Warehouse = () => {
    const { batches } = useAppState();
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (batch) => {
        setSelectedBatch(batch);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedBatch(null);
        setIsModalOpen(false);
    };

    // Filter batches
    const filteredBatches = activeFilter === 'ALL' 
        ? batches 
        : batches.filter(b => b.grade === activeFilter);

    return (
        <div className="view-warehouse-react">
            <div className="warehouse-title-row">
                <h1 className="warehouse-title">Manajemen Gudang</h1>
            </div>

            {/* Filter chips */}
            <div className="warehouse-filters">
                {['ALL', 'GRADE A', 'GRADE B', 'REJECT'].map((filter) => {
                    const label = filter === 'ALL' ? 'Semua' : (filter === 'GRADE A' ? 'Grade A' : (filter === 'GRADE B' ? 'Grade B' : 'Reject'));
                    return (
                        <button 
                            key={filter}
                            className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Chronological list */}
            <div className="batch-list">
                {filteredBatches.length === 0 ? (
                    <div className="recent-empty" style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
                        Tidak ada data panen untuk kriteria filter ini.
                    </div>
                ) : (
                    filteredBatches.map(b => {
                        const gradeClass = b.grade === 'GRADE A' ? 'grade-a' : (b.grade === 'GRADE B' ? 'grade-b' : 'reject');
                        return (
                            <div key={b.id} className="batch-item-card">
                                <div className="batch-item-header">
                                    <div>
                                        <div className="batch-number">{b.id}</div>
                                        <div className="batch-date">Panen: {b.tanggalPanen} | Tanam: {b.tanggalTanam}</div>
                                    </div>
                                    <span className={`quality-badge ${gradeClass}`}>{b.grade}</span>
                                </div>

                                {b.iceIce && (
                                    <div className="ice-ice-warning-badge">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                            <line x1="12" y1="9" x2="12" y2="13"/>
                                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                                        </svg>
                                        <span>SIAGA: Gejala Ice-Ice Terdeteksi!</span>
                                    </div>
                                )}

                                <div className="batch-info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Kadar Air</span>
                                        <span className="info-value" style={{ fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                            {b.kadarAir}%
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Pupuk Terpakai</span>
                                        <span className="info-value">{b.pupuk}</span>
                                    </div>
                                    <div className="info-item" style={{ marginTop: '6px' }}>
                                        <span className="info-label">Berat Basah</span>
                                        <span className="info-value">{b.beratBasah} kg</span>
                                    </div>
                                    <div className="info-item" style={{ marginTop: '6px' }}>
                                        <span className="info-label">Berat Kering</span>
                                        <span className="info-value">{b.beratKering} kg</span>
                                    </div>
                                </div>

                                <div className="batch-action-row">
                                    <button className="btn-print-qr" onClick={() => handleOpenModal(b)}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 6 2 18 2 18 9"/>
                                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                                            <rect x="6" y="14" width="12" height="8"/>
                                        </svg>
                                        Cetak QR Code
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Embedded clean QR code modal popup */}
            <QRModal 
                batch={selectedBatch} 
                active={isModalOpen} 
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Warehouse;
