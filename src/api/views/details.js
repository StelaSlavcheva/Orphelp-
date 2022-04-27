import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, delETE } from '../api/data.js';

const detailsTemplate = (post, isOwner, onDelete) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${post.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>

                <!--Edit and Delete are only for creator-->
                ${isOwner ? html `    
                 <div class="btns">
                    <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                    <a @click= ${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <!--<a href="#" class="donate-btn btn">Donate</a>-->
                </div>` 
                : null
                 }
            </div>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx){
    const userId = sessionStorage.getItem('userId');
    const postId = ctx.params.id;
    const post = await getById(postId);
    const isOwner = userId === post._ownerId

    ctx.render(detailsTemplate(post, isOwner, onDelete));

    async function onDelete(){
        const confirmed = confirm('Are sure you want to delete this post?');
        if(confirmed){
            await delETE(postId);
            ctx.page.redirect('/')
        }
    }
}