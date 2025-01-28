const cities = ["London", "Paris", "Mumbai", "Kolkata", "Stockholm"];
const weatherConditions = {
  "London": "raining",
  "Paris": "sunny",
  "Stockholm": "snowing",
  "Mumbai": "humid",
  "Kolkata": "flooded",
};

export const Tools = {
  get_location: function () {
    return getRandomItemFromList(cities);
  },

  get_current_weather: function (loc) {
    return weatherConditions[loc.city];
  },

  get_day_of_week(){
    return "Today is Sunday"
  },

  config: function(){
    return [
      {
        type: "function",
        function: {
          name: "get_current_weather",
          function: this.get_current_weather,
          description: "Get the current weather for the user's location",
          parse: JSON.parse,
          parameters: {
            type: "object",
            properties: {
              city: {
                type: "string",
              },
            },
          },
        },
      },
      {
        type: "function",
        function: {
          name: "get_day_of_week",
          function: this.get_day_of_week,
          description: "Get day of the week",
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
  }
};

function getRandomItemFromList(list) {
  let length = list.length;
  let randomIndex = Math.floor(Math.random() * length);
  return list[randomIndex];
}
