$(function () {
  loadRecipies();
  $("#product").on("click", ".btn-danger", handleDelete);
  $("#product").on("click", ".btn-warning", handleUpdate);

  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var title = $("#updateTitle").val();
    var price = $("#updatePrice").val();
    var color = $("#updateColor").val();
    var department = $("#updateDepartment").val();
    var description = $("#updateDescription").val();

    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products/" + id,
      data: { title, price, color, department, description },
      method: "PUT",
      success: function (response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});

function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  $.get(
    "https://usman-recipes.herokuapp.com/api/products/" + id,
    function (response) {
      $("#updateId").val(response._id);
      $("#updateTitle").val(response.name);
      $("#updatePrice").val(response.price);
      $("#updateColor").val(response.color);
      $("#updateDepartment").val(response.department);
      $("#updateDescription").val(response.description);
      $("#updateModal").modal("show");
    }
  );
}

function addRecipe() {
  var name = $("#title").val();
  var price = $("#price").val();
  var color = $("#color").val();
  var description = $("#description").val();
  var department = $("#department").val();

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/",
    method: "POST",
    data: { name, price, color, department, description },
    success: function (response) {
      console.log(response);
      $("#name").val("");
      $("#price").val("");
      $("#description").val("");
      $("#department").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    },
  });
}
function handleDelete() {
  console.log("del");
  var btn = $(this);
  var parentDiv = btn.closest(".product");
  let id = parentDiv.attr("data-id");
  console.log(id);
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + id,
    method: "DELETE",
    success: function () {
      loadRecipies();
    },
  });
}

function loadRecipies() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    success: function (response) {
      console.log(response);
      var recipes = $("#product");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="product" data-id="${rec._id}"></h3><p><h3> Name: ${rec.name}   </h3><h2> Price: ${rec.price} </h2>   Color: ${rec.color}</h3>  </h2> </br> Department: ${rec.department}</h3> </br> Description: ${rec.description}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button> </p> </br> <p><button class="btn btn-warning btn-sm float-right">edit</button> </p></div>`
        );
        // recipes.append("<div><h3>" + rec.title + "</h3></div>");
      }
    },
  });
}

/*
$(function () {
  $("#CreateProduct").click(createProduct);
  $("#CancelCreate").click(CancelCreate);
  loadProducts();
});

function CancelCreate() {
  alert("Cancelled Successfully");
  $("#Createname").val("");
  $("#Createprice").val("");
  $("#Createcolor").val("");
  $("#Createdepartment").val("");
  $("#Createdescription").val("");
  $("#collapseCreate").collapse("toggle");
}
// function editProduct() {
//   console.log("INSIDE EDIT");
// }
function deleteProduct(e) {
  console.log("INSIDE DEL", e);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products/" + e,
    method: "DELETE",
    error: function (response) {
      if (response.log == undefined) {
        alert("INTERNET DOWN. Please Check your Internet Connection");
      } else {
        alert(response.log);
      }
    },
    success: function (response) {
      console.log(response);
      alert("Delete was Successful");
      loadProducts();
    },
  });
}
function createProduct() {
  console.log("INSIDE Create");
  const name = $("#Createname").val();
  const price = $("#Createprice").val();
  const color = $("#Createcolor").val();
  const department = $("#Createdepartment").val();
  const description = $("#Createdescription").val();

  if (name === "" || price === "" || department === "" || description === "") {
    alert("Please Do not leave any field Empty");
  } else {
    console.log(name, price, color, department, description);
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/products",
      method: "POST",
      data: { name, price, color, department, description },
      error: function (response) {
        if (response.log == undefined) {
          alert("INTERNET DOWN. Please Check your Internet Connection");
        } else {
          alert(response.log);
        }
      },
      success: function (response) {
        $("#Createname").val("");
        $("#Createprice").val("");
        $("#Createcolor").val("");
        $("#Createdepartment").val("");
        $("#Createdescription").val("");
        $("#collapseCreate").collapse("toggle");
        alert("Sending POST req. Please Check page for your product!");
        loadProducts();
      },
    });
  }
  // $("#toggle_collapse").addClass(" collapsed");
  // $("#toggle_collapse").attr("aria-expanded", "false");
  // $("#collapseCreate").removeClass("show");
}

function loadProducts() {
  $("#mainDiv").empty();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/products",
    method: "GET",
    error: function (response) {
      if (response.log == undefined) {
        alert("INTERNET DOWN. Please Check your Internet Connection");
      }
    },
    success: function (response) {
      let maind = $("#mainDiv");
      for (let i = 0; i < response.length; i++) {
        let products = document.createElement("div");
        let delbtn = document.createElement("button");
        // let Editbtn = document.createElement("button");
        let para = document.createElement("p");
        para.innerHTML = `<p>Price: $${response[i].price}</br>Department: <em>${response[i].department}</em></br>Description: ${response[i].description}</p>`;

        delbtn.className = "btn btn-info";
        delbtn.id = "delBtn";
        delbtn.innerHTML = "Delete";
        // delbtn.onclick = () => deleteProduct(response[i]._id);
        delbtn.onclick = () => deleteProduct($(products).attr("id"));
      }
    },
  });
}


*/
