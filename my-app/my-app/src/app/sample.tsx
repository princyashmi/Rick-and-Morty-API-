
"use client";
import { useEffect, useState } from "react";
export default  function Page() {
  let [fetchedData, updateFetchedData] = useState<any>([]);
  let [next,setNext]= useState<any>(null);
  let [result, setResults] = useState<any>([]);
  let [info, setInfo] = useState([]);
   let apiUrl = "https://rickandmortyapi.com/api/episode";
  
 
  useEffect(() => {
    
    fetchEpisode(apiUrl);
    setResults([]);
    console.log('data in the item')
  },[apiUrl]);

  async function fetchEpisode(api:any) {
    let data = await fetch(api).then((res) => res.json());
    let { info, results } = data;
    updateFetchedData(data);
    //if(results)
    setResults((prevItems:any) => [...prevItems, ...results]);
   // setResults(results);
    console.log(data);
  }
   return <main>
  {/* <ul style={{ width: "400px", height: "700px", overflowY: "scroll" }}>
    {result?.map((item:any, i:number) => (
      <li key={i}>{item.name}</li>
    ))}
  </ul>
  <button onClick={()=> {
    if(fetchedData.info.next !== null){
      apiUrl= fetchedData.info.next;
      fetchEpisode(fetchedData.info.next)
    }
  }
  }>Next</button>

<button onClick={()=> {
   setResults([]);
  }
  }>CLEAR</button> */}
   
</main>
}
// import useApi from "./api/useApi";

// const baseUrl='https://rickandmortyapi.com/api';
 
// export default async function Page() {
//   console.log('data>>>>',baseUrl)
//   let pagesize = "1";

// let episodeUri =`${baseUrl}/episode?page=${pagesize}`;
// console.log('episodeUri>>>>',episodeUri)
// let chareUri =`${baseUrl}/episode?page=20`

//   const episode = await useApi(episodeUri);
//   console.log('episode>>>',episode)
// const {results:episodes} = episode;
// const character = await useApi('https://rickandmortyapi.com/api/character');
// const {results:characters} = character;
// // console.log('character>>>>>>',characters,"episodes>>>>>",episodes);
 
//   return <main>
//   <ul style={{ width: "400px", height: "700px", overflowY: "scroll" }}>
//     {episodes?.map((item:any, i:number) => (
//       <li key={i}>{item.name}</li>
//     ))}
//   </ul>
// </main>
// }
