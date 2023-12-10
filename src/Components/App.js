import './../Styles/Master.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios' 


function App() {
  const [data, updatedata] = useState(null)
   useEffect(()=>{
     async function getData(){
       let data = await axios.get("http://localhost:3000/db_data")
       console.log(data.data)
       updatedata(data.data)
     }
     getData()
   },[])
  
  function handleChangeValues(temp,id){
    data.map(value=>{
      if (Number(value['id']) == Number(id))
        {
//          console.log("found!!!")
          value['name'] = temp['name']
          value['age'] = temp['age']
          value['email'] = temp['email']
          value['address'] = temp['address']
        }
    })
    updatedata(data);
    ( async function(){
      await axios.put("http://localhost:3000/db_data/"+id,temp)
    }
    )();
  }
  
  let timeout = null
  function handleClick(event){
    if(timeout != null)
      clearTimeout(timeout);
    timeout = setTimeout(()=>{
      const values = ['name_','age_','address_','email_']
      const ID = event.target.id.split("_")[1];
      let result = {}
      values.map(val => {
        result[val.split("_")[0]] = document.querySelector("#"+val+ID).value
      })
//      console.log(result)
      handleChangeValues(result,ID)
      },500)
  }
  
  function createCard(data){
    let cards = [];
    for (let value in data){
      cards.push(
        <div className="w-96 h-auto bg-gray-100 rounded-md p-6 text-left mb-12 relative" key={value} id={"parent_"+data[value]['id']}>
          <div className="text-sm">NAME: <input type="text" defaultValue={data[value]['name']} className="text-sm bg-transparent pl-1" id={"name_"+data[value]['id']}/></div>
          <div className="text-sm">
            <p>AGE: <input type="text" defaultValue={data[value]['age']} className="text-sm bg-transparent pl-1" id={"age_"+data[value]['id']}/></p><p>ADDRESS: <input type="text" defaultValue={data[value]['address']} className="text-sm bg-transparent pl-1" id={"address_"+data[value]['id']}/></p>
          </div >
          <div className="text-sm">EMAIL: <input type="text" defaultValue={data[value]['email']} className="text-sm bg-transparent pl-1" id={"email_"+data[value]['id']}/></div>
          <button className="bg-teal-400 text- rounded py-1 px-3 mt-4 relative" id={"button_"+data[value]['id']} onClick={handleClick}>Save</button>
        </div>
      )
    }
    return cards;
  }
  
  return <div className = 'text-center w-full h-screen bg-gray-100'>
    <header className = 'w-full bg-white flex justify-center'>
      <div className="2xl:w-8/12 w-full py-4 px-20 2xl:px-6 relative flex items-center">
        <div className='Logo text-2xl font-bold whitespace-nowrap w-full text-left'>APP LOGO</div>
        <div className='Menu w-full text-right'>
          <ul className="inline-block w-auto space-x-6">
            <li className='inline'><a href="#">DASHBOARD</a></li>
            <li className='inline'><a href="#">CREATE ADS</a></li>
          </ul>
        </div>
      </div>
    </header>
    
    <div className="form w-full h-auto m-12 bg-white relative p-6 ">
      {data==null?<h1>FETCHING DATA!!!!</h1>:<div className="flex items-center space-x-6">{createCard(data)}</div>}
    </div>
  </div>
}

export default App;
