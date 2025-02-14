// select element
const main = document.getElementById('main')
const inpSearch = document.getElementById('inp-search')
const buttons = document.querySelectorAll('.btn')
const loading = document.querySelector('.spinner-box')
// select element


// onload
getData()
let allProducts = []
let searchValue = ''
// onload


// fetch data
function getData() {
    fetch("https://fakestoreapi.com/products")
        .then(res => {
            if (res.ok) return res.json()
            Promise.reject()
        })
        .then(res => {
            console.log(res)
            loading.style.display = 'none'
            renderData(res, searchValue)
            filterInp()
            addBtnFilters()
            allProducts = [...res]
        })
        .catch(loading.style.display = 'flex')
}
// fetch data


// search products based on input
function filterInp() {
    inpSearch.addEventListener('input', e => {
        searchValue = e.target.value.trim().toLowerCase()
        renderData(allProducts, searchValue)
    })
}
// search products based on input


// search products based on input
function addBtnFilters() {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.textContent.trim()
            let filteredProducts

            if (category === 'All') filteredProducts = allProducts
            else filteredProducts = allProducts.filter(product => product.category === category)

            searchValue = ''
            inpSearch.value = ''
            renderData(filteredProducts, searchValue)
        })
    })
}
// search products based on input


// render data on DOM
function renderData(data, searchValue) {
    let filterProdcuts = data.filter(val => val.title.toLowerCase().includes(searchValue))

    main.innerHTML = ''

    filterProdcuts.map(val => {
        const temp = document.createElement('div')
        temp.className = 'w-[350px] h-[380px] p-3 shadow-lg flex flex-col justify-between rounded-md'
        temp.innerHTML = `
            <img src="${val.image}" alt="" class="w-full h-[70%] object-cover mb-4 rounded-md object-top">
            <h3 class="text-gray-900 font-semibold mb-3">${val.title}</h3>
            <span class="text-white py-1 px-2 rounded-md font-semibold bg-purple-800 w-20 text-center">$ ${val.price}</span>
        `
        main.append(temp)
    })
}
// render data on DOM