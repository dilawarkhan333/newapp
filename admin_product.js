var product= document.getElementById("product")


firebase.database().ref("clothes").once("value",(snap)=>{
    // console.log(snap.toJSON())
    if(snap.toJSON()!=null){

    var value = Object.values(snap.toJSON())//object to array 
    // console.log(value)

    value.map((v,i)=>{
        console.log(v)
        product.innerHTML+=`
        <tr>
            <td>${i+1}</td>
            <td>${v.clothes_design}</td>
            <td>${v.Price}</td>
            <td>${v.Qty}</td>
            <td>
            <img src=${v.img_Url} style="width:200px;height:50px" alt="">
          </td>
          <td>
          <button id=${v.Product_Key} ONCLICK ="edit_pro(this)">   Edit</button>
        </td>
          <td>  <button id=${v.Product_Key} ONCLICK ="delete_pro(this)">    Delete</button></td>

        
        </tr>`
    })
    }
    
})

async function delete_pro(e){
    console.log(e.id)
   await  firebase.database().ref("clothes").child(e.id).remove()
   window.location.reload()
}

function edit_pro(e){
    console.log(e.id)
    localStorage.setItem("Current_Pid",e.id)
    window.location.href="Edit_Product.html"
}