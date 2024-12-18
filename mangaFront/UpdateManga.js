import React, { useState } from 'react';
import axios from 'axios';

function UpdateManga({ mangaId, mangaName, mangaType, mangaStatus, mangaVolume, mangaChapter, mangaYear,
                         mangaAuthor, mangaGenres, updateMangaList, deleteManga, updateGenresList}) {
    const [newName, setNewName] = useState(mangaName || '');
    const [newType, setNewType] = useState(mangaType || '');
    const [newStatus, setNewStatus] = useState(mangaStatus || '');
    const [newLastVolume, setNewLastVolume] = useState(mangaVolume || '');
    const [newLastChapter, setNewLastChapter] = useState(mangaChapter || '');
    const [newYear, setNewYear] = useState(mangaYear || 0);
    const [newGenres, setNewGenres] = useState(mangaGenres || []);
    const [newGenreName, setNewGenreName] = useState('');
    const [newGenreType, setNewGenreType] = useState('genre');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUpdateManga = async () => {
        const newManga = {
            title: newName,
            id: mangaId,
            type: newType,
            status: newStatus,
            lastVolume: newLastVolume,
            lastChapter: newLastChapter,
            year: newYear,
            author: mangaAuthor,
            genres: newGenres
        };
        try {
            await axios.put(`http://localhost:8080/manga/update`, newManga);
            setSuccessMessage('Манга успешно обновлена');
            setErrorMessage('');
            updateMangaList();
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(`Ошибка при обновлении манги: ${error.message}`);
        }
    };

    const handleAddGenre = async () => {
        if (!newGenreName) return;

        const newGenre = {
            id: Date.now().toString(),
            name: newGenreName,
            type: newGenreType
        };

        try {
            // Сначала создаем жанр
            const response = await axios.post(`http://localhost:8080/genre/save`, newGenre);
            const addedGenre = response.data;

            // Затем привязываем жанр к манге
            await axios.put('http://localhost:8080/manga/add_genre', { genreId: addedGenre.id, mangaId });

            setSuccessMessage('Жанр успешно добавлен и привязан к манге');
            setErrorMessage('');
            setNewGenres([...newGenres, addedGenre]);
            setNewGenreName('');
            updateGenresList();
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(`Ошибка при добавлении жанра: ${error.message}`);
        }
    };


    const handleRemoveGenre = async (genreId) => {
        try {
            await axios.delete(`http://localhost:8080/genre/delete/${genreId}`);
            setNewGenres(newGenres.filter(g => g.id !== genreId));
            setSuccessMessage('Жанр успешно удален');
            setErrorMessage('');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(`Ошибка при удалении жанра: ${error.message}`);
        }
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '10px' }}>Название: {mangaName}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Новое название манги"
                    style={{
                        marginBottom: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="Новый тип манги"
                    style={{
                        marginBottom: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="text"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    placeholder="Новый статус манги"
                    style={{
                        marginBottom: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="text"
                    value={newLastVolume}
                    onChange={(e) => setNewLastVolume(e.target.value)}
                    placeholder="Новый номер последнего тома"
                    style={{
                        marginBottom: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="text"
                    value={newLastChapter}
                    onChange={(e) => setNewLastChapter(e.target.value)}
                    placeholder="Новый номер последней главы"
                    style={{
                        marginBottom: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value, 10))}
                    placeholder="Новый год выпуска"
                    style={{
                        marginBottom: '10px',
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={newGenreName}
                        onChange={(e) => setNewGenreName(e.target.value)}
                        placeholder="Добавить жанр"
                        style={{
                            padding: '5px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            flex: '1',
                            marginRight: '10px'
                        }}
                    />
                    <button onClick={handleAddGenre} style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        background: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}>Добавить жанр
                    </button>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    {newGenres.map((genre) => (
                        <div key={genre.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                            <span>{genre.name}</span>
                            <button onClick={() => handleRemoveGenre(genre.id)} style={{
                                padding: '5px 10px',
                                borderRadius: '5px',
                                background: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}>Удалить
                            </button>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={handleUpdateManga} style={{
                        flex: '1',
                        padding: '10px 0',
                        borderRadius: '5px',
                        background: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}>Обновить мангу
                    </button>
                    <button onClick={() => deleteManga(mangaId)} style={{
                        flex: '1',
                        padding: '10px 0',
                        borderRadius: '5px',
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}>Удалить мангу
                    </button>
                </div>
                {successMessage && <p style={{ color: 'green', margin: '5px 0' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red', margin: '5px 0' }}>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default UpdateManga;
