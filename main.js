import './style.css'

let productsCar = []

const arr = [{
    name:'Trilogia Duna',
    offer:'à vista (5% de desconto)',
    price:146.00,
    img:'/duna-book.webp',
    code:0
},
{   name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:1
},
{   name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:2
},
{   name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:3
},
{   name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:4
},
{   name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:5
},
{   
    name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:6
},
{   name:'IPhone',
    offer:'à vista (30% de desconto)',
    price:1.00,
    img:'/cel-san.webp',
    code:7
}]

function attObjMemoryCar(code){
    productsCar.map( e => {
        if (e.code === code){
            e.quant--

            if(e.quant===0){
            document.querySelector('[data-js="car"]').querySelector(`[data-prod="${code}"]`).remove()
            }else{
                console.log(document.querySelector('[data-js="car"]').querySelector(`[data-prod="${code}"]`).querySelector(`[data-js="buy_desc"]`).querySelector(`[data-js="desc_quant"]`).textContent--)
            }
        }
    })
    let newProductsCar = productsCar.filter( e => e.quant > 0)
    productsCar = newProductsCar
    attTotalPrice()
    console.log(productsCar)
}
        
function getAnyByAny(code,field,arrGeneric){
    for(let i = 0; i < arrGeneric.length; i++){
        if(parseInt(arrGeneric[i].code) === parseInt(code)){
            return arrGeneric[i][field]
        }
    }
    return 0
}

function calcTotalPrice(){
    let sum = 0
    for(let i = 0; i < productsCar.length; i++){
        sum += productsCar[i].price*productsCar[i].quant
    }
    return sum
}

function attTotalPrice(){
    const totalPrice = document.getElementById("total_price")
    totalPrice.innerHTML = `<div class="bar_price"> Preço do Carrinho: ${calcTotalPrice()}</div>` 
}

function addObjMemoryCar(code){
    if(productsCar.length==0){
        productsCar.push({
            code:code,
            quant:1,
            price: getAnyByAny(code,'price',arr)
        })
    }else{
        let check
        for(let i = 0;i<productsCar.length;i++){
            if(productsCar[i].code === code){
                productsCar[i].quant++
                check = true
            }
        }

        if(check!=true){
        productsCar.push({
            code:code,
            quant:1,
            price: getAnyByAny(code,'price',arr)
        })}
    }
}

function checkProducts(obj){
    const products = document.getElementsByClassName('buy')
    if (products.length===0){return false}
    for(let i = 0 ; i < Array.from(products).length ; i++ ){
        if(Array.from(products)[i].dataset.prod === obj.prod){
            Array.from(products)[i].querySelector('[data-js="buy_desc"]').querySelector('[data-js="desc_quant"]').textContent = getAnyByAny(obj.prod,'quant',productsCar) + 1
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
        img.className='buy_img'
        img.src = obj.img
        buy.appendChild(img)
        buy.className = 'buy'


        buy_desc.appendChild(name)
        buy_desc.appendChild(div_quant)
        buy.appendChild(buy_desc)
        car.insertAdjacentElement('beforeend',buy)
        img.addEventListener('click', e => {
            attObjMemoryCar(e.target.parentNode.dataset.prod)
        })
        
    }

}

function buyEvent(){
    const elements = document.getElementsByClassName('prod')
    Array.from(elements).forEach( e => {
        const obj = {
            img: e.children[0].firstChild.src,
            prod: e.dataset.prod,
            name: e.children[1].firstChild.textContent  
        }
        const code = e.dataset.prod
        e.addEventListener('click', element => {
            addBuy(obj)
            addObjMemoryCar(code)
            attTotalPrice()
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
        price.textContent = `R$: ${element.price}`
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

