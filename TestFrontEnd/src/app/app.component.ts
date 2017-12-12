import { Component } from '@angular/core';

import { HtmlParser } from '@angular/compiler';


import {PlanesService} from "./services/planes.services";
import { NgForm } from '@angular/forms';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arrPlanes = [];
  planeNow:any = {id:'-1', name: 'Vacío', active:false};
  user:any = { name:'', email:'', cellphone: '', age:undefined};
  msgErrors:any = {
    required: 'Este Campo es requerido',
    name: 'Ese caracter no es permitido',
    email: 'El correo ingresado no presenta un formato válido',
    cellphone: 'El Celular debe ser de 10 dígitos. Ej: 3125533592',
    age: 'La edad debe estar entre 18 y 100'
  }
  
  constructor(private planesService: PlanesService)
  {
    let mythis = this
    
    //Se cargan los aviones
    this.planesService.getPlanes()
    .subscribe( result =>{
      this.arrPlanes = result.json().map((plane, index) => {
        plane.active = index==0;
        
        if(plane.active)
        {
          mythis.planeNow = plane
        }

        return plane
      })

      if(!mythis.planeNow)
      {
        mythis.planeNow = {id:'-1', name: 'Error', active:false}
      }
    });
  }

  changeMenu(id)
  {
    let mythis = this
    this.arrPlanes = this.arrPlanes.map((plane)=>{
      plane.active = plane.id == id

      if(plane.active)
      {
        mythis.planeNow = plane
      }

      return plane
    })
  }

  resetUser()
  {
    this.user = { name:'', email:'', cellphone: '', age:undefined};
  }

  registerUser(myForm: NgForm) 
  {
    if(myForm.valid)
    {
      let myThis = this

      //Se guarda el usuario
      this.planesService.sendUser(myForm.value)
      .subscribe( result =>{
        let respObj = result.json()

        console.log('respObj:', respObj) 

        $('#myModal').modal('show')
        setTimeout(
          ()=>{
            $('#myModal').modal('hide')
            myThis.resetUser()
            myForm.reset()
          }, 
          5000
        )
      });
    }
    console.log('myForm:', myForm)
  }

  validateMinMax(strAge, min, max)
  {
    let age = parseInt(strAge)
    return age >= min && age <= max
  }
}
