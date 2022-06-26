// @ts-nocheck
const app_id = document.currentScript?.getAttribute("data-app-id");

const API_BASE_URL = "https://nudgelab.jagnani73.com/api/v1";

const RenderNudge = (type, config) => {
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

    case "overlay": {
      const { ...style } = config;

      const backdrop = document.createElement("div");
      backdrop.style.zIndex = "99999";
      backdrop.style.position = "fixed";
      backdrop.style.display = "flex";
      backdrop.style.justifyContent = "center";
      backdrop.style.alignItems = "center";
      backdrop.style.top = "0";
      backdrop.style.left = "0";
      backdrop.style.width = "100%";
      backdrop.style.height = "100%";
      backdrop.style.flexDirection = "column";
      backdrop.style.backgroundColor = style.backdropColor!;

      backdrop.addEventListener("click", () => {
        backdrop.remove();
      });

      document.body.appendChild(backdrop);

      const modal = document.createElement("div");
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.borderStyle = "solid";
      modal.innerHTML = style.text!;
      modal.style.fontSize = style.fontSize!;
      modal.style.color = style.color!;
      modal.style.textAlign = style.textAlign!;
      modal.style.backgroundColor = style.backgroundColor!;
      modal.style.borderColor = style.borderColor!;
      modal.style.borderWidth = style.borderWidth!;
      modal.style.borderRadius = style.borderRadius!;
      modal.style.width = style.width!;
      modal.style.height = style.height!;

      backdrop.appendChild(modal);

      break;
    }
  }
};

(async () => {
  const { data: nudges } = await (
    await fetch(`${API_BASE_URL}/project/nudges/campaign/${app_id}`)
  ).json();

  nudges.forEach(({ nudge: { type, config } }) => RenderNudge(type, config));
})();

const getTriggerNudges = async () => {
  let { data: nudges } = await (
    await fetch(`${API_BASE_URL}/nudge/trigger/${app_id}`)
  ).json();

  nudges.forEach(({ nudge: { type, config } }) => RenderNudge(type, config));

  await new Promise(async (resolve) => setTimeout(resolve, 500));
  await getTriggerNudges();
};

getTriggerNudges();
