<div align="center">
<img width="70%" alt="code" src="https://github.com/Belluominus/blog_with_microservices/blob/main/readMeFiles/code.jfif" />
</div>

<h1 align="center">
  Calculadora de CBD
</h1>
<h3 align="center">
  Desafio: <a href="https://alamino.notion.site/Teste-para-desenvolvedor-back-end-fd5b6e07475e4af3bc99342c15bb3edc">criar uma aplicação para calcular o CDB</a> 
</h3>

## :rocket: Sobre
Objetivo e criar uma claculadora para calcular o CDB dado uma data inicial e uma final e a taxa do CDB com base em CDI previamente cadastrados.<br><br>

Ela salva os dados no banco não relacional mongoDB, para rodar essa aplicação é necessario usar o docker e o kubernetes para facilitar o e bom usar o skafold tambem para o ambiente de testes, as configurações do kubernetes estão na pasta infra/k8s e a do skaffold esta na raiz do projeto.<br><br>

Antes de iniciar o projeto é importante dentro dos arquivos em infra/k8s e dentro de skaffold.yaml mudar o usurario dodocker onde se encontra belluominus/* colocar o usuario que esta conectado no seu docker

<img width="80%" alt="application" src="https://github.com/Belluominus/blog_with_microservices/blob/main/readMeFiles/aplication.gif" /><br><br>

Adcionar dentro dos hosts do SO o link cdbcalculator.dev apontado para o localhost (127.0.0.1)

<img width="80%" alt="application" src="https://github.com/Belluominus/blog_with_microservices/blob/main/readMeFiles/aplication.gif" /><br><br>

Para rodar o projeto basta execultar o comando: skaffold dev. uma vez executado ele rodara as configurações do kubernetes que estão dentro de infra.

<img width="80%" alt="application" src="https://github.com/Belluominus/blog_with_microservices/blob/main/readMeFiles/aplication.gif" /><br><br>

Tambem é posivel execultar testes basta no promp inserir yarn test ou npm test, dependendo do que tiver usando, dentro da pasta cdbcalculator

<img width="80%" alt="application" src="https://github.com/Belluominus/blog_with_microservices/blob/main/readMeFiles/aplication.gif" /><br><br>

Por fim na raiz do projeto tem o arquivo CDBCalculator_Insominia ele contem a configuração dos end points para o indominia.
<br>
