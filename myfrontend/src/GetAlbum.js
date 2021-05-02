import React, {useState, useEffect} from "react";
import axios from 'axios';


const GetAlbum = (props) => {

    const [albumID, setAlbumID] = useState("");
    const [album, setAlbum] = useState([]);

    const handleSubmit = (event) =>{
        axios.get(`http://localhost:5000/albums/${albumID}`)
        .then(response => setAlbum(response.data))
        .catch(error => console.log(error));
        event.preventDefault();
        document.getElementById("getalbumid").value = '';
    };

    return (
        <>
        <div>
            <h1>Wyszukanie pojedynczego albumu</h1>
            <label for="getalbumid">ID:</label>
            <input id="getalbumid" type='text' value={albumID} onStar onChange={event => setAlbumID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
            <br/><br/>
            <table class="tg">
            <thead>
            <tr>
                <th class="tg-0lax" colspan="2">Wynik</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="tg-0lax">Tytuł</td>
                <td class="tg-0lax">Artysta</td>
            </tr>
            <tr>
                <td class="tg-0lax">{album.name}</td>
                <td class="tg-0lax">{album.artist}</td>
            </tr>
            </tbody>
            </table>
        </div>
        </>
    );
};

export default GetAlbum;