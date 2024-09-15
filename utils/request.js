const fetch = require("node-fetch");

exports.createTruck = async (data) => {
  const url = `${process.env.SERVICE_TRUCK}/api/v1/truck/interservice/createtruck`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await rawResponse.json();
    if (response.success) {
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.createBussinessMan = async (data) => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_ECOMMERCE}/api/v1/commerce/interservice/createbusinessman`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      console.log("nicceeeee");
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.createTransport = async (data) => {
  // console.log("data>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
  const url = `${process.env.SERVICE_TRANSPORT}/api/v1/transport/interservice/createtransport`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<first>>>>>>>>>>>>>>>>>>>>>>>>");
    const response = await rawResponse.json();
    // console.log(":::::::::::::::::::::::::::;");
    if (response.success) {
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.createLineMaker = async (data) => {
  console.log("data>>>>>>>>>>>>>>>>>", data);

  const url = `${process.env.SERVICE_LINEMAKER}/api/v1/linemaker/interservice/createlinemaker`;

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await rawResponse.json();
    console.log(">>>>,response", response);
    if (response.success) {
      return response;
    } else {
      return response;
    }
  } catch (err) {
    console.log("err", err);
  }
};

exports.addGroup = async (id, body) => {
  const url = `${process.env.SERVICE_AUTHENTICATION}/api/v1/auth/addgroup/${id}`;
  console.log("hiiiiii");

  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await rawResponse.json();
    if (response.success) {
      console.log("its work");
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};


exports.addprofile = async (body,token) => {
  const url = `https://ash3authentication.chinabizsetup.com/api/v1/auth/picprofile`;
  try {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
         
      },
      body: JSON.stringify({
        pictureProfile : body
      }
        
      ),
    });
     
    const response = await rawResponse.json();
    if (response.success) {
      console.log("its work");
      return response.success;
    }
  } catch (err) {
    console.log("err", err);
  }
};