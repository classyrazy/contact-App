//////////////refering to other divs /////////////
var allConDivs = document.querySelectorAll(".container")
console.log(allConDivs);
var addContactBtnEl = document.querySelector("#add-contact-btn")
var editBackButtonEl = document.querySelector(".edit-contact-page .back-btn")
var contactProfileBackButtonEl = document.querySelector(".contact-profile-page .back-btn")
var contactEditButtonEl = document.querySelector(".edit-button")
var allEditInputs = document.querySelectorAll(".contact-info input")
var deleteContactBtnEl = document.querySelector("#delete-contact-btn")
var saveContactBtnEl = document.querySelector("#save-contact-btn")
var allContactArr = [];
var contactListOnHome = document.querySelector(".contacts-list")
if (localStorage.length !== 0) {
    var savedArray = JSON.parse(localStorage.getItem("contact-list-arr"))
    if (savedArray.length !== 0) {
        allContactArr = savedArray
    } else {
        allContactArr = [];
    }
    document.onload = getAndFillInHtmlHome()
}


console.log(allConDivs)
console.log(allEditInputs)
addContactBtnEl.addEventListener("click", () => {
    moveToPage(1)
})
contactEditButtonEl.addEventListener("click", () => {
    moveToPage(1)
})
editBackButtonEl.addEventListener("click", () => {
    moveToPage(0)
    location.href = "/"
})
contactProfileBackButtonEl.addEventListener("click", () => {
    moveToPage(0)
    location.href = "/"
})

function hideAllContents() {
    allConDivs.forEach(content => content.classList.remove("show"))
}

function moveToPage(idxOfPage) {
    hideAllContents()
    allConDivs[idxOfPage].classList.add("show")
}

///////////////////////start getting things from input/////////////////////////////
function getContactInfo() {
    var contact = {
        contactName: allEditInputs[0].value.trim() || "no Fuckin name",
        realtionshipName: allEditInputs[1].value.trim() || "friends",
        phoneNo: allEditInputs[2].value.trim(),
        email: allEditInputs[3].value.trim() || "No Email",
        address: allEditInputs[4].value.trim() || "No Address",
    }
    getFirstLetterName(contact.contactName)
    function getFirstLetterName(value) {
        var valueArr = value.split("");
        var initial = (valueArr[0]).toUpperCase();
        if (initial.length === 0) {
            return
        }
        contact.contactNameInitial = initial
    }
    if (contact.phoneNo === "" || contact.phoneNo == null || isNaN(contact.phoneNo) == true) {
        allEditInputs[2].focus();
        return
    }
    console.log(contact)
    allContactArr.unshift(contact)
    console.log(allContactArr)
    allEditInputs.forEach(eachEditInput => {
        eachEditInput.value = ""
    })
    localStorage.setItem("contact-list-arr", JSON.stringify(allContactArr))
    gotoContactProfileAndDisplay(contact)
}
function gotoContactProfileAndDisplay(contactPassed){
    moveToPage(2)
    var contactProfile = document.querySelector("#contact-profile")
    var htmlOfContactPage = `<header class="hero">
    <a href= "/">
        <i  class="fas fa-chevron-circle-left back-btn" onclick = moveToPage(0)></i>
    </a>
    <div class="hero-info">
        <h1 class="name">${contactPassed.contactName}</h1>
        <p  class="relationship">${contactPassed.realtionshipName}</p>
    </div>
</header>

<section class="contact-info">

    <div class="info-line">
        <i class="fas fa-phone icon-gradient"></i>
        <a href="tel:${"+234" + contactPassed.phoneNo.substring(1)}"><p class="phone-number">${contactPassed.phoneNo}</p></a>
    </div>



    <div class="info-line">
        <i class="fab fa-whatsapp text icon-gradient"></i>
        <a href="https://api.whatsapp.com/send?phone=${"234" + contactPassed.phoneNo.substring(1)}&text=Hello,%20how%20are%20you?" target="_blank" title="Chat on whatsapp"><p class="sms">Send Message On WhatApp</p></a>
    </div>

    

    <div class="info-line">
        <i class="fas fa-envelope icon-gradient"></i>
        <p class="email">${contactPassed.email}</p>
    </div>

    

    <div class="info-line">
        <i id="location" class="fas fa-map-marker-alt icon-gradient"></i>
        <p class="address">${contactPassed.address}</p>
    </div>
</section>`

    contactProfile.innerHTML = htmlOfContactPage;
    // allContactArr = JSON.parse(localStorage.getItem("contact-list-arr"))
    getAndFillInHtmlHome()
}
///////////// save and Push the new contact created///////////

saveContactBtnEl.addEventListener("click", getContactInfo)

