const cambiar = ()=>{
    let pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
}



const menu = document.getElementById('down')
const menu_buton = document.getElementById('menu')

const open_menu = (menu)=>{
    if(menu.style.height !== '206px')
        menu.style.height = '206px'
    else if(menu.style.height === '206px')
        menu.style.height = '0px'
}

menu_buton.addEventListener('click', ()=> open_menu(menu))