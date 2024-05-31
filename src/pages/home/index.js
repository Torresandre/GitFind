import { Header } from "../../components/Header";
import background from "../../Assets/background.svg";
import './styles.css';
import {ItemList} from "../../components/itemList";
import { useState } from "react";



function App() {
    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [repos, setRepos] = useState(null);

    const handleGetData = async () => {
        const userData= await fetch(`https://api.github.com/users/${user}`);
        const newUser= await userData.json();

        console.log(newUser)

        if(newUser.name){
          const {avatar_url, name, bio, login} = newUser;
          setCurrentUser({avatar_url, name, bio , login});

          const repoData= await fetch(`https://api.github.com/users/${user}/repos`);
          const newRepos= await repoData.json();

          if(newRepos.length){
            setRepos(newRepos);
          }

        }
    }

  return (

    <div className="App">
      <Header/>
      <div className="contend">
        <img src={background} className="background" alt="background"/>
        <div className="info">
          <div>
          <input name="usuario" value={user} 
           onChange={(event) => setUser(event.target.value)} placeholder="@username"/>
          <button type="button" onClick={handleGetData}>Buscar</button>
          

          </div>
          {currentUser?.name ? (
            <>
            <div className="perfil">
              <img src={currentUser.avatar_url} className="profile" alt="profile" />
              <div>
                <h3>{currentUser.name}</h3>
                <spam>@{currentUser.login}</spam>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr />
            </>
          ): null}
          {repos?.length ? (
          <div>
            <h4 className= "repositorio">Repositórios</h4>
            {repos.map(repo => (
               <ItemList title={repo.name} description={repo.description}/>
            ))}
           
            

          </div>
          ): null}
        </div>
      </div>

    </div>
  );
}

export default App;
