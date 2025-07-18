document.addEventListener("DOMContentLoaded", function(){
    //tentando pegar os intens da api
    const api = fetch("https://fakestoreapi.com/products").then(res => res.json()).then(res=> {
        const data = res
        const imglink = data[9].image
        console.log(data)
        let item = document.querySelector(".cart-view");
        item.insertAdjacentHTML('beforeend', `<div class="item_carrinho">
                    <img src="${imglink}" alt="teste_img">
                    <button> <span><img class='imagem' src="assents/adicionar-ao-carrinho.png" alt="cart-img"></span>Add cart</button>
                    <small>${data[9].category}</small>
                    <p>${data[9].title}</p>
                    <span>
                        <p>$ ${data[9].price}</p>
                    </span>
                </div>` );
    });
    
    
})