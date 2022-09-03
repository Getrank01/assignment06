const allcatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displaycatagories(data.data.news_category))
        .catch(error => console.log(error));
}


const displaycatagories = catagories => {
    const catdiv = document.getElementById('catagories')
    catagories.forEach(catagory => {
        console.log(catagory);
        const nwcatdiv = document.createElement('li')
        nwcatdiv.innerHTML = `
        <li class="nav-item">
        <a onclick="allnews()" class="nav-link active text-dark fw-bolder" aria-current="page" href="#">${catagory.category_name}</a>
    </li>
        
        `
        catdiv.appendChild(nwcatdiv);

    });
}

const allnews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayallnews(data.data)

    }
    catch (error) {
        console.log(error);
    }

}

const displayallnews = newsall => {
    console.log(newsall)
    const allnewsdiv = document.getElementById('all-news')

    newsall.forEach(news => {


        const nwdiv = document.createElement('div');
        // nwdiv.classList.add('card  mb-4');
        nwdiv.innerHTML = `

            <div class="card mb-4">    
                <div class="col-md-4">
                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>



    `
        allnewsdiv.appendChild(nwdiv);


    });


}



allcatagories();
;


