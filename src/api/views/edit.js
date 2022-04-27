import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, edit } from '../api/data.js';

const editTemplate = (post, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit = ${onSubmit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value="" .value=${post.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value="" .value=${post.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value="" .value=${post.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value="" .value=${post.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value="" .value=${post.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`;

export async function editPage(ctx){
    const postId = ctx.params.id;
    const post = await getById(postId);

    ctx.render(editTemplate(post, onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const address = formData.get('address').trim();
        const phone = formData.get('phone').trim();

        try{
            if(!title || !description || !imageUrl || !address || !phone){
                throw new Error('All fields are required')
            }
            await edit(postId, {title, description, imageUrl, address, phone});
            ctx.page.redirect('/details/' + postId)
        }catch(err){
            alert(err.message);
        }


    }

}