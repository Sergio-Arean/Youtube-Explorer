import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopularVideosService {
   url:string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode='
  region:string = '';
 API_KEY:string = '&videoCategoryId=10&key=AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';
 link:string = '';

  constructor() { }

  async getPopularVideos(idPais:string){
      this.region = idPais;
      this.link = ''; //agreagado: limpieza de link
      try{
        this.link = `${this.link}${this.url}${this.region}${this.API_KEY}`;
        console.log(`Este es el link: ${this.link}`);
        let response = await fetch(this.link);
        let json = await response.json();
        console.log(json);
        return json;
      }catch(e){
        return `Error: ${e}`; //esta bien esto?
      }
      
  }
}
