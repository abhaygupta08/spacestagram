import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import search from '../assets/icons/search.svg'
import x from '../assets/icons/x.svg';
import searchWhite from '../assets/icons/searchWhite.svg';
export default function Navigation() {
    const history = useNavigate();
    const [searchValue,setSearchValue] = useState('')
    const [searchActive,setSearchActive] = useState(false)
    useEffect(() => {
        if(searchActive){
            document.querySelector('#searchInput').focus();
            return;
        }
        document.querySelector('#searchInput').addEventListener('focusout',() => 
        {
        setTimeout(() => {
        setSearchActive(false)
    },500)
    })
},[searchActive])
    return (
        <header className='px-8 py-4 gap-6 text-white flex flex-col md:flex-row items-center'>
            <h2 className='text-2xl font-thin tracking-widest flex gap-1 cursor-pointer' onClick={() => history('/')}>
                <span className='font-thin opacity-80 inline-flex'>
                    Spacesta</span>
                <span className='font-bold'>gram</span>
            </h2>
            <nav className='md:pl-8 w-full'>
                <ul className='flex justify-around gap-4 md:gap-8 w-full items-center'>
                    <li><Link className='link-bottom-animation' to='/explore'>Explore</Link></li>
                    <li className='w-full'><form onSubmit={(e) => {
                        e.preventDefault();
                        if(searchValue.length === 0) return;
                        history(`/s/${searchValue}`) 
                        setSearchActive(false);
                    }} className='flex items-center w-full'>
                        <div className='relative w-full flex justify-end'>
                            <input id="searchInput" className={`rounded-full px-3 py-2 outline-none text-black ease-in-out transition-all duration-500 ${searchActive ? 'w-full opacity-100' : 'w-0 opacity-0'}`} type="text" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} placeholder='Search for keyword...'/>
                            {!searchActive ? <img className='cursor-pointer' src={searchWhite} alt='' onClick={() => setSearchActive(true)}/>
                            :
                            <img src={(searchValue)?x:search} alt='' title="Enter your Search Keyword and hit Enter" style={{
                                position: 'absolute',
                                top :'50%',
                                transform : 'translateY(-50%)',
                                right : '1rem',
                                cursor : 'pointer'
                            }} 
                            onClick={
                                () => {
                                    if(searchValue.length > 0)
                                    setSearchValue('')
                                }
                            }/>}
                            
                        </div>
                    </form></li>
                    <li className='w-44'><a className='link-bottom-animation' href="https://api.nasa.gov/#browseAPI">API Docs</a></li>
                </ul>
            </nav>

        </header>
    )
}
