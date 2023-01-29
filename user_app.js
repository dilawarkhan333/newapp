var product = document.getElementById("product")

firebase.database().ref("clothes").once("value", function (snap) {
    console.log(snap.toJSON())
    var val = Object.values(snap.toJSON())//object to array
    console.log(val)

    for (var i of val) {
        console.log(i)
        product.innerHTML += `
        <div class="col col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
        <div class="card" >
  <img src=${i.img_Url} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${i.clothes_design}</h5>
    <p class="card-text">${i.Price}.</p>
    <a href="#" class="btn btn-primary" onclick="Set_Order(this)" id=${i.Product_Key}>Order</a>
  </div>
</div>
</div>
        `

    }

})

function Set_Order(e) {
    console.log(e.id)
    var uid = localStorage.getItem("Uid")

    var key = firebase.database().ref("Orders").push().getKey()//

   //get
    firebase.database().ref("clothes").child(e.id).once("value",function(snap){

        console.log(snap.toJSON())
        var db = snap.toJSON()
        //admin
        firebase.database().ref("Orders").child(key).set({
            clothes_design:db["clothes_design"],
            Price:db["Price"],
            Product_Key:db["Product_Key"],
            img_Url:db["img_Url"],
            UserUid:uid


        }),
        firebase.database().ref("user").child(uid).child("MyOrders").child(key).set({
            clothes_design:db["clothes_design"],
            Price:db["Price"],
            Product_Key:db["Product_Key"],
            img_Url:db["img_Url"],
            


        })
    })


}
