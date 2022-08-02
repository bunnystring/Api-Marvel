/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
// rutas absolutas > https://platzi-avo.vercel.app/
// rutas relativas > "/images/maluma.jpg",
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters?apikey=f3bb1f45063db55f58250d50461dbb4f";
const appNode = document.querySelector('#mount');

//Delegacion de eventos
appNode.addEventListener("click", (event) => {
  if (event.target.nodeName === 'H2') {
    window.alert("hola");
  }
})
const formatComics  = (available) => {

 const newComics =  new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'COP',
  }).format(available)

  return newComics;
};

//Api Int&
// 1 - formato a fechas 
// 2 - formato a monedas


//consumir api con promesas
//web api
//conectarnos al server
window
.fetch(`${baseUrl}`) //El me devuelve una respuesta 
    //procesar la respuesta, y convertirla en JSON
    .then(respuesta => respuesta.json())

    //Ya tengo la respuesta en JSon ahora quiero ver la data que me trajo
    // JSON -> Data -> Renderizar info Browser
    .then(responseJson => {
        //data y result es el nombre de la variable que recibi por url
        
        //guardamos los items en un arreglo
        const todosLosItems = [];
       responseJson.data.results.forEach(item => {
        const formato = item.thumbnail.extension;
        const urlImage = item.thumbnail.path;
        //console.log(formato, urlImage);
        //Crear nombre
        const name = document.createElement('h2');
        name.textContent = item.name;
        name.className = "text-center text-3xl font-bold text-gray-800 dark:text-white";
        
        //crear imagen
        const imagen = document.createElement('img');
        imagen.src = `${urlImage}.${formato}`;
        imagen.className = "mx-auto object-cover rounded-full h-40 w-40 origin-center hover:origin-top";
        
        // Descripcion 
        const describe = document.createElement('p');
        describe.textContent = item.description;
        describe.className = "text-center text-1xl  text-gray-600 dark:text-white";
        //Comics
        const comics = document.createElement('h6');
        comics.className = "pt-8 flex border-t text-green-600 font-bold w-44 mx-auto  items-center justify-center"
        comics.textContent = formatComics(item.comics.available); // formatComics(
        
        

        //contenedor
        const container = document.createElement('div');
        container.className = "-8 bg-white dark:bg-gray-800 rounded-lg shadow";
        container.append(imagen,name,describe,comics);
        appNode.className = "mt-10 grid grid-cols-2 gap-8"

        //Body
        const appBody = document.querySelector('body');
        appBody.className = "bg-gray-900";
        todosLosItems.push(container);
       });
      
       //Agregando al body los elementos
    appNode.append(...todosLosItems);
    });
