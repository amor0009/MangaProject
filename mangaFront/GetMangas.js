// GetAllPlayers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateManga from './UpdateManga';
import CreateManga from "./CreateManga";

function GetMangas() {
    const [mangaName, setMangaName] = useState('');
    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMangas, setShowMangas] = useState(false);

    useEffect(() => {
        const fetchMangas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/manga/list');
                setMangas(response.data);
                setErrorMessage('');
            } catch (error) {
                setMangas([]);
                setErrorMessage(`Ошибка при получении списка игроков: ${error.message}`);
            }
        };

        fetchMangas();
    }, []);

    const updateMangaList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manga/list');
            setMangas(response.data);
            setErrorMessage('');
            setShowMangas(true);
        } catch (error) {
            setMangas([]);
            setShowMangas(false);
            setErrorMessage(`Ошибка при обновлении списка манги: ${error.message}`);
        }
    };

    const updateGenresList = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/manga/find_by_name`, {
                params: {titleName: mangaName}
            });
            setGenres(response.data.genres);
            setErrorMessage('');
        } catch (error) {
            setGenres([]);
            setErrorMessage(`Ошибка при обновлении списка манги: ${error.message}`);
        }
    };

    const deleteManga = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/manga/delete/${id}`);
            setErrorMessage('');
            setMangas(mangas.filter(manga => manga.id !== id));
        } catch (error) {
            setErrorMessage(`Ошибка при удалении манги: ${error.message}`);
        }
    };

    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: '#333', marginBottom: '10px' }}>Список всех манг</h2>
            {mangas.length >= 0 ? (
                    <div>
                        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                            {mangas.map((manga) => (
                                <li key={manga.id} style={{ marginBottom: '5px' }}>
                                    <UpdateManga
                                        mangaId={manga.id}
                                        mangaName={manga.title}
                                        mangaType={manga.type}
                                        mangaStatus={manga.status}
                                        mangaVolume={manga.lastVolume ? manga.lastVolume : "ещё нет"}
                                        mangaChapter={manga.lastChapter ? manga.lastChapter : "ещё нет"}
                                        mangaYear={manga.year}
                                        mangaAuthor={manga.author}
                                        mangaGenres={manga.genres}
                                        updateMangaList={updateMangaList}
                                        deleteManga={deleteManga}
                                        updateGenresList={updateGenresList}
                                    />
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: '20px' }}>
                            <CreateManga updateMangaList={updateMangaList} />
                        </div>
                    </div>
                ) : (
                <p>{errorMessage || 'Загрузка списка игроков...'}</p>
            )}
        </div>
    );
}
export default GetMangas;