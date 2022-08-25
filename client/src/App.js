import { useEffect } from "react";

const App = () => {
  useEffect(()=>{
    fetch('/hi')
    .then(res=>res.json())
    .then(data=>console.log(data))
  })
  return (
    <div>test</div>
  );
}

export default App;
