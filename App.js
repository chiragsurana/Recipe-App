import React ,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {
  const APP_ID ='2695c62f';
  const APP_KEY ='9e5ddbf41b6c074980e58bf884b171d0';
   
  
const [recipes,setRecipes]=useState([]);
const [search ,setSearch]=useState('');
const [query,setQuery]=useState('alchohol');


  useEffect(()=>{
    getRecipies();
  },[query]);

  const getRecipies = async ()=> {
    const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json();
  setRecipes(data.hits);
  
  console.log(data.hits)
  }
  const updateSearch =e =>{
    setSearch(e.target.value);
    
   
  }
  const getSearch =e=>{
    e.preventDefault();
    setQuery(search);
    setSearch(''); 
  }
  return (
    <div className="App">
    
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} placeholder="Enter Here" onChange={updateSearch}></input>
        <button className="search-button" type="submit">Search</button>
        <h2 id="search">You Searched for ({query})</h2>
      </form>
      <div className="recipes">
      {recipes.map((recipe) =>(
        <Recipe 
         key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
