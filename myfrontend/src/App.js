import './App.css';
import {useState} from "react";
import Album from './Album';
import AddAlbum from './AddAlbum';
import UpdateAlbum from './UpdateAlbum';
import DeleteAlbum from './DeleteAlbum';
import GetAlbum from './GetAlbum';

function App() {

  const [initialValue, setInitialValue] = useState(1234);

  const handleInitialValue = (event) => {
    setInitialValue(event.target.value);
  };
  return (
    <div>

      {/* <input onChange={handleInitialValue}/> */}

      <Album initValue={initialValue} changeParentHandler={setInitialValue}/>
      <AddAlbum/>
      <UpdateAlbum/>
      <DeleteAlbum/>
      <GetAlbum/>
    </div>
  );
}

export default App;
