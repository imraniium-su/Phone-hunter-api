const loadphone = async (search, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displaytphone(data.data, datalimit);
}
const displaytphone = (phones, datalimit) => {
    const phonescontiner = document.getElementById('phone-continer');
    phonescontiner.textContent = ``;
    // phone display
    const showall = document.getElementById('show-all');
    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showall.classList.remove('d-none');
    }
    else {
        showall.classList.add('d-none');
    }
    // display no phone found
    const nophone = document.getElementById('no-display');
    if (phones.length === 0) {
        nophone.classList.remove('d-none');
    }
    else {
        nophone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                            <button onclick="loadphonedetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show details</button>
                            
                    </div>
                </div>
        `;
        phonescontiner.appendChild(div);
    });
    //stop loader 
    togglespiner(false);
}
const processsearch = (datalimit) => {
    togglespiner(true);
    const inputfild = document.getElementById('search-field');
    const inputtex = inputfild.value;
    loadphone(inputtex, datalimit);

}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processsearch(10);
})
// search input fild  by enter/...
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processsearch(10);
    }
});
// spninner add function  
const togglespiner = isloading => {
    const loadeersection = document.getElementById('loader');
    if (isloading) {
        loadeersection.classList.remove('d-none');
    }
    else {
        loadeersection.classList.add('d-none');
    }
}

// this is not besrt soluation to show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    // start loader
    processsearch();

})
// loadphone();
// load phone details
const loadphonedetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayphonedetials(data.data))
}
const displayphonedetials = phone => {
    const modaltittle = document.getElementById('phonebtnmodal');
    modaltittle.innerText = phone.name;
    const phonedetails = document.getElementById('phone-details');
    phonedetails.innerHTML = `
    <p>Release date : ${phone.relaseDate ? phone.relaseDate : 'no Realeased date Found'}</p>
    <p> Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information found'} </p>
    <p>Release date :${phone.others ? phone.others.Bluetooth : 'No bluetooth information'
        } </p>
    
    `

}