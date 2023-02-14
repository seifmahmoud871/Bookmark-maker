var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var siteArr;

(function () {

    if (localStorage.getItem('local storage') == null) {
        siteArr = [];
    }
    else {
        siteArr = JSON.parse(localStorage.getItem('local storage'));
        display();
    }

})();

// addProduct function

function addProduct() {
    if (nameregax() && urlregax() && foundname(siteName.value) && foundurl(siteUrl.value)) {
        var object = {
            sName: siteName.value,
            sUrl: siteUrl.value,
        }
        siteArr.push(object);
        localStorage.setItem('local storage', JSON.stringify(siteArr));
        display();
        clear();

    }
}

// -----------------------------------

// clear function

function clear() {
    siteName.value = "";
    siteUrl.value = "";
}

// ----------------------------------------

// Display function 

function display() {

    var box = ``;

    for (var i = 0; i < siteArr.length; i++) {

        box += `
            <tr class="bg-light py-5">
            <td class="">${i + 1}</td>
            <td>${siteArr[i].sName}</td>
            <td><button class="btn btn-info"onclick="vis(${i})">Visit</button></td>
            <td><button class="btn btn-danger" onclick="del(${i})">Delete</button></td>
            </tr>
    `;

    }
    document.getElementById("tableRow").innerHTML = box;

}

// ----------------------------------------

// Visit function

function vis(index) {
    window.open(siteArr[index].sUrl,"_blank");
}

// ----------------------------------------

// Delete function

function del(index) {
    // console.log(index);
    siteArr.splice(index, 1);
    localStorage.setItem('local storage', JSON.stringify(siteArr));
    display();
}
// ----------------------------------------

// function check if name already exist or not

function foundname(name) {
    for (var i = 0; i < siteArr.length; i++) {
        if (name == siteArr[i].sName) {
            siteName.nextElementSibling.style.display = 'block';
            siteName.nextElementSibling.innerHTML = "this Name already exist";
            return false;
        }

    }
    siteName.nextElementSibling.style.display = 'none';
    siteName.nextElementSibling.innerHTML = "";
    return true;
}
// ----------------------------------------

// function check if url already exist or not

function foundurl(url) {
    for (var i = 0; i < siteArr.length; i++) {
        if (url == siteArr[i].sUrl) {
            siteUrl.nextElementSibling.style.display = 'block';
            siteUrl.nextElementSibling.innerHTML = "this URL already exist";
            return false;
        }

    }
    siteUrl.nextElementSibling.style.display = 'none';
    siteUrl.nextElementSibling.innerHTML = "";
    return true;
}
// ----------------------------------------

// regex of Name
function nameregax() {
    if (siteName.value == "") {
        siteName.nextElementSibling.style.display = 'block';
        siteName.nextElementSibling.innerHTML = "Name is required";
        return false;
    }

    else {
        siteName.nextElementSibling.style.display = 'none';
        siteName.nextElementSibling.innerHTML = "";
        return true;
    }
}
// ----------------------------------------


// regex of URL
function urlregax() {
    var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (siteUrl.value == "") {
        siteUrl.nextElementSibling.style.display = 'block';
        siteUrl.nextElementSibling.innerHTML = "URL is required";
        return false;
    }
    else if (regex.test(siteUrl.value) == false) {
        siteUrl.nextElementSibling.style.display = 'block';
        siteUrl.nextElementSibling.innerHTML = "write URL correct then try again";
        return false;
    }

    else {
        siteUrl.nextElementSibling.style.display = 'none';
        siteUrl.nextElementSibling.innerHTML = "";
        return true;
    }
}

// ----------------------------------------