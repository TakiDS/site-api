document.addEventListener("DOMContentLoaded", () => {
    const carEnd = document.getElementById("carEnd");
    let totalCompra = 0;

    // 1) Busca os 10 produtos e monta o catálogo
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            const catalogo = document.querySelector(".cart-view");
            data.slice(0, 10).forEach((produto, i) => {
                catalogo.insertAdjacentHTML("beforeend", `
              <div class="item_carrinho" id="idCar-${i}">
                <img src="${produto.image}" alt="${produto.title}">
                <button id="idBtn-${i}"><img src='/assents/car.png'> Add cart</button>
                <small>${produto.category}</small>
                <p>${produto.title}</p>
                <p id="preco">$ ${produto.price.toFixed(2)}</p>
              </div>
            `);
            });
        });

    function atualizarTituloCarrinho() {
        const titulo = document.querySelector(".carrinho h3");
        const todasQuantidades = document.querySelectorAll(".qtdProd");

        let totalItens = 0;
        todasQuantidades.forEach(span => {
            totalItens += parseInt(span.textContent, 10);
        });

        titulo.textContent = `Your Cart(${totalItens})`;
    }

    // 2) Adicionar ao carrinho
    document.querySelector(".cart-view").addEventListener("click", e => {
        const botao = e.target.closest("button");
        if (!botao) return;

        const idx = botao.id.split("-")[1];
        const card = document.getElementById("idCar-" + idx);
        const nome = card.querySelector("p").textContent;
        const preco = parseFloat(card.querySelector("#preco").textContent.replace("$", ""));
        const img = card.querySelector("img").src;
        const itemId = `item-${idx}`;

        let existente = document.getElementById(itemId);
        if (existente) {
            // atualiza qtd e subtotal
            const qtdSpan = existente.querySelector(".qtdProd");
            const subPreco = existente.querySelector(".precoSom");
            const novaQtd = parseInt(qtdSpan.textContent, 10) + 1;
            qtdSpan.textContent = novaQtd;
            subPreco.textContent = (novaQtd * preco).toFixed(2);
            totalCompra += preco;
        } else {
            // insere novo item (sem imagem visível, mas guardamos em data
            document.querySelector(".itens").insertAdjacentHTML("beforeend", `
            <div class="item" id="${itemId}" data-img="${img}">
              <div>
                <p class="nomeProduto">${nome}</p>
                <p>
                  <span class="qtdProd">1</span>x
                  <span>@
                    <span class="precoUni">$ ${preco.toFixed(2)}</span>
                    <span class="precoSom">${preco.toFixed(2)}</span>
                  </span>
                </p>
              </div>
              <button class="btnDel" id="btnDel-${idx}" title="Remover item">
  &times;
</button>

            </div>
          `);
            totalCompra += preco;
            atualizarTituloCarrinho();

        }

        // atualiza total e botão Confirm
        if (!document.getElementById("btnConfirm")) {
            carEnd.insertAdjacentHTML("beforeend", `
            <div class="finalCar">
              <p>Total</p>
              <h3>$${totalCompra.toFixed(2)}</h3>
            </div>
            <button id="btnConfirm">Confirm Order</button>
          `);
        } else {
            document.querySelector(".finalCar h3").textContent = `$${totalCompra.toFixed(2)}`;
            atualizarTituloCarrinho();

        }
    });
    document.querySelector(".itens").addEventListener("click", function (e) {
        const btn = e.target.closest(".btnDel");
        if (!btn) return;

        const item = btn.closest(".item");
        if (!item) return;

        // Atualiza totalCompra
        const subtotal = parseFloat(item.querySelector(".precoSom").textContent);
        totalCompra -= subtotal;

        item.remove(); // Remove o item do DOM

        // Atualiza total e título do carrinho
        atualizarTituloCarrinho();
        if (document.querySelector(".finalCar")) {
            document.querySelector(".finalCar h3").textContent = `$${totalCompra.toFixed(2)}`;
            if (totalCompra <= 0) {
                document.getElementById("carEnd").innerHTML = ""; // limpa se não há mais itens
            }
        }
    });

    // 3) Delegação: abrir dialog ao clicar em Confirm Order
    carEnd.addEventListener("click", e => {
        if (e.target.id === "btnConfirm") abrirDialog();
    });

    // 4) Função que monta o resumo e exibe o <dialog>
    function abrirDialog() {
        const dialog = document.getElementById("popupDialog");
        const itens = document.querySelectorAll(".item");
        let resumoHTML = "";

        itens.forEach(item => {
            const nome = item.querySelector(".nomeProduto").textContent;
            const soma = item.querySelector(".precoSom").textContent;
            const imgUrl = item.dataset.img;
            resumoHTML += `
            <p>
              <img src="${imgUrl}" class="resumo-img-popup" alt="${nome}">
              ${nome}: $${soma}
            </p>
          `;
        });

        document.querySelector(".pedidoResumo").innerHTML = resumoHTML;
        document.getElementById("valorTotal").textContent = `Total: $${totalCompra.toFixed(2)}`;
        dialog.showModal();
    }

    //Fecha o dialog
    document.getElementById("btnFechar").addEventListener("click", () => {
        document.getElementById("popupDialog").close();

        document.querySelector(".itens").innerHTML = "";
        document.getElementById("carEnd").innerHTML = "";
        totalCompra = 0;
        atualizarTituloCarrinho();


    });
});
