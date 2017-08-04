import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    
    public coments: string[] = [];
    
    public txtComent: string;
    
    // adiciona a linha no array comentario
    adicionar(){
        if(this.txtComent != ''){
            this.coments.push(this.txtComent);
            this.txtComent = '';
        }
    }
    
    //remove linha do comentario (obs: nao tem opcao para editar e nao esta redirecionando um novo array ao detetar, sendo assim, ocorrendo um erro de Bad Resquest 400)
    remover(index:number){
        this.coments.splice(index, 1);
        
         
      
    }
}