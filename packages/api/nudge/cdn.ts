// @ts-nocheck
const app_id = document.currentScript?.getAttribute("data-app-id");

const API_BASE_URL = "https://nudgelab.jagnani73.com/api/v1";

const RenderNudge = (type, config) => {
  switch (type) {
    case "dot": {
      const { elementId, ...style } = config;

      const parent = document.getElementById(elementId!);
      if (!parent) return;
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

      const modal = document.createElement("section");
      modal.style.zIndex = "99999";
      modal.style.position = "fixed";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.flexDirection = "column";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";

      document.body.appendChild(modal);

      const backdrop = document.createElement("div");
      backdrop.style.position = "absolute";
      backdrop.style.left = "0";
      backdrop.style.right = "0";
      backdrop.style.width = "100%";
      backdrop.style.height = "100%";
      backdrop.style.zIndex = "0";
      backdrop.style.backgroundColor = style.backdropColor!;
      // animation 🔥
      backdrop.style.opacity = 0;
      backdrop.style.transition = "all 300ms ease";

      backdrop.addEventListener("click", () => {
        backdrop.style.opacity = 0;

        content.style.transform = "scale(0.5)";
        content.style.opacity = 0;
        setTimeout(() => {
          modal.remove();
        }, 300);
      });

      const content = document.createElement("article");
      content.style.zIndex = "10";
      content.style.display = "flex";
      content.style.justifyContent = "center";
      content.style.alignItems = "center";
      content.style.borderStyle = "solid";
      content.innerHTML = style.text!;
      content.style.fontSize = style.fontSize!;
      content.style.color = style.color!;
      content.style.textAlign = style.textAlign!;
      content.style.backgroundColor = style.backgroundColor!;
      content.style.borderColor = style.borderColor!;
      content.style.borderWidth = style.borderWidth!;
      content.style.borderRadius = style.borderRadius!;
      content.style.width = style.width!;
      content.style.height = style.height!;
      // animation 🔥
      content.style.transform = "scale(0.5)";
      content.style.opacity = 0;
      content.style.transition = "all 300ms ease";

      modal.appendChild(backdrop);
      modal.appendChild(content);

      setTimeout(() => {
        backdrop.style.opacity = 1;

        content.style.opacity = 1;
        content.style.transform = "scale(1)";
      }, 5);

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
