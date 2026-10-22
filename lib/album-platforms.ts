import type {Album} from './catalog';
export type AlbumPlatform='soundcloud'|'youtube'|'spotify'|'other';
export const platformNames:Record<AlbumPlatform,string>={soundcloud:'SoundCloud',youtube:'YouTube',spotify:'Spotify',other:'Outra plataforma'};
export function albumLinks(album:Album):{platform:AlbumPlatform;url:string}[]{
 const links:{platform:AlbumPlatform;url:string}[]=[];
 for(const platform of ['soundcloud','youtube','spotify'] as const){const url=album[platform]?.trim();if(url&&isHttps(url))links.push({platform,url});}
 const legacy=album.link?.trim();if(legacy&&isHttps(legacy)&&!links.some(item=>item.url===legacy)){
  const host=new URL(legacy).hostname;let platform:AlbumPlatform='other';
  if(host==='soundcloud.com'||host.endsWith('.soundcloud.com'))platform='soundcloud';
  else if(host==='youtube.com'||host.endsWith('.youtube.com')||host==='youtu.be')platform='youtube';
  else if(host==='spotify.com'||host.endsWith('.spotify.com')||host==='spotify.link')platform='spotify';
  if(platform==='other'||!links.some(item=>item.platform===platform))links.push({platform,url:legacy});
 }
 return links;
}
function isHttps(value:string){try{return new URL(value).protocol==='https:';}catch{return false;}}
