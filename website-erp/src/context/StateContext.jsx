
/* React State Context - src/context/StateContext.jsx */

import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

const STORAGE_KEY = 'website_erp_rumput_laut_data_react';

const DEFAULT_BATCHES = [
    {
        id: 'BATCH-20260520-001',
        tanggalTanam: '2026-04-10',
        tanggalPanen: '2026-05-20',
        pupuk: 'NPK Kelp-Boost (Organik)',
        iceIce: false,
        iceIcePhoto: null,
        beratBasah: 100,
        beratKering: 69,
        kadarAir: 31.0,
        grade: 'GRADE A',
        suhuPengering: 38.5
    },
    {
        id: 'BATCH-20260522-002',
        tanggalTanam: '2026-04-12',
        tanggalPanen: '2026-05-22',
        pupuk: 'Urea Prima-Grow',
        iceIce: false,
        iceIcePhoto: null,
        beratBasah: 150,
        beratKering: 100,
        kadarAir: 33.3,
        grade: 'GRADE B',
        suhuPengering: 39.0
    },
    {
        id: 'BATCH-20260525-003',
        tanggalTanam: '2026-04-15',
        tanggalPanen: '2026-05-25',
        pupuk: 'Kompos Pesisir Subur',
        iceIce: true,
        iceIcePhoto: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F45050" opacity="0.2"/><text x="50" y="55" font-family="sans-serif" font-size="12" fill="%23F45050" text-anchor="middle">Gejala Ice-Ice</text></svg>',
        beratBasah: 80,
        beratKering: 50,
        kadarAir: 37.5,
        grade: 'REJECT',
        suhuPengering: 42.0
    }
];

export const StateProvider = ({ children }) => {
    const [batches, setBatches] = useState(() => {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) return JSON.parse(data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BATCHES));
            return DEFAULT_BATCHES;
        } catch (e) {
            console.error('Failed loading localStorage:', e);
            return DEFAULT_BATCHES;
        }
    });

    const [dryerTemp, setDryerTemp] = useState(38.5);

    // Save to localStorage when batches update
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(batches));
        } catch (e) {
            console.error('Failed saving to localStorage:', e);
        }
    }, [batches]);

    // Gravimetric Moisture Percentage Formula
    const calculateMoisture = (wet, dry) => {
        const w = parseFloat(wet);
        const d = parseFloat(dry);
        if (isNaN(w) || isNaN(d) || w <= 0) return 0;
        const moisture = ((w - d) / w) * 100;
        return parseFloat(moisture.toFixed(1));
    };

    // Industry Grade Assigner
    const determineGrade = (moisture) => {
        const m = parseFloat(moisture);
        if (isNaN(m)) return 'REJECT';
        if (m <= 32.0) return 'GRADE A';
        if (m <= 35.0) return 'GRADE B';
        return 'REJECT';
    };

    // Auto-generate next sequential batch ID
    const generateBatchId = () => {
        const today = new Date();
        const dateStr = today.getFullYear() + 
            String(today.getMonth() + 1).padStart(2, '0') + 
            String(today.getDate()).padStart(2, '0');

        const todaysBatches = batches.filter(b => b.id.includes(`BATCH-${dateStr}`));
        const nextNum = todaysBatches.length + 1;
        return `BATCH-${dateStr}-${String(nextNum).padStart(3, '0')}`;
    };

    const addBatch = (batchData) => {
        const newBatch = {
            id: generateBatchId(),
            tanggalPanen: new Date().toISOString().split('T')[0],
            suhuPengering: dryerTemp,
            ...batchData
        };
        setBatches(prev => [newBatch, ...prev]);
        return newBatch;
    };

    const isIceIceOutbreakDetected = () => {
        return batches.some(b => b.iceIce === true);
    };

    return (
        <StateContext.Provider value={{
            batches,
            dryerTemp,
            setDryerTemp,
            addBatch,
            calculateMoisture,
            determineGrade,
            generateBatchId,
            isIceIceOutbreakDetected
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useAppState = () => useContext(StateContext);