function getAndFillInHtmlHome() {
    var html = "";
    for (let eachContact of savedArray) {
        html += `
                <div class="contact-section">
                    <li class="list__item name-con">
                        <p class="contact-name">${eachContact.contactName}</p>
                        <p class="relationship">${eachContact.realtionshipName}</p>
                    </li>
                    <li class="list__item">
                		<a href="tel:${"234" + eachContact.phoneNo}" title="call ${eachContact.contactName}"><i class="fas fa-phone"></i></a>
                        <a href="https://api.whatsapp.com/send?phone=${"234" + eachContact.phoneNo.substring(1)}&text=Hello,%20how%20are%20you?" target="_blank" title="Chat on whatsapp"><i class="fab fa-whatsapp text"></i></a>
                	</li>
                </div>
                <hr>`
    }
    contactListOnHome.innerHTML = html
    console.log(contactListOnHome)
    if(savedArray.length === 0){
        document.querySelector(".contacts-list").innerHTML = `<h2 class="no-contacts">No contact yet<h2/>`;
    }
}
var allElementOnHomePage = document.querySelectorAll(".contact-section")
fromHomeToProfile(allElementOnHomePage)
function fromHomeToProfile(elementsToClick) {
    elementsToClick.forEach(elementToClick => {
        elementToClick.addEventListener("click", (e) => {
            console.log(e.target)
            console.log(e.target.querySelector("li p.contact-name").innerHTML)
            var index = allContactArr.findIndex(x => x.contactName === e.target.querySelector("li p.contact-name").innerHTML);
            console.log(index)
            console.log(index)
            console.log(allContactArr[index])
            var clickedIndex = allContactArr[index];
            moveToPage(2)
            var contactProfile = document.querySelector("#contact-profile")
            var clickedhtmlOfContactPage = `
            <header class="hero">
                <a href="index.html">
                    <i  class="fas fa-chevron-circle-left back-btn"></i>
                </a>
                <div class="hero-info">
                    <h1 class="name-initial">${clickedIndex.contactNameInitial}</h1>
                    <h1 class="name">${clickedIndex.contactName}</h1>
                    <p  class="relationship">${clickedIndex.realtionshipName}</p>
                </div>
            </header>

            <section class="contact-info">

                <div class="info-line">
                    <i class="fas fa-phone icon-gradient"></i>
                    <a href="tel:${"+234" + clickedIndex.phoneNo.substring(1)}"><p class="phone-number">${clickedIndex.phoneNo}</p></a>
                </div>

            

                <div class="info-line">
                    <i class="fab fa-whatsapp text icon-gradient"></i>
                    <a href="https://api.whatsapp.com/send?phone=${"234" + clickedIndex.phoneNo.substring(1)}&text=Hello,%20how%20are%20you?" target="_blank" title="Chat on whatsapp"><p class="sms">Send Message On WhatApp</p></a>
                </div>

                

                <div class="info-line">
                    <i class="fas fa-envelope icon-gradient"></i>
                    <p class="email">${clickedIndex.email}</p>
                </div>

                

                <div class="info-line">
                    <i id="location" class="fas fa-map-marker-alt icon-gradient"></i>
                    <p class="address">${clickedIndex.address}</p>
                </div>
            </section>

            <p>
                <section class="edit-contact">
                    <div class="edit-button">
                        <i class="fas fa-cog icon-gradient" id="edit-after-save-btn"></i>
                    </div>
                </section>
            </p>`
            contactProfile.innerHTML = clickedhtmlOfContactPage;
            document.querySelector("#edit-after-save-btn").addEventListener("click", editAfterSave)
            function editAfterSave() {
                moveToPage(1)
                var editProfile = document.querySelector("#edit-profile")
                editProfile.innerHTML = editAfterSavePageCon(clickedIndex, index);
                var submitBtnAfterSave = document.querySelector("#save-contact-after-save-btn")
                console.log(submitBtnAfterSave)
                console.log(clickedIndex)
                // submitBtnAfterSave.addEventListener("click", submitAfterSave(clickedIndex))
            }
        })
    })
}
function editAfterSavePageCon(index, realIndexNum) {
    var contentOfPage = `
        <header class="hero">
                
            <a href="/">
                <i class="fas fa-chevron-circle-left back-btn"></i>
            </a>

            <div class="hero-info">
                <h1 class="name" id="name-initial"><i class="fas fa-user"></i></h1>
                <p class="relationship-hero">Friend</p>
            </div>
        </header>
        <section class="contact-info">

            <div class="info-line">
                <i class="fas fa-phone icon-gradient"></i>
                <input type="text" class="type edit" name="fullname" placeholder="Full Name" id="full-name-input" value=${JSON.stringify(index.contactName)}>
            </div>

            <div class="info-line">
                <i class="fas fa-user-circle icon-gradient"></i>
                <input type="text" class="type edit" name="relationship" placeholder="Relationship" id="relationship-input" value=${JSON.stringify(index.realtionshipName)}>
            </div>



            <div class="info-line">
                <i class="fas fa-sms icon-gradient"></i>
                <input type="text" class="type edit" name="phone-number" placeholder="Phone Number" id="phone-number-input" required value=${index.phoneNo}>
            </div>

            

            <div  class="info-line">
                <i class="fas fa-envelope icon-gradient"></i>
                <input type="text" class="type edit" name="e-mail" placeholder="Email" id="email-input" value=${JSON.stringify(index.email)}>
            </div>

            

            <div class="info-line">
                <i class="fas fa-map-marker-alt icon-gradient location"></i>
                <input type="text" class="type edit" name="address" placeholder="Address" id="address-input" value=${JSON.stringify(index.address)}>
            </div>
        </section>

        <section class="button-container">
            <div class="update-contact">
                <i  class="fas fa-check-circle icon-gradient"></i>
                <button class="button" id="save-contact-after-save-btn" type="button" onclick="submitAfterSave(${realIndexNum})">Save Contact</button>
            </div>
        </section>

        <section class="button-container">
            <a href="#">
                <div class="update-contact">
                    <i class="fas fa-trash icon-gradient"></i>
                    <button class="button" id="delete-contact-btn-after-save" onclick="deleteContact(${realIndexNum})">Delete Contact</button>
                </div>
            </a>
        </section>`

    return contentOfPage
}
function submitAfterSave(i) {
    var allEditInputsAfter = document.querySelectorAll(".type.edit")
    console.log(allEditInputsAfter)
    var newContactEditted = {
        contactName: allEditInputsAfter[0].value.trim() || "no Fuckin name",
        realtionshipName: allEditInputsAfter[1].value.trim() || "friends",
        phoneNo: allEditInputsAfter[2].value.trim(),
        email: allEditInputsAfter[3].value.trim() || "No Email",
        address: allEditInputsAfter[4].value.trim() || "No Address",
    }

    getFirstLetterNameOfEdittedName(newContactEditted.contactName)
        function getFirstLetterNameOfEdittedName(valueOfEdittedName) {
            var valueArr = valueOfEdittedName.split("");
    var initial = (valueArr[0]).toUpperCase();
    if (initial.length === 0) {
        return
    }
    newContactEditted.contactNameInitial = initial
}
gotoContactProfileAndDisplay(newContactEditted)
savedArray[i] = newContactEditted
setArrayInLocalstorage()
}
function setArrayInLocalstorage(){
    localStorage.setItem("contact-list-arr", JSON.stringify(savedArray))
}
function deleteContact(i){
    console.log(i)
    savedArray.splice(i,1)
    console.log(savedArray)
    setArrayInLocalstorage()
    location.href = "/"
    getAndFillInHtmlHome()
}
function searchThroughContactList(){
    if(savedArray.length === 0){
        document.querySelector(".contacts-list").innerHTML = `<h2 class="no-contacts">No contact yet<h2/>`;
    }
    var elementTolookFor = document.querySelector("#contact-search-input").value
    elementTolookFor = elementTolookFor.toLowerCase()
    console.log(elementTolookFor)
    checkThroughArray()
    function checkThroughArray(){
        var temporarySavedArray = savedArray.filter(el => el.contactName.toLowerCase().includes(elementTolookFor))
        console.log(temporarySavedArray)
        getAndFillInHtmlHomeWithValues(temporarySavedArray)
        console.log(document.querySelectorAll(".contact-section"))
        allElementOnHomePage = document.querySelectorAll(".contact-section")
        fromHomeToProfile(allElementOnHomePage)
    }
}
function getAndFillInHtmlHomeWithValues(arr) {
    var html = "";
    for (let eachContact of arr) {
        html += `
                <div class="contact-section">
                    <li class="list__item name-con">
                        <p class="contact-name">${eachContact.contactName}</p>
                        <p class="relationship">${eachContact.realtionshipName}</p>
                    </li>
                    <li class="list__item">
                		<a href="tel:${"234" + eachContact.phoneNo}" title="call ${eachContact.contactName}"><i class="fas fa-phone"></i></a>
                        <a href="https://api.whatsapp.com/send?phone=${"234" + eachContact.phoneNo.substring(1)}&text=Hello,%20how%20are%20you?" target="_blank" title="Chat on whatsapp"><i class="fab fa-whatsapp text"></i></a>
                	</li>
                </div>
                <hr>`
    }
    contactListOnHome.innerHTML = html
    console.log(contactListOnHome)
    if(arr.length === 0){
        document.querySelector(".contacts-list").innerHTML = `<h2 class="no-contacts">No contact yet<h2/>`;
    }
}