import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Servicios
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { CarrerasService } from './services/carreras/carreras.service';
import { PersonaService } from './services/persona/persona.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  personaForm: UntypedFormGroup;
  paises: any[] = [];
  estados: any[] = [];
  personas: any[] = [];
  carreras: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'name', 'last-name', 'cui', 'age', 'carrera', 'country-name', 'state-name', 'options'];
  panelOpenState = false;

  constructor(
    public fb: UntypedFormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService,
    public carrerasService: CarrerasService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // 1. Siempre inicializamos la estructura del formulario
    this.initForm();

    // 2. Solo cargamos datos del backend si el usuario ya está logueado
    if (this.isLoggedIn()) {
      this.cargarDatosDelServidor();
    }
  }

  ngAfterViewInit(): void {
    // Vinculamos la paginación al dataSource
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Inicializa el formulario y sus validaciones
   */
  initForm(): void {
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

    // Escuchar cambios en el selector de país para cargar estados
    this.personaForm.get('pais').valueChanges.subscribe(value => {
      if (value && value.id) {
        this.estadosService.getAllEstadosByPais(value.id).subscribe(
          resp => { this.estados = resp; },
          error => { console.error('Error al cargar estados:', error); }
        );
      }
    });
  }

  /**
   * Realiza las peticiones HTTP solo cuando hay autenticación
   */
  cargarDatosDelServidor(): void {
    this.paisesService.getAllPaises().subscribe(
      resp => { this.paises = resp; },
      error => { console.error('Error cargando países:', error); }
    );

    this.carrerasService.getAllCarreras().subscribe(
      resp => { this.carreras = resp; },
      error => { console.error('Error cargando carreras:', error); }
    );

    this.personaService.getAllPersonas().subscribe(
      resp => {
        this.personas = resp;
        this.setDataAndPagination();
      },
      error => { console.error('Error cargando personas:', error); }
    );
  }

  /**
   * Verifica si existe un token en el localStorage
   */
  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  /**
   * Cierra sesión y refresca para ocultar la tabla
   */
  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  compararObjetos(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(
      resp => {
        this.personaForm.reset();
        this.personaForm.setErrors(null);
        // Filtramos para evitar duplicados si es edición
        this.personas = this.personas.filter(persona => resp.id !== persona.id);
        this.personas.push(resp);
        this.setDataAndPagination();
      },
      error => { console.error('Error al guardar:', error); }
    );
  }

  eliminar(persona: any): void {
    this.personaService.deletePersona(persona.id).subscribe(resp => {
      if (resp) {
        this.personas = this.personas.filter(p => p.id !== persona.id);
        this.setDataAndPagination();
      }
    });
  }
  onLoginExitoso(): void {
    this.cargarDatosDelServidor();
  }

  editar(persona: any): void {
    this.personaForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado,
      carreras: persona.carreras,
      estadoP: persona.estadoP,
      cui: persona.cui
    });
    this.panelOpenState = true;
  }

  setDataAndPagination(): void {
    this.dataSource.data = this.personas;
  }
}
