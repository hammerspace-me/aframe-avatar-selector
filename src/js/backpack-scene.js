function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getQueryParameter(key) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  return params[key];
}

// We can retrieve the access token by a query parameter or a cookie or use any other mechanism to transfer it
function getAccessToken() {
  //return getCookie("access_token");
  return getQueryParameter("access_token");
}

// We need to register a scene component, if we want to retrieve the access token at runtime
AFRAME.registerComponent("backpack-scene", {
  init: function () {
    var sceneEl = this.el;
    var backpackEl = document.createElement("a-entity");

    // We add a backpack component to the scene by providing the backend url and access token
    backpackEl.setAttribute("backpack-avatar-selector", {
      backpackUrl: config.BACKPACK_BACKEND,
      accessToken: getAccessToken(),
    });
    sceneEl.appendChild(backpackEl);

    this.el.addEventListener("backpack:init", (event) => {
      console.log("Backpack initialized");
    });

    this.el.addEventListener("backpack:error", (event) => {
      console.log("Backpack error", event);
    });

    this.el.addEventListener("backpack:received-items", (event) => {
      console.log("Backpack items", event);
    });

    this.el.addEventListener("backpack:avatar-selected", (event) => {
      console.log("Backpack avatar selected", event);
    });

    // Add a portal with link to the experience
    var portal = document.createElement("a-entity");
    portal.setAttribute("position", "-5 1.6 0");
    portal.setAttribute("backpack-portal", {
      href: config.EXPERIENCE,
      title: "Metameditation",
      image: "#previewThumbnail",
    });

    sceneEl.appendChild(portal);
  },
});
