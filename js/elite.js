function createPageHeader(bigText, smallText) {
    var outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "jumbotron text-center");
    var h1 = document.createElement("h1");
    h1.innerHTML = bigText;
    var h5 = document.createElement("h5");
    h5.innerHTML = smallText;
    outerDiv.appendChild(h1);
    outerDiv.appendChild(h5);
    return outerDiv;
}

function createFooter(subDir) {
    var footer = document.createElement("footer");
    footer.setAttribute("class","text-center width");

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class","card");

    var subDiv = document.createElement("div");
    subDiv.setAttribute("class","card-body");

    var h4 = document.createElement("h4");
    h4.setAttribute("class","card-title");
    h4.innerHTML = "Business Contact";

    var h5 = document.createElement("h5");
    h5.innerHTML = "business@watherum.com";

    var p = document.createElement("p");
    p.setAttribute("class","card-text");
    p.innerHTML = "Copyright &#169; 2019 Watherum Elite, All Rights Reserved";

    footer.appendChild(cardDiv);
    cardDiv.appendChild(subDiv);

    subDiv.appendChild(h4);
    subDiv.appendChild(h5);
    subDiv.appendChild(p);

    return footer;
}

function createEvent(title, date, location, description , link, linkName) {
    var eventDiv = document.createElement("div");
    eventDiv.setAttribute("class","container text-center");

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class","card");

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");

    var h4 = document.createElement("h4");
    h4.setAttribute("class","card-title");
    h4.innerHTML = title;

    var dateH5 = document.createElement("h5");
    dateH5.innerHTML = "Date: " + date;

    var locH5 = document.createElement("h5");
    locH5.innerHTML = "Location: " + location;

    var p = document.createElement("p");
    p.setAttribute("class","card-text");
    p.innerHTML = description;

    var a = document.createElement("a");
    a.setAttribute("class","event-link card-link");
    a.setAttribute("href",link);
    a.innerHTML = linkName;

    eventDiv.appendChild(cardDiv);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(h4);
    cardBody.appendChild(dateH5);
    cardBody.appendChild(locH5);
    cardBody.appendChild(p);
    cardBody.appendChild(a);

    return eventDiv;

}

function createNavBar(subDir) {
    //Create Nav element
    var nav = document.createElement("nav");
    nav.setAttribute("class","navbar navbar-expand-sm bg-dark navbar-dark fixed-top");

    //create nav brand
    var logoA = document.createElement("a");
    logoA.setAttribute("class","navbar-brand");
    logoA.setAttribute("href","index.html");
    if (subDir) {
        logoA.setAttribute("href","../index.html");
    }

    var logoImg = document.createElement("img");
    logoImg.setAttribute("src","images/logos/WA.jpg");
    if (subDir) {
        logoImg.setAttribute("src","../images/logos/pfa_v1.jpg");
    }
    logoImg.setAttribute("alt","logo");
    logoImg.setAttribute("id","PathFindersAirsoftLogo");
    logoImg.setAttribute("height","120px");
    logoImg.setAttribute("width","120px");

    //create button here
    var button = document.createElement("button");
    button.setAttribute("class","navbar-toggler");
    button.setAttribute("type","button");
    button.setAttribute("data-toggle","collapse");
    button.setAttribute("data-target","#collapsibleNavbar");

    var span = document.createElement("span");
    span.setAttribute("class","navbar-toggler-icon");

    //create collapsible div here. UL appends to this
    var collapsingDiv = document.createElement("div");
    collapsingDiv.setAttribute("class","collapse navbar-collapse");
    collapsingDiv.setAttribute("id","collapsibleNavbar");

    //create Unordered list of elements
    var ul = document.createElement("ul");
    ul.setAttribute("class","navbar-nav");



    var homeListItem = document.createElement("li");
    homeListItem.setAttribute("class","nav-item");

    var homeA = document.createElement("a");
    homeA.setAttribute("class","nav-link");
    homeA.setAttribute("href","index.html");
    if (subDir) {
        homeA.setAttribute("href","../index.html");
    }
    homeA.innerHTML = "Home";



    var eventListItem = document.createElement("li");
    eventListItem.setAttribute("class","nav-item");

    var eventA = document.createElement("a");
    eventA.setAttribute("class","nav-link");
    eventA.setAttribute("href","events.html");
    if (subDir) {
        eventA.setAttribute("href","../events.html");
    }
    eventA.innerHTML = "Events";



    var mediaListItem = document.createElement("li");
    mediaListItem.setAttribute("class","nav-item");

    var media =  document.createElement("a");
    media.setAttribute("class","nav-link");
    media.setAttribute("href","media.html");
    if (subDir) {
        media.setAttribute("href","../media.html");
    }
    media.innerHTML = "Social Media";


    var supportListItem = document.createElement("li");
    supportListItem.setAttribute("class","nav-item");

    var support =  document.createElement("a");
    support.setAttribute("class","nav-link");
    support.setAttribute("href","support.html");
    if (subDir) {
        support.setAttribute("href","../support.html");
    }
    support.innerHTML = "Support";


    //Put navbar together
    nav.appendChild(logoA);
    logoA.appendChild(logoImg);

    nav.appendChild(button);
    button.appendChild(span);

    nav.appendChild(collapsingDiv);
    collapsingDiv.appendChild(ul);

    ul.appendChild(homeListItem);
    homeListItem.appendChild(homeA);

    ul.appendChild(eventListItem);
    eventListItem.appendChild(eventA);

    ul.appendChild(mediaListItem);
    mediaListItem.appendChild(media);

    ul.appendChild(supportListItem);
    supportListItem.appendChild(support);

    return nav;
}


