const app_id = document.currentScript?.getAttribute("data-app-id");
console.log(app_id);

//! TODO: API call using app_id to get all the campaign nudges for the application

//? INFO: dummy data
const nudges = [
  {
    type: "overlay",
    background_color: "#232323",
  },
  {
    type: "dot",
    elementId: "rewards_logo",
    background_color: "#232323",
  },
];

//? INFO: loop through the nudges to set them up
nudges.forEach((nudge) => {
  switch (nudge.type) {
    case "dot": {
      const parent = document.getElementById(nudge.elementId!);
      parent!.style.position = "relative";

      const dotNudge = document.createElement("div");
      dotNudge.style.zIndex = "99999";
      dotNudge.style.position = "absolute";
      dotNudge.style.width = "10px";
      dotNudge.style.height = "10px";
      dotNudge.style.borderRadius = "100%";
      dotNudge.style.top = "0";
      dotNudge.style.right = "0";
      dotNudge!.style.backgroundColor = nudge.background_color!;

      parent?.appendChild(dotNudge);

      break;
    }

    case "overlay": {
      const backdrop = document.createElement("div");
      backdrop.style.backgroundColor = "#232323";
      backdrop.style.zIndex = "99999";
      backdrop.style.position = "absolute";
      backdrop.style.top = "0";
      backdrop.style.left = "0";
      backdrop.style.width = "100%";
      backdrop.style.height = "100%";
      document.body.appendChild(backdrop);
      break;
    }
  }
});

// make api call to NF BE for campaigns config (where to show , what to show)
// consume the response and show render the nudges to dom
