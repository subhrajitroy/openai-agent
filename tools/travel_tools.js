export const Tools = {
  hotels: {
    London: ["Hotel Savoy"],
    Mumbai: ["Oberoi Sheraton"],
    Paris: ["Tower View"],
  },
  cities: ["London", "Paris", "Mumbai", "Kolkata", "Stockholm"],

  getRandomItemFromList: function (list) {
    let length = list.length;
    let randomIndex = Math.floor(Math.random() * length);
    return list[randomIndex];
  },

  get_location: function () {
    return getRandomItemFromList(cities);
  },

  get_hotels: function (loc, date) {
    if (this.hotels[loc.city]) {
      return this.hotels[loc.city];
    }
    return `No available hotels on this ${date}`;
  },

  get_date() {
    return new Date().toISOString();
  },

  config: function () {
    return [
      {
        type: "function",
        function: {
          name: "get_hotels",
          function: this.get_hotels,
          description: "Get the current hotel for a given city",
          parse: JSON.parse,
          parameters: {
            type: "object",
            properties: {
              city: {
                type: "string",
              },
              date: {
                type: "string",
              },
            },
          },
        },
      },
      {
        type: "function",
        function: {
          name: "get_date",
          function: this.get_date,
          description: "Get todays's date",
          parameters: {
            type: "object",
            properties: {},
          },
        },
      },
      {
        type: "function",
        function: {
          name: "get_location",
          function: this.get_location,
          description: "Get location of the user",
          parameters: {
            type: "object",
            properties: {},
          },
        },
      },
    ];
  },
};
