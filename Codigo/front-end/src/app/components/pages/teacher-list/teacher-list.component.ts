import { Component } from '@angular/core';
import { Teacher } from '../../../interfaces/Teacher';
// import {TeacherService} from "../../../services/teacher/teacher.service";

@Component({
    selector: 'app-teacher-list',
    templateUrl: './teacher-list.component.html',
    styleUrls: ['./teacher-list.component.css'],
})

export class TeacherListComponent {

    originalTeachers: Teacher[] = [       {
        id: 0,
        fullName: 'safddsfa',
        cpf: '24324',
        rg: '234',
        email: 'fdgdsfgs',
        phoneNumber: '324324',
        addressNumber: '324',
        addressComplement: '43',
        streetAddress: 'fdsgfgfg',
        neighborhood: 'sdfgnfbd',
        zipCode: '4354',
        cityOfResidence: 'dsgbfrdgf',
        homeState: 'dbsffsg',
        registrationDate: '04/10/2022',
        birthDate: '13/09/1968',

        salary: '',
        hireDate: '',
        terminationDate: ''
    }];
    teachers: Teacher[] = [...this.originalTeachers]

    // Table variables
    tableHeaders = ['Nome', 'Email', 'Telefone', 'Gerenciar'];
    buttons = [
        { iconClass: 'fa fa-edit', title: 'Editar', route: '/teacher-edit', function: null },
        { iconClass: 'fa fa-upload', title: 'Imprimir', route: null, function: null },
        // {iconClass: 'fa fa-trash', title: 'Excluir', route: null, function: this.deleteTeacher.bind(this)}
    ];
    filters = [
        { name: 'ordem alfabética', function: this.sortTeachersByName.bind(this) },
        { name: 'id', function: this.sortTeachersById.bind(this) }
    ];
    filterText!: string;

    // constructor(private teacherService: TeacherService) {
    // }

    ngOnInit(): void {
        // this.getTeachers();
        this.filterText = this.filters[0].name;
    }

    // deleteTeacher(id: number): void {
    //     this.teacherService.deleteTeacher(id).subscribe(()=> {
    //         this.getTeachers();
    //     });
    // }

    filterTeacherList(event: Event): void {

        const searchInput: HTMLInputElement = event.target as HTMLInputElement;
        const inputValue: string = searchInput.value.toLowerCase();
    
        this.teachers = this.originalTeachers.filter((teacher: Teacher) => {
    
          const teacherFullNameMatch: boolean = teacher.fullName.toLowerCase().includes(inputValue);    
          return teacherFullNameMatch;
        });
      }

      sortTeachersByName(): void {
        this.teachers = this.originalTeachers.sort(function (a: Teacher, b: Teacher): number {
          let nameA: string = a.fullName.toLowerCase();
          let nameB: string = b.fullName.toLowerCase();
          if (nameA < nameB)
            return -1;
          if (nameA > nameB)
            return 1;
          return 0;
        });
        this.updateBtnText(this.sortTeachersByName.name);
      }
    
      sortTeachersById(): void {
        this.teachers = this.originalTeachers.sort(function (a: Teacher, b: Teacher): number {
          let idA: number = a.id;
          let idB: number = b.id;
          if (idA < idB)
            return -1;
          if (idA > idB)
            return 1;
          return 0;
        });
        this.updateBtnText(this.sortTeachersById.name);
      }
    
      updateBtnText(funcName: string) {
        const filter = this.filters.find(filter => filter.function.name.includes(funcName));
        this.filterText = filter ? filter.name : '';
      }
    
    }
    