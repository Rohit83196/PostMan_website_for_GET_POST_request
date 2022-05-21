let json=document.getElementById("json")
let custom_parameters=document.getElementById("custom_parameters")

let json_box=document.getElementById("json_textarea")
let params_box=document.getElementById("parameters")

let addParams=document.getElementById("addParams")
let btn=document.getElementById("btn")
let response_b=document.getElementById("response")


params_box.style.display="none";
json.addEventListener("click",()=>{
    if (json.checked===true) {
        params_box.style.display="none";
        json_box.style.display = "flex";
    }
})

custom_parameters.addEventListener("click",()=>{
    if (custom_parameters.checked===true) {
        params_box.style.display="block";
        json_box.style.display = "none";
    }
})


let num = 1;

addParams.addEventListener("click",(e)=>{
    num = num +1;
    e.preventDefault();
    let newParam = document.createElement('div');
    newParam.style.display= "flex";
    newParam.className = "newParam";
    newParam.innerHTML = `
                <label for="" class="label1">parameter${num} :</label>
                <div class="group">
                    <input class="input1 row" type="text" name="url" id="parameterKey${num}" placeholder="Enter Parameter ${num} Key">
                    <input class="input1 row" type="text" name="url" id="parameterValue${num}" placeholder="Enter Parameter ${num} value">
                    <button  class="removeParam" id="${num}" onclick="deleteParam(this.id)" >-</button>
                </div>
    `
    params_box.append(newParam);
})

function deleteParam(jj) {
    let ll = document.getElementById(jj);
    console.log(ll);
    ll.parentElement.parentElement.remove();

}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    response_b.innerText= "please wait.....fetching response";
    let url = document.getElementById("url").value;
    let request_type = document.querySelector("input[name='request_type']:checked").value;


    // for get request:
    if (request_type === "GET") {
        fetch(url,{
            method:"GET"
        })
       
        // ----
        .then(response =>
            response.json()
        ).then(json =>{
        
            response_b.innerText = JSON.stringify(json);
        })
    }


    // for post request
    if (request_type==="POST") {
        let content_type = document.querySelector("input[name='content_type']:checked").value;

        let data = {}
        if (content_type === "params") {
            let number = 1;
            let key = "";
            let value = "";
            while(number<=num){
                if (document.getElementById(`parameterKey`+`$(number)`)!==null) {
                    key =document.getElementById(`parameterKey`+`$(number)`).value;
                    value =document.getElementById(`parameterVey`+`$(number)`).value;
                    data[key] =value;

                }
                number+=1;
            }
            data= JSON.stringify(data);
            // console.log(data);

        }
        else{
            // console.log("rohit");
            data = document.getElementById("textarea").value;
        }
        fetch(url , {
            method:"POST",
            body:data,
            headers:{
                'Content-type':'application/json; charset=UTF-8',
            },

        })
        .then(response =>
            response.json()
        ).then(json =>{
            // console.log("rohit");
            response_b.innerText = JSON.stringify(json);
        })

        
    }
})

