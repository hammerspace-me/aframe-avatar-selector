function getQueryParameter(key) {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  return params[key];
}

// We can retrieve the access token by a query parameter or a cookie or use any other mechanism to transfer it
function getAccessToken() {
  return getQueryParameter("access_token");
}

// We need to register a scene component, if we want to retrieve the access token at runtime
AFRAME.registerComponent("hammerspace-scene", {
  init: function () {
    var sceneEl = this.el;
    var hammerspaceEl = document.createElement("a-entity");

    // We add a hammerspace component to the scene by providing the backend url and access token
    hammerspaceEl.setAttribute("hammerspace-avatar-selector", {
      hammerspaceUrl: config.HAMMERSPACE_BACKEND,
      accessToken: getAccessToken(),
    });
    sceneEl.appendChild(hammerspaceEl);

    this.el.addEventListener("hammerspace:init", (event) => {
      console.log("hammerspace initialized");
    });

    this.el.addEventListener("hammerspace:error", (event) => {
      console.log("hammerspace error", event);
    });

    this.el.addEventListener("hammerspace:received-items", (event) => {
      console.log("hammerspace items", event);
    });

    this.el.addEventListener("hammerspace:avatar-selected", (event) => {
      console.log("hammerspace avatar selected", event);
    });

    // Add a portal with link to the experience
    var portal = document.createElement("a-entity");
    portal.setAttribute("position", "-5 1.6 0");
    portal.setAttribute("hammerspace-portal", {
      href: config.EXPERIENCE,
      title: "Metameditation",
      image: "#previewThumbnail",
    });

    sceneEl.appendChild(portal);
  },
});
