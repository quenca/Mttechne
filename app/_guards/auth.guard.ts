import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logado returna true
            return true;
        }

        // nao logado redireciona para a pagina de login com o retorno da url 
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}