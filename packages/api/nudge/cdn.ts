const app_id = document.currentScript?.getAttribute("data-app-id");
console.log(app_id);

//! TODO: API call using app_id to get all the campaign nudges for the application

//? INFO: dummy data
const nudges = [
  {
    event_label: "success",
    nudge: {
      label: "green_dot",
      type: "dot",
      config: {
        elementId: "rewards_logo",
        backgroundColor: "#232323",
        size: "8px",
        position: "top-middle",
      },
    },
  },
];

//? INFO: loop through the nudges to set them up
nudges.forEach(({ nudge: { type, config } }) => {
  switch (type) {
    case "dot": {
      const { elementId, ...style } = config;

      const parent = document.getElementById(elementId!);
      parent!.style.position = "relative";

      const dotNudge = document.createElement("div");

      dotNudge.style.backgroundColor = style.backgroundColor;

      dotNudge.style.zIndex = "99999";
      dotNudge.style.position = "absolute";
      dotNudge.style.borderRadius = "100%";

      dotNudge.style.width = style.size!;
      dotNudge.style.height = style.size!;

      if (style.position === "top-left") {
        dotNudge.style.left = "0";
        dotNudge.style.top = "0";
      } else if (style.position === "top-middle") {
        dotNudge.style.top = "0";
        dotNudge.style.left = "50%";
        dotNudge.style.transform = "translateX(-50%)";
      } else if (style.position === "top-right") {
        dotNudge.style.right = "0";
        dotNudge.style.top = "0";
      } else if (style.position === "middle-left") {
        dotNudge.style.left = "0";
        dotNudge.style.top = "50%";
        dotNudge.style.transform = "translateY(-50%)";
      } else if (style.position === "middle-middle") {
        dotNudge.style.top = "50%";
        dotNudge.style.transform = "translateY(-50%)";
        dotNudge.style.left = "50%";
        dotNudge.style.transform = "translateX(-50%)";
      } else if (style.position === "middle-right") {
        dotNudge.style.right = "0";
        dotNudge.style.top = "50%";
        dotNudge.style.transform = "translateY(-50%)";
      } else if (style.position === "bottom-left") {
        dotNudge.style.left = "0";
        dotNudge.style.bottom = "0";
      } else if (style.position === "bottom-middle") {
        dotNudge.style.bottom = "0";
        dotNudge.style.left = "50%";
        dotNudge.style.transform = "translateX(-50%)";
      } else if (style.position === "bottom-right") {
        dotNudge.style.right = "0";
        dotNudge.style.bottom = "0";
      }

      parent?.appendChild(dotNudge);

      break;
    }

    // case "overlay": {
    //   const backdrop = document.createElement("div");
    //   backdrop.style.backgroundColor = "#232323";
    //   backdrop.style.zIndex = "99999";
    //   backdrop.style.position = "absolute";
    //   backdrop.style.top = "0";
    //   backdrop.style.left = "0";
    //   backdrop.style.width = "100%";
    //   backdrop.style.height = "100%";
    //   document.body.appendChild(backdrop);
    //   break;
    // }
  }
});

// make api call to NF BE for campaigns config (where to show , what to show)
// consume the response and show render the nudges to dom
