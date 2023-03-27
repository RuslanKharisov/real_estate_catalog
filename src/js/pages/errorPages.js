export default function(){
    const markup = `
    <div class="container">
        <h1> Ошибка 404 </h1> 
    </div>
`
    // document.querySelector("#app").insertAdjacentHTML("afterbegin", markup);
    document.querySelector("#app").innerHTML = markup;
}