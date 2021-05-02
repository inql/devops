import React, {useState, useEffect} from "react";
import axios from 'axios';

const Album = (props) => {
    const [albums, setAlbums] = useState([]);
    const[number, setNumber] = useState(-1);
    useEffect(() =>{
        axios.get('http://localhost:5000/albums')
        .then(response => setAlbums(response.data))
        .catch(error => console.log(error));
    }, []);

    return (
    <>
        <h1>Biblioteka muzyczna</h1>
        <div>
        <table class="tg">
            <thead>
            <tr>
                <th class="tg-0lax" colspan="3">Wszystkie albumy</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="tg-0lax">ID</td>
                <td class="tg-0lax">Tytuł</td>
                <td class="tg-0lax">Artysta</td>
            </tr>
            {albums.map(album => 
                (
                    <tr>
                        <td class="tg-0lax">{album.id}</td>
                        <td class="tg-0lax">{album.name}</td>
                        <td class="tg-0lax">{album.artist}</td>
                    </tr>
                    ))}
            </tbody>
            </table>
        </div>
    </>
    );
}



export default Album;