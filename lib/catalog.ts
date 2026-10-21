export type Song={id:string;title:string;genre:string;cover:string;youtube:string;spotify:string;link:string;published:boolean};export type Preview={id:string;title:string;cover:string;video:string;mediaType?:'audio'|'video';published:boolean};
export type Album={id:string;title:string;type:"album"|"ep";cover:string;description:string;year:string;link:string;tracks:string[];published:boolean};
export type Catalog={albums?:Album[];previews?:Preview[];songs:Song[];instagram:string;youtube:string;spotify:string};
