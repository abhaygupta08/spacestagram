import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import {ShowMedia} from '../PostPage';
import share from '../../assets/icons/share.svg';
import likeDone from '../../assets/icons/likeDone.svg';
import likeNotDone from '../../assets/icons/likeNotDone.svg';
import Loader from '../../Components/Loader';

export function SearchPage({likeDb,setLikeDb}) {
  const [results, setResults] = useState(null);
  const [totalCount,setTotalCount] = useState(0);

  const params = useParams();

  useEffect(() => {
    const baseURL = "https://images-api.nasa.gov/search?q=";
    axios.get(baseURL + params.searchKey + '&page=' + params.pageNo).then((response) => {
      setTotalCount(response.data.collection.metadata.total_hits);

      setResults(response.data.collection.items);
    });
  }, [params.searchKey, params.pageNo]);

  if (results === null) return <Loader/>;
  if (results.length === 0) return <article style={{paddingTop : '30vh'}} className='text-center flex flex-col gap-6 items-center'>
    <div>
    <p className='opacity-80'>
      No results found for {params.searchKey}
    </p>
    <br/>
    <Link className='link-bottom-animation w-24' to='/'>Go to Home</Link>
    </div>
    </article>;

  return (
    <div className='px-10 md:px-20 lg:px-44 py-14 lg:py-24'>
      <div className='w-full block text-right'>
      <Link className='link-bottom-animation' to ={`/${window.location.host}/s/${params.searchKey}/${Number(params.pageNo)+1}`}>Go to Next Page</Link>
      </div>
    <div className='mb-10'>
    <h1 className='text-2xl font-bold'>{params.searchKey}</h1><p className='opacity-70'>Showing Top {totalCount} results</p>
    </div>
      <div className='flex md:justify-between justify-around flex-wrap gap-6 md:gap-8'>

      {results.map((result) => {
        if(result.data[0].media_type === 'image' || result.data[0].media_type === 'video'){
          return (
            <div key={result.data["nasa_id"]} >
            <Tile key={result.data["nasa_id"]} data={result.data[0]} likeDb={likeDb} setLikeDb={setLikeDb} />
          </div>
        );
      }
      else return null;
    })}
    </div>
    </div>
  )
}

export function SearchPageRedirect() {
  const history = useNavigate();
  const params = useParams();
  React.useEffect(() => {
    history(`/s/${params.searchKey}/1`);
  }, [history, params.searchKey]);
  return '';
}

export function Tile({data,key,likeDb,setLikeDb}) {
  const history = useNavigate();
  const [Information,setInformation] = useState(null);
  const getDateTime = (xtmp) => {
    if(!xtmp) return '';
    const tmp = new Date(xtmp);
    const newDate = tmp?.getFullYear()+'-' + (tmp?.getMonth()+1) + '-'+tmp?.getDate()+' '+tmp?.getHours()+':'+tmp?.getMinutes()+':'+tmp?.getSeconds();
    return newDate;
  }

  return (
    <div key={key}
    className='border border-gray rounded-lg inline-flex flex-col w-60 gap-4 py-3 px-4 h-80'>
      <div
      onClick={ () =>
        {        history(`/p/${data["nasa_id"]}`);
        }
              }
      className='cursor-pointer'
      >
        <h1 
        style={{textOverflow : 'ellipsis'}}
  className='font-semibold text-lg w-full whitespace-nowrap	overflow-hidden'
        >
          {data.title}
        </h1>
        <p className='opacity-70'>
          <span>
            {getDateTime(data?.date_created)}
          </span>
          &nbsp;•&nbsp;
          <span>
            {data?.center}
          </span>
        </p>
      </div>
      <div 
      onClick={ () =>
        {        history(`/p/${data["nasa_id"]}`);
        }
              }
        className='cursor-pointer rounded-lg h-28 bg-cover bg-black' >
      <ShowMedia util={data} fromTile={true} />
      </div>
      <div className='h-12 overflow-hidden w-full' style={{textOverflow : 'ellipsis'}}>
        {data?.description}
      </div>
      <div className='flex justify-between gap-4 px-8 h-5'>
        <button onClick={() => {
              if(likeDb.includes(data["nasa_id"])){
              setLikeDb(likeDb.filter(item => item !== data.nasa_id));
              setInformation('Unliked');
              setTimeout(() => {
                setInformation(null);
              }, 3000);
              }
              else{
                setLikeDb([...likeDb,data.nasa_id]);
                setInformation('Liked');
                setTimeout(() => {
                  setInformation(null);
                }, 3000);
              } 
            }}>
          {
            (likeDb.includes(data.nasa_id)) ?
            <img src={likeDone} alt='' title="UnLike" className='w-5 h-5 cursor-pointer' />
            :
            <img src={likeNotDone} alt='' title="Like" className='w-5 h-5 cursor-pointer' />
          }
        </button>
        <span>
          {Information}
          </span>
        <button title="Copy Sharable Link to Clipboard" className='cursor-pointer opacity-70 hover:opacity-100 transition-colors ' onClick={async () => {
          const baseUrl = window.location.host+'/p/'+data.nasa_id
          await navigator.clipboard.writeText(baseUrl);
          setInformation('Copied');
          setTimeout(() => {
            setInformation(null);
          }
          , 3000);
        }}>
          <img src={share} alt='' className='w-4 h-4'/>
        </button>
      </div>
    </div>
  );
}

