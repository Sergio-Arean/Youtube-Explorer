import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopularVideosService {
  // url_1:string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode='
  url_1:string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults='
  //30&regionCode=AR
  //&videoCategoryId=10&key=AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';
  url_3:string = '&videoCategoryId=';
  cantidad:string = ''; 
  url_2:string = '&regionCode='
  region:string = '';
  video_category:string = ''; 
  
 API_KEY:string = '&key=AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';
 link:string = '';
 // el link seria asi: url_1 + cantidad + url_2 + region + url_3  + video_category + API_KEY;

  constructor() { }

  async getPopularVideos(idPais:string,cantidad:string,video_category:string){
      this.region = idPais;
      this.cantidad = cantidad;
      this.video_category = video_category;
      this.link = ''; //agreagado: limpieza de link
      try{
        //this.link = `${this.link}${this.url_1}${this.region}${this.API_KEY}`; //1ra version
        this.link = `${this.link}${this.url_1}${this.cantidad}${this.url_2}${this.region}${this.url_3}${this.video_category}${this.API_KEY}`;
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
