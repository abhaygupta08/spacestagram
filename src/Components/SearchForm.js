import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchForm() {
  
  const history = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [searchPlaceholder,setSearchPlaceholder] = useState('Mars');
  
  useEffect(() => {
      const psbl = ['Earth','Water','Satelitte','Indian Climate'];
      let i=0;
      setInterval(() => {
        setSearchPlaceholder(psbl[i]);
        i++;
        if(i>=psbl.length) i=0;
      },4000);
    },[]);

    const HandleSubmit = (e) => {
      e.preventDefault();
      history(`/s/${searchKey}/1`);
    }
    return (<>
    <form className='flex gap-3 justify-center flex-wrap flex-col md:flex-row px-8 md:px-20 w-full' onSubmit={(e) => {HandleSubmit(e)} }>
      <input type="text" className='px-4 py-3 min-w-52 md:w-1/2 rounded-full text-black outline-none w-full' placeholder={`Search for "${searchPlaceholder}"`} value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
      <button type="submit" className='bg-dark text-xLight border border-white md:px-4 py-3 rounded-full hover:bg-xLight hover:text-dark duration-300 transition-colors mx-auto md:mx-0 w-1/2 md:w-max'>Search</button>
    </form>
    </>);
  }
