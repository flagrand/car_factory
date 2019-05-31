const searchParams = new URLSearchParams(location.search);

let carID;
if (searchParams.has("id")) {
  carID = searchParams.get("id");
}

let colorArray = [];

const vue = new Vue({
  el: "#main-content",
  data: {
    colorArray: colorArray
  },
  methods: {}
});

new Promise((resolve) => {
  fetch("http://car-factory.serveo.net/car/" + carID + "/colors", {
    method: "GET"
  }).then(response => {
    if (response.status === 404) {
      window.location = "/notFound.html";
      throw new Error("Not found");
    }
    return response.json().then(colors => {
      // console.log(colors);
      // console.log([...colors]);
      colorArray.push(...colors);
      resolve();
    });
  });
}).then(() => {
  fetch("http://car-factory.serveo.net/car/" + carID, {
    method: "GET"
  }).then(response => {
    return response.json().then(carData => {
      console.log(carData);
      document.getElementById("model").value = carData.model;
      document.querySelector(
        "[name=fuel][value=" + carData["fuel_type"] + "]"
      ).checked = true;
  
      let colorIndex, colorEntry;
      for (colorIndex in colorArray) {
        colorEntry = colorArray[colorIndex];
  
        if (colorEntry.colorName === carData.color.colorName) {
          document.getElementById("color").value = colorIndex;
          break;
        }
      }
    });
  });
}).catch((error) => {
  if (error.message !== "Not found") {
    throw error;
  }
});


function send() {
  if (document.getElementById("model").value == "") {
    document.getElementById("validateModel").innerText =
      "Please, fill out the form field!";
  } else {
    let model = document.getElementById("model").value;
    let colorIndex = document.getElementById("color").value;
    let fuel_type = document.querySelector("[name=fuel]:checked").value;
    let color = colorArray[colorIndex];
    console.log(colorIndex);

    var div = document.getElementById("div");
    var j = {
      color: { ...color },
      model: model,
      fuel_type: fuel_type
    };
    console.log(j);
    wyslij(j);
  }
}

function wyslij(car) {
  fetch("http://car-factory.serveo.net/car/" + carID, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  }).then(response => {
    response.body;
    if (response.status === 200) {
      window.location = "/index.html";
    }
  });
}
