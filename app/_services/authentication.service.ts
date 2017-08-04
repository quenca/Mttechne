import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login com sucesso se tiver jwt token como resposta
                let user = response.json();
                if (user && user.token) {
                    // guarda os dados do login e jwt token em armazenamento lcoal para manter o user logado quando se da refreshes na pagina
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove o user do local de armazenamento para log user out
        localStorage.removeItem('currentUser');
    }
}