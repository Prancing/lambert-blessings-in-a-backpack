

function initialize(page){
    if(page === "index"){
        if(localStorage.getItem("logins_now") === null){
            initialize_index()
        }else{
            console.log(localStorage.getItem("logins_now"))
        }
    }else if(page === "login"){
        if(localStorage.getItem("loginform") === null){
            initialize_login()
        }else{
            console.log(localStorage.getItem("loginform"))
        }
    }
}

function initialize_index(){
    logins = {
        "hibaa":"1234",
        "sidy":"5678"
    }

    logins_now = []

    localStorage.setItem("logins", JSON.stringify(logins))
    localStorage.setItem("logins_now", JSON.stringify(logins_now))
    
}

// function initialize_login(){
//     logins_now = JSON.parse(localStorage.getItem("logins_now"))
//     fetch('https://api.ipify.org/?format=json').then((res)=>res.json()).then((res)=>{
//             const stringifiedObject = JSON.stringify(res.ip);
//             if(logins_now.includes(stringifiedObject)){
//                 document.getElementById('login-info').innerHTML = "Logged in as: " + 
// }

function intialize_announcements(){
    //makepostform = document.getElementById('make-post-form')
    announcementpoststable = document.getElementById("announcement-posts-table")
    tabledata = JSON.parse(localStorage.getItem("tabledata"))
    console.log(tabledata)
    for(post in tabledata){
        newRow = announcementpoststable.insertRow()
        newCell = newRow.insertCell()
        newCell.innerHTML = post
        newCell = newRow.insertCell()
        newCell.innerHTML = tabledata[post]
    }
}

function clear_announcements(){
    $("#announcement-posts-table tr").remove(); 
    tabledata = JSON.parse(localStorage.getItem("tabledata"))
    tabledata = {}
    console.log(tabledata)
    localStorage.setItem("tabledata", JSON.stringify(tabledata))

}

// function intialize_announcements(){

//     localStorage.setItem("announcementpoststable", announcementpoststable)
// }

function checkloads(){
    window.onload = function(){
        if(localStorage.getItem("hasCodeRunBefore") === null){
            initialize_intial()
        }else{
            initialize()
        }
    }
}

function login(){
    loginform = document.getElementById('login-form')
    username = loginform.username.value
    password = loginform.password.value
    logins_now = JSON.parse(localStorage.getItem("logins_now"))
    logins = JSON.parse(localStorage.getItem("logins"))
    
    for(user in logins){
        console.log(user)
        if(user === username && logins[user] === password){
            fetch('https://api.ipify.org/?format=json').then((res)=>res.json()).then((res)=>{
            const stringifiedObject = JSON.stringify(res.ip);
            if(!logins_now.includes(stringifiedObject)){
                logins_now.push(stringifiedObject)

                document.getElementById('logout-output').innerHTML = ""
                document.getElementById('login-output').innerHTML = "Login Successful"
                localStorage.setItem("logins_now", JSON.stringify(logins_now))
                console.log("Logins now- " + logins_now)
            }else{
                alert('You are already logged into this account.')
            }
            
            })
            break
        }else{
            document.getElementById('login-output').innerHTML = "Login Unsuccessful. Please try again."
        }
    }
}

function logout(){
    logins_now = JSON.parse(localStorage.getItem("logins_now"))
    fetch('https://api.ipify.org/?format=json').then((res)=>res.json()).then((res)=>{
            const stringifiedObject = JSON.stringify(res.ip);
            loginFound = false;
            for(i=0; i<logins_now.length; i++){
                if(logins_now[i] === stringifiedObject){
                    loginFound = true;
                    logins_now.splice(i, 1)
                    console.log(logins_now)
                    document.getElementById('logout-output').innerHTML = "Logged out successfully"
                    document.getElementById('login-output').innerHTML = ""
                }
            }
            if(!loginFound){
                alert("Please login first.")
            }
            localStorage.setItem("logins_now", JSON.stringify(logins_now))
        })
}


function checklogins(){
 
    logins_now = JSON.parse(localStorage.getItem("logins_now"))
    fetch('https://api.ipify.org/?format=json').then((res)=>res.json()).then((res)=>{
            const stringifiedObject = JSON.stringify(res.ip);
            if(logins_now.includes(stringifiedObject)){
                window.location.href="announcements-admin.html"
            }else{
                window.location.href="announcements-others.html" 
            }
    })
    
}

function submitpost(){
    announcementpoststable = document.getElementById('announcement-posts-table')
    makepostform = document.getElementById('make-post-form')
    postmaker_name = makepostform.name.value
    content = makepostform.content.value
    date = new Date().toLocaleString()
    newRow = announcementpoststable.insertRow()
    newCell = newRow.insertCell()
    newCell.innerHTML = `${postmaker_name}<br>${date}`
    newCell = newRow.insertCell()
    newCell.innerHTML = content 
    tabledata = {}
    

    $("#announcement-posts-table").find('tbody tr').each(function(index,item){
        var nameanddate=$(item).find('td').eq(0).text();
        var content=$(item).find('td').eq(1).text();
        tabledata[nameanddate] = content
    });
    console.log(tabledata)
    localStorage.setItem("tabledata", JSON.stringify(tabledata))
}
