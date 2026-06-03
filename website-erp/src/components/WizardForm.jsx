/* Production Input Form Wizard - src/components/WizardForm.jsx */

import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../context/StateContext';

const WizardForm = ({ setActiveTab }) => {
    const { addBatch, calculateMoisture, determineGrade, generateBatchId } = useAppState();
    
    const [currentStep, setCurrentStep] = useState(1);
    
    // Local form states
    const [tanggalTanam, setTanggalTanam] = useState(() => new Date().toISOString().split('T')[0]);
    const [pupuk, setPupuk] = useState('NPK Kelp-Boost (Organik)');
    const [iceIce, setIceIce] = useState(false);
    const [iceIcePhoto, setIceIcePhoto] = useState(null);
    const [beratBasah, setBeratBasah] = useState('');
    const [beratKering, setBeratKering] = useState('');

    const [liveMoisture, setLiveMoisture] = useState(0);
    const [liveGrade, setLiveGrade] = useState('REJECT');

    const fileInputRef = useRef(null);

    // Dynamic live moisture calculations
    useEffect(() => {
        const wet = parseFloat(beratBasah);
        const dry = parseFloat(beratKering);
        if (wet > 0 && dry > 0 && dry <= wet) {
            const moisture = calculateMoisture(wet, dry);
            setLiveMoisture(moisture);
            setLiveGrade(determineGrade(moisture));
        } else {
            setLiveMoisture(0);
            setLiveGrade('REJECT');
        }
    }, [beratBasah, beratKering]);

    // Handle next click
    const handleNext = () => {
        if (currentStep === 1) {
            if (!tanggalTanam) {
                alert('Silakan tentukan tanggal tebar bibit!');
                return;
            }
        } else if (currentStep === 2) {
            const wet = parseFloat(beratBasah);
            const dry = parseFloat(beratKering);
            if (isNaN(wet) || wet <= 0) {
                alert('Silakan masukkan Berat Basah yang valid!');
                return;
            }
            if (isNaN(dry) || dry <= 0) {
                alert('Silakan masukkan Berat Kering yang valid!');
                return;
            }
            if (dry > wet) {
                alert('Berat Kering tidak boleh melebihi Berat Basah!');
                return;
            }
        }
        setCurrentStep(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSave = () => {
        addBatch({
            tanggalTanam,
            pupuk,
            iceIce,
            iceIcePhoto,
            beratBasah: parseFloat(beratBasah),
            beratKering: parseFloat(beratKering),
            kadarAir: liveMoisture,
            grade: liveGrade
        });

        // Reset
        setCurrentStep(1);
        setTanggalTanam(new Date().toISOString().split('T')[0]);
        setPupuk('NPK Kelp-Boost (Organik)');
        setIceIce(false);
        setIceIcePhoto(null);
        setBeratBasah('');
        setBeratKering('');

        alert('Data Produksi Panen Berhasil Disimpan ke Gudang!');
        setActiveTab('warehouse');
    };

    // Convert and compress file to base64 JPEG
    const processAndCompressFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 600;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Output compressed base64 JPEG at 70% quality (~20KB-40KB)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                setIceIcePhoto(compressedDataUrl);
            };
            img.onerror = () => {
                alert('Gagal memuat gambar!');
            };
            img.src = event.target.result;
        };
        reader.onerror = () => {
            alert('Gagal membaca file!');
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('File yang diunggah harus berupa gambar!');
                return;
            }
            processAndCompressFile(file);
        }
    };

    // Drag-Drop events
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('File yang diunggah harus berupa gambar!');
                return;
            }
            processAndCompressFile(file);
        }
    };

    // Calculated progress fill
    const fillWidth = currentStep === 1 ? '0%' : (currentStep === 2 ? '50%' : '100%');

    return (
        <div className="view-wizard-react">
            <h1 className="dashboard-title">Input Produksi</h1>
            <p className="dashboard-subtitle">Catat data panen dan pantau mitigasi wabah</p>

            {/* Wizard Progress Bar */}
            <div className="wizard-progress">
                <div className="progress-line-fill" style={{ width: fillWidth }}></div>
                
                <div className="progress-step completed">
                    <div className="step-node">1</div>
                    <span className="step-label">Pra-Tanam</span>
                </div>
                <div className={`progress-step ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}>
                    <div className="step-node">2</div>
                    <span className="step-label">Pengeringan</span>
                </div>
                <div className={`progress-step ${currentStep === 3 ? 'active' : ''}`}>
                    <div className="step-node">3</div>
                    <span className="step-label">Batching</span>
                </div>
            </div>

            {/* Wizard Container */}
            <div className="wizard-steps-container">
                {/* TAHAP 1: PRA-TANAM */}
                {currentStep === 1 && (
                    <div className="wizard-step-view active">
                        <h2 className="step-title">Tahap 1: Pra-Tanam</h2>
                        
                        <div className="form-group">
                            <label className="form-label" htmlFor="tanggal-tanam">Tanggal Tebar Bibit</label>
                            <input 
                                type="date" 
                                id="tanggal-tanam" 
                                className="form-input" 
                                value={tanggalTanam} 
                                onChange={(e) => setTanggalTanam(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Jenis Pupuk Optimal</label>
                            <div className="radio-tile-group">
                                {[
                                    'NPK Kelp-Boost (Organik)', 
                                    'Urea Prima-Grow', 
                                    'Kompos Pesisir Subur'
                                ].map((type) => (
                                    <React.Fragment key={type}>
                                        <input 
                                            type="radio" 
                                            name="pupuk" 
                                            id={`pupuk-${type}`} 
                                            className="radio-tile-input" 
                                            value={type} 
                                            checked={pupuk === type}
                                            onChange={() => setPupuk(type)}
                                        />
                                        <label htmlFor={`pupuk-${type}`} className="radio-tile-label">
                                            <span className="radio-tile-text">{type}</span>
                                            <span className="radio-tile-dot"></span>
                                        </label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Ice-Ice Warning Toggle Switch */}
                        <div className="toggle-card">
                            <div className="toggle-info">
                                <span className="toggle-title">Gejala Wabah Ice-Ice?</span>
                                <span className="toggle-subtitle">Aktifkan jika rumput laut memutih/rapuh</span>
                            </div>
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={iceIce} 
                                    onChange={(e) => {
                                        setIceIce(e.target.checked);
                                        if (!e.target.checked) setIceIcePhoto(null);
                                    }}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {/* Disclose photo upload zone */}
                        {iceIce && (
                            <div className="upload-disclose active">
                                <div className="form-group">
                                    <label className="form-label">Unggah Foto Kondisi Penyakit</label>
                                    
                                    {!iceIcePhoto ? (
                                        <div 
                                            className="image-dropzone" 
                                            onClick={() => fileInputRef.current?.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                                                <circle cx="12" cy="13" r="4"/>
                                            </svg>
                                            <span className="image-dropzone-text">Sentuh untuk Unggah Foto Penyakit</span>
                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                className="radio-tile-input" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    ) : (
                                        <div className="image-preview-container" style={{ display: 'block' }}>
                                            <img src={iceIcePhoto} alt="Outbreak" className="image-preview" />
                                            <button 
                                                type="button" 
                                                className="image-preview-remove" 
                                                onClick={() => setIceIcePhoto(null)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* TAHAP 2: PENGERINGAN */}
                {currentStep === 2 && (
                    <div className="wizard-step-view active">
                        <h2 className="step-title">Tahap 2: Pengeringan</h2>
                        
                        <div className="form-group">
                            <label className="form-label" htmlFor="berat-basah">Berat Basah Panen (kg)</label>
                            <input 
                                type="number" 
                                id="berat-basah" 
                                className="form-input" 
                                placeholder="Contoh: 100" 
                                min="1" 
                                step="any" 
                                value={beratBasah} 
                                onChange={(e) => setBeratBasah(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="berat-kering">Berat Kering Hasil Dryer (kg)</label>
                            <input 
                                type="number" 
                                id="berat-kering" 
                                className="form-input" 
                                placeholder="Contoh: 68" 
                                min="1" 
                                step="any" 
                                value={beratKering} 
                                onChange={(e) => setBeratKering(e.target.value)}
                            />
                        </div>

                        {/* Lock Moisture Badge */}
                        {parseFloat(beratBasah) > 0 && parseFloat(beratKering) > 0 && parseFloat(beratKering) <= parseFloat(beratBasah) && (
                            <div className="calc-lock-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--color-success)' }}>
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <span className="calc-lock-text" style={{ color: 'var(--color-success)' }}>
                                    Kadar Air: {liveMoisture}% ({liveGrade})
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* TAHAP 3: BATCHING & REVIEW */}
                {currentStep === 3 && (
                    <div className="wizard-step-view active">
                        <h2 className="step-title">Tahap 3: Batching & Review</h2>
                        
                        <div style={{ background: 'var(--color-bg)', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-md)' }}>
                            <div className="info-item" style={{ marginBottom: 'var(--spacing-xs)' }}>
                                <span className="info-label">Nomor Batch Otomatis</span>
                                <span className="info-value" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                                    {generateBatchId()}
                                </span>
                            </div>
                            
                            <div className="form-row" style={{ marginBottom: 'var(--spacing-xs)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-xs)' }}>
                                <div className="info-item">
                                    <span className="info-label">Tanggal Tanam</span>
                                    <span className="info-value">{tanggalTanam}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Jenis Pupuk</span>
                                    <span className="info-value">{pupuk}</span>
                                </div>
                            </div>

                            <div className="form-row" style={{ marginBottom: 'var(--spacing-xs)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-xs)' }}>
                                <div className="info-item">
                                    <span className="info-label">Berat Basah / Kering</span>
                                    <span className="info-value">{beratBasah} kg / {beratKering} kg</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Gejala Ice-Ice</span>
                                    <span className="info-value" style={{ color: iceIce ? 'var(--color-warning)' : 'var(--color-success)', fontWeight: 700 }}>
                                        {iceIce ? 'Terdeteksi (Siaga)' : 'Tidak Ada (Aman)'}
                                    </span>
                                </div>
                            </div>

                            <div className="info-item" style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-xs)', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span className="info-label">Kadar Air Akhir</span>
                                    <span className="info-value" style={{ fontWeight: 700 }}>{liveMoisture}%</span>
                                </div>
                                <span className={`quality-badge ${liveGrade === 'GRADE A' ? 'grade-a' : (liveGrade === 'GRADE B' ? 'grade-b' : 'reject')}`}>
                                    {liveGrade}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="wizard-nav">
                {currentStep > 1 && (
                    <button className="btn btn-primary" style={{ background: 'var(--color-text-muted)' }} onClick={handlePrev}>
                        Kembali
                    </button>
                )}
                {currentStep < 3 ? (
                    <button className="btn btn-primary" onClick={handleNext}>
                        Lanjut
                    </button>
                ) : (
                    <button className="btn btn-secondary" onClick={handleSave}>
                        Simpan Data Panen
                    </button>
                )}
            </div>
        </div>
    );
};

export default WizardForm;
