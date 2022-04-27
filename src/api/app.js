import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs';

import { catalogPage } from './views/catalog.js';
import { logout as apiLogout } from './api/data.js'
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myPostsPage } from './views/myPosts.js';


// MAIN  and logoutBtn
const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

//routing 
page('/', decorateContext, catalogPage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/myPosts', decorateContext, myPostsPage);


page.start();


//Middleware
function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

// Navigation for Guest and User
function setUserNav(){
    const userId = sessionStorage.getItem('userId');
    if(userId != null){
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}

// Logout 
async function logout() {
    await apiLogout();
    setUserNav();
    page.redirect('/')
}

