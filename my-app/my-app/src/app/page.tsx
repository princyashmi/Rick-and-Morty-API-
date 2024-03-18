"use client"
import { use, useEffect, useState } from "react";
import Image from 'next/image'
interface episode {
  index: number, episode: string
}
interface ChLoadMore {
  count: number,
  pages: number,
  next: null | string,
  prev: null | string
}
export default function Page() {
  const [characters, setCharacters] = useState<any>([]);
  const [episode, setEpisode] = useState<any>([])
  const [characterError, setCharacterError] = useState<boolean>(false)
  const [selectedEP, setselectedEP] = useState<number | null>(null)
  const [selectedEPName, setselectedEPName] = useState<string | null>(null)
  const [characterLoadMore, setCharacterLoadMore] = useState<ChLoadMore | null>(null)
  const [episodeLoadMore, setEpisodeLoadMore] = useState<ChLoadMore | null>(null)
  let [results, setResults] = useState<any>([]);
  let [info, setInfo] = useState<any>([]);
  let [id, setID] = useState(1);
  const baseUrl = 'https://rickandmortyapi.com/api/'
  useEffect(() => {
    fetchData(null,null); 
    fetchData2(null)
  }, []);
 
 
  const fetchData = async (id: null | number,urlNext:null | string) => {
    try {

      let url = `${baseUrl}character`
      if (urlNext) {
        url = urlNext;
      } 
      const response = await fetch(url);
      const data = await response.json();
      setCharacterLoadMore(null);
      if (data.error === "There is nothing here") {
        setCharacters([]);
        setCharacterError(true)
      } else {
        setCharacterError(false)
        const { info: charInfo, results: charResult } = data;
        setCharacters([...characters, ...charResult]);

        if (charInfo.next !== null) {
          setCharacterLoadMore(charInfo);
        }

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData2 = async (urlNext: string | null) => {
    try {
      let url = null;
      if (urlNext) {
        url = urlNext;
      } else url = `${baseUrl}episode`
      // Your asynchronous code here, for example:
      const response = await fetch(url);
      const data = await response.json();
      setEpisodeLoadMore(null);
      if (data.error === "There is nothing here") {
        setEpisode([]);
      } else {
        const { info, results } = data;
        setEpisode([...episode, ...results]);

        if (info.next !== null) {
          setEpisodeLoadMore(info);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Initiate both requests in parallel

  function handleClick(id:number,name:string) {

    setID(id)
    setselectedEPName(name);
    // let obj = { index: i, episode: name };
    if (selectedEP === null) {

      setselectedEP(id);
      fetchData3(id)
    } else {
      if (Number(selectedEP) === Number(id)) {

        characters.length =0;
        setCharacterLoadMore(null);
        setselectedEP(null);
        fetchData(null,null);
      } else {
        setselectedEP(id);
        fetchData3(id)
      }
    }

  }

  const fetchData3 = async (id: number | null) => {
    let api = `${baseUrl}episode/${id}`;
    characters.length =0;
    setCharacterLoadMore(null);
    try {
      let data = await fetch(api).then((res) => res.json());
      setInfo(data);

      let a = await Promise.all(
        data.characters.map((x:any) => {
          return fetch(x).then((res) => res.json());
        })
      );
 
      setCharacters(a);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <> <main>
      <div id="productShowcaseContainer">
        <div id="productShowcaseTitle"> <p>Rick and morty characters</p></div>
        <div id="productShowcaseThumbnailContainer">
          <div className="talkingPointsHolder">
            <div className="genericScriptsHolder">
              <span className="listHeader episodes">Episodes</span>

              <ul
                className="scrollingList">
                {episode?.map((item: any, i: number) => (
                  <li key={i} onClick={() => handleClick(item.id,item.name)} className={selectedEP !== null && selectedEP === item.id ? "selectedLi" : "allLi"}>{item.name}</li>
                ))}

              </ul>
              {episodeLoadMore !== null && episodeLoadMore.next !== null ? <p className="episodeLoadMore"
                onClick={() => fetchData2(episodeLoadMore.next)}>
                loadMore
              </p> : null}
            </div>

          </div>

        </div>
        
        <div id="productShowcaseDetail">

        {selectedEP !== null ?<div className="charCount">{characters.length} characters in {`"${selectedEPName}"`}</div>:null}
<div className="contentDiv">
 

          {!characterError && characters?.map((item: any, i: number) => (
            <div className="imgDiv" key={i} >
              <img className="img" src={item.image} key={i} />
            </div>
          ))}
          {characterError ? <p>No data found</p> : null}
          {characterLoadMore !== null && characterLoadMore.next !== null ? <p onClick={() => fetchData(null, characterLoadMore.next)}>
            loadMore
          </p> : null}
</div>
      
        </div>

      </div>

    </main>
    </>
  )
}