import { GlobalStyle } from './GlobalStyles';
import { HomePage } from './Homepage';
import { ViewSampleArt } from './ViewSampleArt';
import { ArtworkDetails } from './ArtworkDetails';
import { ArtistDetails } from './ArtistDetails';
import { LoginPage } from './LoginPage';
import { About } from './About';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  useEffect(()=>{
    fetch('/testing')
    .then(res=>res.json())
    .then(data=>console.log(data))
  })
  console.log(Math.floor(Math.random() * 1000 + 1))
  return (
    <>
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/muse' element={<ViewSampleArt/>}/>
        <Route exact path='/artwork/:id' element={<ArtworkDetails/>}/>
        <Route exact path='/artist/:name' element={<ArtistDetails/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/about' element={<About/>}/>
      </Routes>
    {/* <img src='https://www.artic.edu/iiif/2/1adf2696-8489-499b-cad2-821d7fde4b33/full/843,/0/default.jpg'/> */}
    </BrowserRouter>
    </> 
  );
}

export default App;
