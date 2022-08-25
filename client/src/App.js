import { GlobalStyle } from "./GlobalStyles";
import { Header } from "./Header";
import { HomePage } from "./Homepage";


import { useEffect } from "react";

const App = () => {
  useEffect(()=>{
    fetch('/testing')
    .then(res=>res.json())
    .then(data=>console.log(data))
  })
  return (
    <>
    <Header/>
    <GlobalStyle/>
    <HomePage/>
    <img src='https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg'/>
    </>
    
  );
}

export default App;
