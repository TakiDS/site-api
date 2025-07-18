document.addEventListener("DOMContentLoaded", function(){
    //tentando pegar os intens da api
    const api = fetch("https://fakestoreapi.com/products").then(res => res.json()).then(res=> {
        const data = res
        const imglink = data[9].image
        console.log(data)
        let item = document.querySelector(".cart-view");
        for(i=0;i<10;i++){
            item.insertAdjacentHTML('beforeend', `<div class="item_carrinho">
                    <img src="${data[i].image}" alt="teste_img">
                    <button id="idBtn-${i}> <span><img src="assents/adicionar-ao-carrinho.png" alt="cart-img"></span>Add cart</button>
                    <small>${data[i].category}</small>
                    <p>${data[i].title}</p>
                    <span>
                        <p>$ ${data[i].price}</p>
                    </span>
                </div>` );
        }
        
    });

    let clicou = document.getElementById('idBtn-3')
    
    
    
})