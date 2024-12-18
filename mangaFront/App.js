// App.js
import React, {useEffect, useState} from 'react';
import GetMangas from './GetMangas';

function App() {
    return (
        <div style={{ padding: '20px', background: 'linear-gradient(to bottom right, rgba(200, 44, 0, 0.1) 50%, transparent 00%)' }}>
            <h1 style={{ textAlign: 'center' }}>Управление информацией о манге</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <GetMangas />
            </div>
        </div>
    );
}
export default App;