import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm';
import share from '../../assets/icons/share.svg';
import likeDone from '../../assets/icons/likeDone.svg';
import likeNotDone from '../../assets/icons/likeNotDone.svg';
import left from '../../assets/icons/left.svg';
import check from '../../assets/icons/check.svg';
import Loader from '../Loader';

export default function PostPage({ likeDb, setLikeDb}) {
  const history = useNavigate();
  let util = null;
  const params = useParams();
  const [data,setData] = useState(null);
  const [isCopiedNow, setIsCopiedNow] = useState(false);
  useEffect(() => {
    const baseURL = "https://images-api.nasa.gov/search?q=";
    axios.get(baseURL + encodeURIComponent(params.postId)).then((response) => {
        setData(response.data.collection.items);
      });
    }, [params.postId]);

    if (data === null) return <Loader/>;
    if (data?.length === 0) return <div>
      No data found
      <br/>
      <SearchForm />
      </div>;

  util = data[0].data[0];
  const tmp = new Date('2013-03-10T02:00:00Z');
  const newDate = tmp.getFullYear()+'-' + (tmp.getMonth()+1) + '-'+tmp.getDate()+' '+tmp.getHours()+':'+tmp.getMinutes()+':'+tmp.getSeconds();
    return (
        <article className='flex flex-col gap-8 md:px-32 px-4 pt-20 items-center'>
          <div className='block w-full text-left'>
            <button onClick={
              () => {
                history(-1);
            }
          }
            ><img src={left} alt='' className='w-4 h-5 inline-block -mt-px'/> <span className=''>
              Go Back 
              </span>
              </button>
          </div>
          <div className='text-center md:text-left'>
            <h3 className='text-3xl font-bold'>
              {util.title}
            </h3>
            <p className='text-sm opacity-70'>
              {util.date_created ? newDate : util.date_created}
            </p>
          </div>
          <div className='flex justify-center sm:px-20 md:pl-60 md:pr-44 w-full aspect-video'>
          
          <ShowMedia util={util}/>
          
          </div>
          <div className='md:px-40 sm:px-20 flex flex-col gap-2'>
            <p className='text-center'>Location - <span className='opacity-80'>
              {util.center} {util.location}
              </span>
              </p>
            <div className='flex justify-center gap-4 mt-2'>
              <button className='opacity-70 hover:opacity-100 border rounded-lg px-3 py-2' 
              onClick={() => {
                if(likeDb.includes(util["nasa_id"])){
                setLikeDb(likeDb.filter(item => item !== util.nasa_id));
                }
                else{
                  setLikeDb([...likeDb,util.nasa_id]);
                } 
              }}>
              
              {
            (likeDb.includes(util.nasa_id)) ?
            <div className='flex gap-2'><img src={likeDone} alt='' className='w-5 h-5 cursor-pointer' /> Unlike</div>
            :<div className='flex gap-2' ><img src={likeNotDone} alt='' className='w-5 h-5 cursor-pointer' /> Like</div>
              }
              </button>

              <button className='cursor-pointer opacity-70 hover:opacity-100 transition-colors flex gap-2 border rounded-lg px-3 py-2' onClick={async () => {
          const baseUrl = window.location.host+'/p/'+util.nasa_id
          await navigator.clipboard.writeText(baseUrl);
          setIsCopiedNow(true);
          setTimeout(() => {
            setIsCopiedNow(false);
          }
          ,3000);
        }}>

          {
            isCopiedNow ?
            (
              <>
              <img src={check} alt='' className='w-5 h-5' />
              Shareable Link Copied
              </>
            ):
            (<>
              <img src={share} alt='' className='w-4 h-4 mt-1'/>
              Copy Sharable Link
            </>)
          }
              </button>
            </div>
              <br/>
          <p className='opacity-80 pb-52'>
            {util.description}
          </p>
          </div>
      
        </article>
    )
}

export const ShowMedia = ({fromTile, util}) => {
  const [asset, setAsset] = useState(null);
  useEffect(() => {
    if(util.nasa_id){
    const baseURL = "https://images-api.nasa.gov/asset/";
    axios.get(baseURL + util["nasa_id"]).then((response) => {
      if(fromTile && util.media_type === 'video'){
        setAsset(response.data.collection.items.at(-2).href);
        return;
      }
      setAsset(response.data.collection.items[0].href);
    }
    )
  };
  }, [util, fromTile]);

  if(asset === null) return <Loader />;
  if(fromTile || util.media_type === 'image') return <img src={asset} className='h-full w-full rounded-lg' alt={util.title}/>;

return (
  (<video className='rounded-lg' controls >
    <source src={asset} type="video/mp4" />
    </video>)
)
};
