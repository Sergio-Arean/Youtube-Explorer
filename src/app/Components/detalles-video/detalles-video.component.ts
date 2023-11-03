import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-video',
  templateUrl: './detalles-video.component.html',
  styleUrls: ['./detalles-video.component.css']
})
export class DetallesVideoComponent {

  idVideo:string='';
  urlVideo:any='';
  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer){

  }

  ngOnInit(){
    this.route.params.subscribe(params => this.idVideo = params['idVideo']);
    //con esto especifico que hago con el parametro

    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.idVideo}`);


  }

}
