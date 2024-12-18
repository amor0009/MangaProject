// CreateManga.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateManga({ updateMangaList }) {
    const [name, setTitle] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const createManga = async () => {
        try {
            await axios.get('http://localhost:8080/manga/manga_dex',{
                params: {
                    titleName: name
                }
            });
            setSuccessMessage(`Манга с названием ${name} успешно создана`);
            setErrorMessage('');
            if(updateMangaList)
                updateMangaList()
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(`Ошибка при создании манги: ${error.message}`);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Добавить мангу</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название манги"
                style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button onClick={createManga} style={{ padding: '5px 10px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Добавить мангу</button>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default CreateManga;