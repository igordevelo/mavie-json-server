module.exports = {
  posts: [
    { id: 1, title: "json-server", author: "Puma" },
    { id: 2, title: "json-server-test", author: "Puma" },
  ],
  comments: [{ id: 1, body: "some comment", postId: 1 }],
  profile: { name: "Puma" },
  products: [
    {
      type: "product",
      id: 0,
      name: "Air mini",
      price: "$399.00",
      imageUrl: "",
      description:
        "Air Mini+’s sensor rates air particle levels from “Good” to “Very bad,” offering a glance into your indoor air. Air Mini+’s distinguishing mode delivers particle protection by auto-adjusting fan speed based on the sensor. Choose between Auto Protect or five fan speeds, and track your PECO-Filter status from your app, wherever you are. ",
      cashback: "30%",
      maxQuantity: 100,
      rating: "4.8",
      reviews: 82,
      otherBrandsProducts: [
        {
          id: 1,
          name: "Air mini +",
          price: "$499",
          imageUrl: "",
        },
        {
          id: 2,
          name: "Air mini +",
          price: "$499",
          imageUrl: "",
        },
      ],
      relatedProducts: [
        {
          id: 2,
          name: "Air mini +",
          price: "$499",
          imageUrl: "",
        },
        {
          id: 1,
          name: "Air mini +",
          price: "$499",
          imageUrl: "",
        },
      ],
    },
    {
      type: "product",
      id: 1,
      name: "Air mini+",
      price: "$499.00",
      imageUrl: "",
      description:
        "Air Mini+’s sensor rates air particle levels from “Good” to “Very bad,” offering a glance into your indoor air. Air Mini+’s distinguishing mode delivers particle protection by auto-adjusting fan speed based on the sensor. Choose between Auto Protect or five fan speeds, and track your PECO-Filter status from your app, wherever you are. ",
      cashback: "20%",
      maxQuantity: 100,
      rating: "4.5",
      reviews: 49,
      otherBrandsProducts: [
        {
          id: 0,
          name: "Air mini",
          price: "$399",
          imageUrl: "",
        },
        {
          id: 2,
          name: "Air mini+",
          price: "$499",
          imageUrl: "",
        },
      ],
      relatedProducts: [
        {
          id: 0,
          name: "Air mini",
          price: "$399",
          imageUrl: "",
        },
        {
          id: 2,
          name: "Air mini+",
          price: "$499",
          imageUrl: "",
        },
      ],
    },
    {
      type: "product",
      id: 2,
      name: "Air mini+",
      price: "$499.00",
      imageUrl: "",
      description:
        "Air Mini+’s sensor rates air particle levels from “Good” to “Very bad,” offering a glance into your indoor air. Air Mini+’s distinguishing mode delivers particle protection by auto-adjusting fan speed based on the sensor. Choose between Auto Protect or five fan speeds, and track your PECO-Filter status from your app, wherever you are. ",
      cashback: "20%",
      maxQuantity: 100,
      rating: "4.5",
      reviews: 49,
      otherBrandsProducts: [
        {
          id: 0,
          name: "Air mini",
          price: "$399",
          imageUrl: "",
        },
        {
          id: 1,
          name: "Air mini+",
          price: "$499",
          imageUrl: "",
        },
      ],
      relatedProducts: [
        {
          id: 0,
          name: "Air mini",
          price: "$399",
          imageUrl: "",
        },
        {
          id: 1,
          name: "Air mini+",
          price: "$499",
          imageUrl: "",
        },
      ],
    },
  ],
  users: [
    {
      id: 0,
      userName: "Frank Ricciardi",
      profilePicture: "",
      city: "Santa Monica",
      state: "CA",
      country: "USA",
      code: "000000",
      phone: "+48000000000"
    },
    {
      id: 1,
      userName: "Ernest Johnson",
      profilePicture: "",
      city: "Washington",
      state: "DC",
      country: "USA",
      code: "111111",
      phone: "+48111111111"
    },
    {
      id: 2,
      userName: "Dave J. Allen",
      profilePicture: "",
      city: "Pittston",
      state: "PA",
      country: "USA",
      code: "222222",phone: "+48222222222"
    },
    {
      id: 3,
      userName: "Arthur Glenn",
      profilePicture: "",
      city: "Norfolk",
      state: "VA",
      country: "USA",
      code: "333333",phone: "+48333333333"
    },
    {
      id: 4,
      userName: "Maria Guerra",
      profilePicture: "",
      city: "Burr Ridge",
      state: "IL",
      country: "USA",
      code: "444444",phone: "+48444444444"
    },
  ],
};