function createResourceCard(imglink,imgAlt , title ,resLink, resLinkName) {
    var outerDiv = document.createElement("div");
    outerDiv.setAttribute("class","container text-center");

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("class","card");

    var img = document.createElement("img");
    img.setAttribute("class","card-img-style");
    img.setAttribute("src",imglink);
    img.setAttribute("alt",imgAlt);

    var cardBody = document.createElement("card-body");
    cardBody.setAttribute("class","card-body");

    var h4 = document.createElement("h4");
    h4.setAttribute("class","card-title");
    h4.innerHTML = title;

    var a = document.createElement("a");
    a.setAttribute("href",resLink);
    a.setAttribute("class","card-link");
    a.innerHTML = resLinkName;

    outerDiv.appendChild(cardDiv);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(h4);
    cardBody.appendChild(a);

    return outerDiv;
}


function createCarouselListItem(active,num) {
    var li = document.createElement("li");
    li.setAttribute("data-target","#slideshow");
    li.setAttribute("data-slide-to",num);
    if (active) {
        li.setAttribute("class", "active");
    }
    return li;
}

function createCarouselDataDiv(active, imglink, imgAlt) {
    var dataDiv = document.createElement("div");

    dataDiv.setAttribute("class","carousel-item");
    if (active) {
        dataDiv.setAttribute("class","carousel-item active");
    }
    var img = document.createElement("img");
    img.setAttribute("src",imglink);
    img.setAttribute("alt",imgAlt);
    img.setAttribute("width","1100");
    img.setAttribute("height","500");

    dataDiv.appendChild(img);

    return dataDiv;
}

function createBioRow(id) {
    var containerDiv = document.createElement("div");
    containerDiv.setAttribute("class","container");

    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class","row text-center");
    rowDiv.setAttribute("id",id);

    containerDiv.appendChild(rowDiv);

    return containerDiv;
}

function createBioCard(name, imgLink, role, description, isIframe) {
    var outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "col-sm-4 d-flex")

    if (name !== "" && imgLink !== "" && role !== "" && description !== "") {
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class","card text-center");

        if (isIframe) {
            var iframe = createIframeString(imgLink);
        }
        else {
            var image = document.createElement("img");
            image.setAttribute("class","card-img-top");
            image.setAttribute("src",imgLink);
            image.setAttribute("alt", name);
        }

        var cardBody = document.createElement("div");
        cardBody.setAttribute("class","card-body");

        var h4 = document.createElement("h4");
        h4.setAttribute("class","card-title");
        h4.innerHTML = name;

        var h5 = document.createElement("h5");
        h5.innerHTML = role;

        var descP = document.createElement("p");
        descP.setAttribute("class","card-text");
        descP.innerHTML = description;


        outerDiv.appendChild(cardDiv);
        if (isIframe) {
            cardDiv.innerHTML = (iframe);
        }
        else {
            cardDiv.appendChild(image);
        }
        cardDiv.appendChild(cardBody);
        cardBody.appendChild(h4);
        cardBody.appendChild(h5);
        cardBody.appendChild(descP);
    }

    return outerDiv;
}

function createIframeString(url) {
    return '<iframe class="embed-item-responsive card-img-style bio-height" src="'+url+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
}