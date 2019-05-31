const searchParams = new URLSearchParams(location.search);

if (searchParams.has("brand")) {
  document.querySelector("[name=brand]").value = searchParams.get("brand");
}

let colorArray = [];

const vue = new Vue({
  el: "#main-content",
  data: {
    colorArray: colorArray
  },
  methods: {}
});
fetchColors();

function send() {
  if (document.getElementById("model").value == "") {
    document.getElementById("validateModel").innerText =
      "Please, fill out the form field!";
  } else {
    let model = document.getElementById("model").value;
    let brand = document.querySelector("[name=brand]").value;
    let colorIndex = document.getElementById("color").value;
    let fuel_type = document.querySelector("[name=fuel]:checked").value;
    let color = colorArray[colorIndex];
    console.log(colorIndex);

    var div = document.getElementById("div");
    var j = {
      brand: brand,
      color: { ...color },
      model: model,
      fuel_type: fuel_type
    };
    console.log(j);
    wyslij(j);
  }
}

function wyslij(car) {
  fetch("http://car-factory.serveo.net/car", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  }).then(response => {
    response.body;
    if (response.status === 200) {
      window.location = "/index.html";
    }
  });
}

function fetchColors() {
  fetch("http://car-factory.serveo.net/colors", {
    method: "GET"
  }).then(response => {
    return response.json().then(colors => {
      console.log(colors);
      console.log([...colors]);
      colorArray.push(...colors);
    });
  });
}
