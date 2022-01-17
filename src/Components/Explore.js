import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import {Tile} from './SeachPage';
import Loader from './Loader';

export default function Explore({ likeDb, setLikeDb}) {
    const [results, setResults] = useState(null);
    const [randomTopic,setRandomTopic] = useState('');
    const [totalCount,setTotalCount] = useState(0);

    useEffect(() => {
    const topics = ['Earth','India Water','Mars India','Indian Climate'];
        setRandomTopic(
            topics[Math.floor(Math.random() * topics.length)]
        )
    }, []);
useEffect(() => {
    const baseURL = "https://images-api.nasa.gov/search?q=";
    axios.get(baseURL + randomTopic + '&page=1').then((response) => {
        if(response.data.collection.metadata.total_hits > 100){
            setTotalCount(Math.floor(100));
            // setTotalCount(Math.floor(response.data.collection.metadata.total_hits/40));
            }
            else setTotalCount(response.data.collection.metadata.total_hits);
    
      setResults(response.data.collection.items);
    });
  }, [randomTopic]);

  if (results === null) return <Loader/>;
  
  return (
    <div className='md:px-20 lg:px-44 py-14 lg:py-24'>
        <div className='mb-10 pl-20 md:pl-0 text-left'>
        <h1 className='text-2xl font-bold'>{randomTopic}</h1><p className='opacity-70'>Showing Top {totalCount} results</p>
        </div>
    <div className='flex md:justify-between justify-around flex-wrap gap-6 md:gap-3'>
      {results.map((result,index) => {
          if(index > totalCount) return null;
        if(result.data[0].media_type === 'image' || result.data[0].media_type === 'video'){
          return (
            <div key={result.data["nasa_id"]} >
            <Tile key={result.data["nasa_id"]} data={result.data[0]}  likeDb={likeDb} setLikeDb={setLikeDb}  />
          </div>
        );
      }
      else return null;
    })}
    </div>
  </div>
    )
}



