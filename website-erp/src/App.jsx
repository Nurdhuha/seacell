/* Main App Shell Coordinator - src/App.jsx */

import React, { useState } from 'react';
import { StateProvider } from './context/StateContext';

// Import CSS variables and styles
import './styles/variables.css';
import './styles/main.css';
import './styles/dashboard.css';
import './styles/forms.css';
import './styles/warehouse.css';

// Import Screens Components
import Dashboard from './components/Dashboard';
import WizardForm from './components/WizardForm';
import Warehouse from './components/Warehouse';

const App = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <StateProvider>
            {/* Top Navigation Header */}
            <header>
                <div className="logo-container" id="logo-branding">
                    {/* Modern minimalist double wave SVG logo */}
                    <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 10c3 0 3 3 6 3s3-3 6-3 3 3 6 3 3-3 6-3M2 14c3 0 3 3 6 3s3-3 6-3 3 3 6 3 3-3 6-3"/>
                    </svg>
                    <span className="logo-text">SEACELL</span>
                </div>
                
                <div className="user-profile" id="user-info-trigger">
                    <div className="user-info">
                        <div className="user-name">Budi Santoso</div>
                        <div className="user-role">Pengurus Koperasi</div>
                    </div>
                    <div className="user-avatar" title="Budi Santoso">BS</div>
                </div>
            </header>

            {/* Sticky Navigation Tab Bar */}
            <nav className="app-tabs" id="main-navigation">
                <button 
                    className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                    title="Dashboard Utama"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="9" rx="1"/>
                        <rect x="14" y="3" width="7" height="5" rx="1"/>
                        <rect x="14" y="12" width="7" height="9" rx="1"/>
                        <rect x="3" y="16" width="7" height="5" rx="1"/>
                    </svg>
                    <span>Beranda</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'wizard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wizard')}
                    title="Form Panen Baru"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    <span>Input Data</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'warehouse' ? 'active' : ''}`}
                    onClick={() => setActiveTab('warehouse')}
                    title="Gudang & Cetak QR"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    <span>Gudang QR</span>
                </button>
            </nav>

            {/* Centered Main Viewport wrapper */}
            <main className="app-container">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'wizard' && <WizardForm setActiveTab={setActiveTab} />}
                {activeTab === 'warehouse' && <Warehouse />}
            </main>

            {/* Floating Action Button (FAB) hooks to Input Wizard */}
            <button 
                className="fab-btn" 
                onClick={() => setActiveTab('wizard')}
                title="Input Data Cepat"
                aria-label="Tambah Data Baru"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </button>
        </StateProvider>
    );
};

export default App;
