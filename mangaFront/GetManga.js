import React, { useState } from 'react';
import axios from 'axios';

function GetManga() {
    const [mangaName, setMangaName] = useState('');
    const [mangaInfo, setMangaInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleGetManga = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/manga/find_by_name`, {
                params: {titleName: mangaName}
            });
            setMangaInfo(response.data);
            setErrorMessage('');
            setIsVisible(true);
        } catch (error) {
            setMangaInfo(null);
            setErrorMessage(`Ошибка при получении информации о манге: ${error.message}`);
            setIsVisible(false);
        }
    };

    const hideMangaInfo = () => {
        setIsVisible(false);
    };

    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Получить информацию о манге</h2>
            <input
                type="text"
                value={mangaName}
                onChange={(e) => setMangaName(e.target.value)}
                placeholder="Введите название манги"
                style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button onClick={isVisible ? hideMangaInfo : handleGetManga} style={{ padding: '5px 10px'
                , borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none'
                , cursor: 'pointer' }}>{isVisible ? 'Скрыть информацию' : 'Получить информацию'}</button>
            {isVisible && mangaInfo && (
                <div style={{ marginTop: '10px' }}>
                    <h3>Информация о манге:</h3>
                    <p>Имя: {mangaInfo.title}</p>
                    <p>ID: {mangaInfo.id}</p>
                    <p>Тип: {mangaInfo.type}</p>
                    <p>Статус: {mangaInfo.status}</p>
                    <p>Последний том: {mangaInfo.lastVolume}</p>
                    <p>Последняя глава: {mangaInfo.lastChapter}</p>
                    <p>Год: {mangaInfo.year}</p>
                    <p>Автор: {mangaInfo.author.name}</p>
                    <p>Жанры:</p>
                    <ul>
                        {mangaInfo.genres.map((genre) => (
                            <li key={genre.id}>{genre.name}</li>
                        ))}
                    </ul>

                </div>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default GetManga;