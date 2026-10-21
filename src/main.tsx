import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import MusicRoom from './room';
import fallback from '../catalog.json';
import type {Catalog} from '../lib/catalog';
import './globals.css';
const backend='https://sete-vidas-de-um-canalha.abreubigode1.chatgpt.site';
function normalize(c:Catalog):Catalog{return {...c,albums:c.albums?.filter(a=>a.published).map(a=>({...a,cover:a.cover.startsWith('/art/')?a.cover.replace(/\.png$/,'.webp'):a.cover.startsWith('/media/')?backend+a.cover:a.cover})),previews:c.previews?.filter(p=>p.published).map(p=>({...p,cover:p.cover.startsWith('/')?backend+p.cover:p.cover,video:p.video.startsWith('/')?backend+p.video:p.video})),songs:c.songs.filter(s=>s.published).map(s=>({...s,cover:s.cover.startsWith('/art/')?s.cover.replace(/\.png$/,'.webp'):s.cover.startsWith('/media/')?backend+s.cover:s.cover}))};}
function App(){const [catalog,setCatalog]=useState(()=>normalize(fallback));useEffect(()=>{const abort=new AbortController();fetch(backend+'/api/public-catalog',{credentials:'omit',signal:abort.signal}).then(r=>{if(!r.ok)throw Error('Unavailable');return r.json();}).then(c=>setCatalog(normalize(c as Catalog))).catch(()=>{});return()=>abort.abort();},[]);return <MusicRoom catalog={catalog}/>;}
createRoot(document.getElementById('root')!).render(<App/>);

