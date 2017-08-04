import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export let fakeBackendProvider = {
    //usando fake backend no lugar do Http serviço
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // array contendo os users registrados 
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // configurando fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            
            setTimeout(() => {

                // autenticação
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters do  request
                    let params = JSON.parse(connection.request.getBody());

                    // encontra se tem algum usuario igual
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // se o login for valido return 200 OK com os detalhes do user e o fake jwt token
                        let user = filteredUsers[0];
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 200,
                            body: {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
                            }
                        })));
                    } else {
                        // se nao return 400 bad request
                        connection.mockError(new Error('Usuário ou senha incorreta!'));
                    }
                }

                // get users
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // Verifica o fake auth token no cabeçaerio and retura users se valido.
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                    //  Verifica o fake auth token no cabeçaerio and retura users se valido.
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // encontra user by id no array users 
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // responde 200 OK para o user
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                    } else {
                        // returna 401 not authorised caso token for null ou invalido
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

                // criar user
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user objeto from post body
                    let newUser = JSON.parse(connection.request.getBody());

                    // validação
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Usuário "' + newUser.username + '" já existe'));
                    }

                    // salva novo user
                    newUser.id = users.length + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // responde 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                }

                // deletar user
                if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    //  Verifica o fake auth token no cabeçaerio and retura users se valido
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // encontra user by id no array users
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // deletando user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // responde 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    } else {
                        // returna 401 not authorised caso token for null ou invalido
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};