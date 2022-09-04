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
        <a onclick="allnews('${catagory.category_id}')" class="nav-link active text-dark fw-bolder" aria-current="page" href="#">${catagory.category_name}</a>
    </li>
        
        `
        catdiv.appendChild(nwcatdiv);
        troggol(true);

    });
}

const allnews = allnews => {
    const url = `https://openapi.programming-hero.com/api/news/category/${allnews}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayallnews(data.data))
        .catch(error => console.log(error))



}

const displayallnews = newsall => {
    console.log(newsall)
    const allnewsdiv = document.getElementById('all-news')
    allnewsdiv.innerHTML = ``;
    //no data found
    const notdatadiv = document.getElementById('nodata')
    if (newsall.length === 0) {
        notdatadiv.classList.remove('d-none')
    }
    else {
        notdatadiv.classList.add('d-none')
    }
    troggol(false)


    newsall.forEach(news => {
        const nwdiv = document.createElement('div');
        nwdiv.classList.add('card');

        nwdiv.innerHTML = `

        <div class="row g-0" onclick="getdetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <div class="col-md-4">
          <img src="${news.thumbnail_url}" width="75%" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 ">
          <div class="card-body">
            <h5 class="card-title fw-bold">${news.title}</h5>
            <p class="card-text">${news.details.slice(0, 400)}</p>
        <div class="d-flex justify-content-around">
        <div class="d-flex mt-5" >
        <div> <img src="${news.image_url}" width="60px" height="60px" class="rounded-circle m-3"></div>
        <div class="mt-2"> <p class="fw-bold fs-3"> Name:${news.author.name}</p>
        <p>Published:${news.author.published_date}</p>
        </div>     
</div>
<div class="d-flex mt-5 pt-3 ">
<div> <i class="fa-solid fa-eye fs-3 mt-2 "></i></div> 
<div> <p class="fw-bold ms-2 mb-2 fs-3">${news.total_view}</p>
</div> 
</div>

<div class="d-flex mt-5 pt-3">
<div><p class="fw-bold fs-3">Rating:${news.rating.number}</p> </div>
<div> <i class="fa-solid fa-star fs-3 text-warning mt-1"></i> </div>



</div>
        
        
        </div>


          </div>
        </div>
      
      </div>



    `
        allnewsdiv.appendChild(nwdiv);

        troggol(false)

    });


}








const getdetails = async _id => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        modaldetails(data.data[0])

    }
    catch (error) {
        console.log(error)
    }


}

const modaldetails = news => {
    const gettitle = document.getElementById('staticBackdropLabel')
    gettitle.innerText = news.title;
    const infomodal = document.getElementById('modalinfo')
    infomodal.innerHTML = `
    
    <h5>AUTHOR:${news.author.name}</h5>
    <h5>PUBLISHED:${news.author.published_date}</h5>


    
    
    `

}





const troggol = isLoading => {
    const divspin = document.getElementById('spiner')
    if (isLoading) {
        divspin.classList.remove('d-none')
    }
    else {
        divspin.classList.add('d-none')
    }
}

const getans = answer => {
    const getdiv = document.getElementById('q&n')
    const getnwdiv = document.createElement('div')
    getnwdiv.innerHTML = `
    
  <div>
  <h1 class="text-center fw-bold">QUESTION AND ANSWER<h1>
  <hr>
  <hr>
  </div>

  <div>
    <div class="border border-5 rounded mb-5">
    <h4 class="fw-bold fs-2 text-danger">Question NO:1</h4>
    <p class="fw-semibold fs-3 text-dark">Question:Difference Between VAR,LET & CONST<p>
    <p class="text-dark fw-semibold bg-warning bg-gradient">Answer:JavaScript has three variable declaration statements: var, let and const. The latter two were added in ES6, whereas var existed since previous versions. One of the first things to notice is that const defines constants (i.e. values that will not be reassigned), whereas var and let define variables. Yet, var behaves differently from both let and const in various other ways.<p>
    </div>
    <div class="border border-5 rounded mb-5">
    <h4 class="fw-bold fs-2 text-danger">Question NO:2</h4>
    <p class="fw-semibold fs-3 text-dark">Question:<p>
    <p class="text-dark fw-semibold bg-warning bg-gradient">Answer:<p>
    </div>
    <div class="border border-5 rounded mb-5">
    <h4 class="fw-bold fs-2 text-danger">Question NO:3</h4>
    <p class="fw-semibold fs-3 text-dark">Question:<p>
    <p class="text-dark fw-semibold bg-warning bg-gradient">Answer:<p>
    </div>
    <div class="border border-5 rounded mb-5">
    <h4 class="fw-bold fs-2 text-danger">Question NO:4</h4>
    <p class="fw-semibold fs-3 text-dark">Question:<p>
    <p class="text-dark fw-semibold bg-warning bg-gradient">Answer:<p>
    </div>

  
  
  </div>

    
    
    
    `
    getdiv.appendChild(getnwdiv)
    troggol(false)
}




allcatagories();



