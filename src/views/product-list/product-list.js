const productSection = document.querySelector('.section');

let productInnerData = "";

const productDataDiv = `
<div class="card product-item">
<a href="#">
    <div class="card-image">
        <figure class="image is-square">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        </figure>
    </div>
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="title is-4">Nike</p>
                <p class="subtitle is-6">Jordan 1 Retro High OG Black Mocha</p>
                <p class="title is-5">12000원</p>
            </div>
        </div>
    </div>
</a>
</div>
`;

for(let i = 0 ; i < 20 ; i++){
    productInnerData += productDataDiv;
}

productSection.innerHTML = productInnerData;