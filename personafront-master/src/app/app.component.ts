import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { CarrerasService } from './services/carreras/carreras.service';
import { PersonaService } from './services/persona/persona.service';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  personaForm: UntypedFormGroup;
  paises: any;
  estados: any;
  personas: any;
  carreras: any;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'name', 'last-name','cui', 'age', 'carrera', 'country-name', 'state-name', 'options'];

  panelOpenState = false;


  constructor(
    public fb: UntypedFormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService,
    public carrerasService: CarrerasService,
  ) {

  }
  ngAfterViewInit(): void {
    this.setDataAndPagination();
  }

compararObjetos(o1: any, o2: any): boolean {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
}
  ngOnInit(): void {

    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      carreras: ['', Validators.required],
      estado: ['', Validators.required],
      estadoP: ['', Validators.required],
      cui: ['', Validators.required],

    });

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => { console.error(error) }
    );

    this.carrerasService.getAllCarreras().subscribe(resp => {
      this.carreras = resp;
    },
      error => { console.error(error) }
    );


    this.personaService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    );

    this.personaForm.get('pais').valueChanges.subscribe(value => {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp => {
        this.estados = resp;
      },
        error => { console.error(error) }
      );
    })
  }

  /**
   * Metodo que llama el boton de guardar. Enviamos la peticion la servicio, luego reseteamos el formulario, filtramos
   * y reseteamos la paginacion.
   */



  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {
      this.personaForm.reset();
      this.personaForm.setErrors(null);
      this.personas=this.personas.filter(persona=> resp.id!==persona.id);
      this.personas.push(resp);
      this.setDataAndPagination();
    },
      error => { console.error(error) }
    )
  }

  /**
   * Metodo que elimina una persona, luego reseteamos la paginacion.
   * @param persona parametro donde se indica la persona a eliminar.
   */
  eliminar(persona){
    this.personaService.deletePersona(persona.id).subscribe(resp=>{
      if(resp){
        this.personas.pop(persona);
        this.setDataAndPagination();
      }
    })
  }

  /**
   * Seteamos los datos en el formulario con la persona que vamos a editar.
   * @param persona parametro donde se indica la persona a eliminar.
   */
  editar(persona){
    this.personaForm.setValue({
      id:persona.id,
      nombre: persona.nombre ,
      apellido: persona.apellido ,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado,
    });
    this.panelOpenState = !this.panelOpenState;
  }

  setDataAndPagination(){
    this.dataSource = new MatTableDataSource(this.personas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
