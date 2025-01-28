import { Tools as WeatherTools } from "./weather_tools.js";
import { Tools as TravelTools } from "./travel_tools.js";

export const Tools = {
  tools_map: {
    weather: WeatherTools,
    travel: TravelTools,
  },

  get_tool: function (name) {
    if (this.tools_map[name]) {
      return Tools[name];
    } else {
      throw "No correct tool found";
    }
  },

  config: function () {
    return [
      {
        type: "function",
        function: {
          name: "get_tool",
          function: this.get_tool,
          description: "Get the correct tool to answer user's question",
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
    ];
  },
};
