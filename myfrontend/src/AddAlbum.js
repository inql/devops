import React, {useState, useEffect} from "react";
import axios from 'axios';


const AddAlbum = (props) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) =>{
        console.log(`Dane do wyslania ${title} ${body}`);
        axios.post('http://localhost:5000/albums',{
            name: title,
            artist: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
        document.getElementById("addalbumname").value = '';
        document.getElementById("addalbumartist").value = '';
    };

    return (
        <>
            <h1>Dodawanie nowych albumów</h1>
            <form id="addalbumform">
                <label for="addalbumname">Tytuł:</label>
                <input id="addalbumname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
                <label for="addalbumartist">Artysta:</label>
                <input id="addalbumartist" type='text' value={body} onChange={event => setBody(event.target.value)}/><br/>
                <input type='submit' value='OK' onClick={handleSubmit}/>
            </form>
        </>
    );
};

export default AddAlbum;