class Editor {
  constructor(defaultZoomLevel) {
    // configuration of editor
    this.config = {
      bold: false,
      italic: false,
      underline: false,
      mode: "read",
      color: "black",
      align: "center",
    };

    // for align
    this.alignCircus = 1;
    this.alignList = ["center", "left", "right", "justify"];

    // for editor content
    this.content = document.getElementById("editor-content");

    // zoom in or zoom out
    this.zoomLevel = defaultZoomLevel;
  }

  setMode = () => {
    this.config.mode = this.config.mode == "read" ? "edit" : "read";
    this.content.setAttribute(
      "contenteditable",
      this.config.mode === "read" ? false : true
    );

    document.querySelector(`label[for="editor-mode"]`).innerHTML =
      this.config.mode;
  };

  setAlign = () => {
    if (this.alignCircus === 3) {
      this.config.mode = this.alignList[this.alignCircus];
      this.alignCircus = 0;
    } else {
      this.config.mode = this.alignList[this.alignCircus];
      this.alignCircus++;
    }
    this.content.style.textAlign = this.config.mode;

    document.querySelector(`label[for="editor-align"]`).innerHTML =
      this.config.mode;
  };

  setBold = () => {
    this.config.bold = !this.config.bold;
    this.content.style.fontWeight = this.config.bold ? "700" : "400";
  };
  setItalic = () => {
    this.config.italic = !this.config.italic;
    this.content.style.fontStyle = this.config.italic ? "italic" : "normal";
  };
  setUnderline = () => {
    this.config.underline = !this.config.underline;
    this.content.style.textDecoration = this.config.underline
      ? "underline"
      : "none";
  };

  setColor = () => {
    this.content.style.color = document.getElementById("editor-color").value;
  };

  zoomIn = () => {
    this.zoomLevel += 0.1;
    document.getElementById("editor-content-container").style.zoom =
      this.zoomLevel;
    document.getElementById("zoom-value").value =
      parseInt(this.zoomLevel * 100) + "%";
  };
  zoomOut = () => {
    this.zoomLevel -= 0.1;
    document.getElementById("editor-content-container").style.zoom =
      this.zoomLevel;
    document.getElementById("zoom-value").value =
      parseInt(this.zoomLevel * 100) + "%";
  };
}

class App {
  constructor() {
    // configuration of app
    this.config = {
      dark_mode: false,
    };
  }

  setColorMode = () => {
    this.config.dark_mode = !this.config.dark_mode;

    document.documentElement.setAttribute(
      "data-bs-theme",
      this.config.dark_mode ? "dark" : "light"
    );
    document.getElementById("color-mode").innerText = this.config.dark_mode
      ? "Dark"
      : "Light";
  };
}

const editor = new Editor(1);
const app = new App();
