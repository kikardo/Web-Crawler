//const readline = require('readline')
const rs = require('readline-sync')

const request = require('request-promise')
const cheerio = require('cheerio')
const req = require('request')
// [ código não usado abaixo, apenas tentativas]
// const resp = ''
// const input = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// ${answers['name']} tem que ser dinamico e entrar no lugar do URL o que foi digitado no input

// Colocar imput e adicionar URL - tentativas nativas e com readline não deram certo
let URL = rs.question(`Qual site gostaria de pegar os dados? (digitar site com http://www) \n`)
console.log(URL);

(async () => {
    const response = await request(URL);
    let $ = cheerio.load(response);
    const sitetitle = $('title').text().trim();
    const links = $('a');
    // busca todos os links
    for (let i = 0; i < links.length; i++) {
        const element = links[i];
        let listalinks = links[i].attribs.href;
        console.log(listalinks);
    }
    //  [ Outras tentativas não usadas no código] 
    // buscar todos os links da pagina que contenham o hostname
    //   var parser = document.createElement('a');
    //   parser.href = URL; // colocar o link digitado pelo usuário
    //   parser.hostname; // => "example.com" retornar a parte parte do host - e usar na outra funçao

    // var matches = URL.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    // var hostname = matches && matches[1];

    // tmp.hostname will now contain 'www.example.com'
    // tmp.host will now contain hostname and port 'www.example.com:80'


    // Função para retirar o dominio e depois o sub dominio
    function parse_url(URL) {
        var match = URL.match(/^(http|https|ftp)?(?:[\:\/]*)([a-z0-9\.-]*)(?:\:([0-9]+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/i);
        var ret = new Object();

        ret['protocol'] = '';
        ret['host'] = match[2];
        ret['port'] = '';
        ret['path'] = '';
        ret['query'] = '';
        ret['fragment'] = '';

        if (match[1]) {
            ret['protocol'] = match[1];
        }

        if (match[3]) {
            ret['port'] = match[3];
        }

        if (match[4]) {
            ret['path'] = match[4];
        }

        if (match[5]) {
            ret['query'] = match[5];
        }

        if (match[6]) {
            ret['fragment'] = match[6];
        }

        return ret;
    }

    var url_parts = parse_url(URL);
    var host = url_parts['host'];
    var subdomain = host.substr(4);

    // Pesquisar links com o mesmo subdominio
    let interno2final = (`[href*="${subdomain}"]`);
    const links2 = $(interno2final)

    for (let i = 0; i < links2.length; i++) {
        const element = links2[i];
        let listalinks2 = links2[i].attribs.href;
        console.log(listalinks2);
    }
    // Pesquisar links que possuem http.
    let interno3final = (`[href*="http"]`);
    const links3 = $(interno3final);
    for (let i = 0; i < links3.length; i++) {
        const element = links3[i];
        let listalinks3 = links3[i].attribs.href;
        console.log(listalinks3);
    }
   // cálculos links
    let linksexterno = links3.length - links2.length;
    let linksinternosgeral = links.length - linksexterno; 

    console.log(`\n\n\nA página pesquisada foi ${URL}!`);
    console.log(`O título da página é: ${sitetitle}!\n`);
    console.log(`O número de links direcionáveis da página é ${links.length}`)
    console.log(`O número de links internos da página é ${linksinternosgeral}`)
    console.log(`O número de links internos com ${subdomain} da página é ${links2.length}`)
    console.log(`O número de links externos da página é ${linksexterno}`)
})()
