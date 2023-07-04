import './style.css'

const arr = [{
    'name':'Trilogia Duna',
    'offer':'à vista (5% de desconto)',
    'price':'R$:146,00',
    'img':'/duna-book.webp',
    'code':0
},
{   'name':'IPhone',
    'offer':'à vista (30% de desconto)',
    'price':'R$:1,00',
    'img':'/cel-san.webp',
    'code':1
},
{   'name':'Ventilador',
    'offer':'à vista (30% de desconto)',
    'price':'R$:1,00',
    'img':'/vetilador.jpg',
    'code':2
},
{
    'name':'Caneta Azul',
    'offer':'à vista (30% de desconto)',
    'price':'R$:5,00',
    'img':'/azul-caneta.webp',
    'code':3
},
{
    'name':'Computador',
    'offer':'à vista (30% de desconto)',
    'price':'R$:500,00',
    'img':'/comp.jpg',
    'code':4
},
{
    'name':'Zelter',
    'offer':'à vista (30% de desconto)',
    'price':'R$:220,00',
    'img':'/zelter.jpg',
    'code':5
},
{
    'name':'Mouse',
    'offer':'à vista (10% de desconto)',
    'price':'R$:120,00',
    'img':'/mouse.jpg',
    'code':6
    
}
]

function checkProducts(obj){
    const products = document.getElementsByClassName('buy')
    if (products.length===0){return false}
    for(let i = 0 ; i < Array.from(products).length ; i++ ){
        if(Array.from(products)[i].dataset.prod === obj.prod){
            Array.from(products)[i].querySelector('[data-js="buy_desc"]').querySelector('[data-js="desc_quant"]').textContent = 
            parseInt (Array.from(products)[i].querySelector('[data-js="buy_desc"]').querySelector('[data-js="desc_quant"]').textContent) + 1
            return true
        }
    }
    return false
}

function addBuy(obj){
    if(!checkProducts(obj)){
        const car = document.querySelector('[data-js="car"]')
        const buy = document.createElement('div')
        buy.setAttribute('data-prod',obj.prod)
        const buy_desc = document.createElement('div')
        buy_desc.className = 'buy_desc'
        buy_desc.setAttribute('data-js','buy_desc')
        const name = document.createElement('p')
        name.className = 'desc_name'
        name.setAttribute('data-js','desc_name')
        const quant = document.createElement('p')
        quant.className = 'desc_quant'
        quant.setAttribute('data-js','desc_quant')
        quant.textContent = 1
        const div_quant = document.createElement('div')
        
        const text_quant = document.createElement('p')
        div_quant.className = 'div_quant'
        text_quant.textContent = 'Qtd: '
        div_quant.appendChild(text_quant)
        div_quant.appendChild(quant)
        name.textContent = obj.name
        const img = document.createElement('img')
        img.src = obj.img
        buy.appendChild(img)
        buy.className = 'buy'


        buy_desc.appendChild(name)
        buy_desc.appendChild(div_quant)
        buy.appendChild(buy_desc)
        car.insertAdjacentElement('afterbegin',buy)
    }

}

function buyEvent(){
    const elements = document.getElementsByClassName('name')
    Array.from(elements).forEach( e => {
        const obj = {
            img:e.parentNode.parentNode.firstChild.firstChild.src,
            name:e.textContent,
            prod:e.parentNode.parentNode.dataset.prod
        }
        e.addEventListener('click', (e)=>{
            addBuy(obj)
        }) 
    })
}

function addProduct(arr){
    arr.forEach(element => {
        const panel = document.querySelector('[data-js="panel"]')

        const prod = document.createElement('div')
        prod.setAttribute('data-prod',element.code)
        prod.className = 'prod'
        const img_container = document.createElement('div')
        img_container.className = 'img_container'
        const img = document.createElement('img')
        img.src = element.img
        img.className = 'img-prod'
        const desc = document.createElement('div')
        desc.className = 'desc'
        const name = document.createElement('p')
        name.className = 'name'
        name.textContent = element.name
        const offer = document.createElement('p')
        offer.className = 'offer'
        offer.textContent = element.offer
        const price = document.createElement('p')
        price.className = 'price'
        price.textContent = element.price
        desc.appendChild(name)
        desc.appendChild(offer)
        desc.appendChild(price)

        img_container.appendChild(img)
        prod.appendChild(img_container)
        prod.appendChild(desc)
        panel.appendChild(prod)
    });    


}


addProduct(arr)
buyEvent()
