# Mttechne
Angular2 
<br> GUIA PARA EXECUTAR O PROJETO
<br>Você precisa de um servidor para rodar o AngularJS. 
<br>Uma opção muito simples é o NodeJS, através do seu módulo http-server. 
<br>Instalação: 
<br>Para instalar globalmente digite: npm install -g http-server. 
<br>Execução: 
<br>Entre no diretório do projeto e rode com http-server -o. 
<br>O parâmetro -o abre o navegador na página principal do projeto.
<br>
<br> INFORMAÇÕES SOBRE O PROJETO
<br> Para dar Login, é necessario criar um novo usuário, sendo guardado as informações num serviço de backend
<br> As informaçoes do Login é validado para que nao tenha informacoes repetidas e os campos sao obrigatorios
<br> Ao logar, o cliente é redirecionado a uma pagina contendo no cabecario as informacoes do login com opcao para deletar o usuario
<br> Ao deslogar (Log out) o cliente é redirecionado a pagina inicial para nao ter acesso ao campo comentario
<br> O sistema permite comentar na foto do produto da OnePageEnterprises e excluir o comentario
<br> O sistema NAO permite editar o comentario, sendo necessario excluir e enviar novo comentario
<br>
<br> BUG NO SISTEMA
<br> O sistema tem um erro ao excluir comentario, acredito que seja por que o metodo que contem o array de comentarios, nao atualiza o  novo array com o comentario excluido, e quando é feito o refresh automaticamente apos executar este metodo, o sistema tenta encontrar esse comentario excluido e assim surge o erro Bad Resquest e 400. O metodo se chama remover() e esta na home.component.ts
<br> Foi feito comentarios nas linhas dos codigos para se ter um melhor entendimento do que esta acontecendo
<br>
<br> OBSERVACOES 
<br> Pretendo arrumar o bug essa semana, assim, posso me familiarizar mais com o Angular2 que é um framework ótimo para se trabalhar, complicado no começo para entender mas vale a pena, pois o numero de linhas de codigos com o Angular2 diminui MUITO e achei incrivel a forma de atualização automatica da pagina ao editar os codigos
<br>
<br> INFORMACOES EXTRAS
<br> O IDE para desenvolvimento do projeto foi no IntelliJ, mas ultilizei muito a comunidade Plunker!
