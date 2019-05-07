// manages app state, brute-forcefully, no need for vuex until this file gets yuge
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

import constants from "../constants.js";

/**
 * Structure of a Pass obj in passes:
 {
    password: "lolz",
    service: "Top Bank",
    username: "Rand Doode",

    bgColor: "bg-blue-grey",
    id: "sdfsdfsdf"
  }
 */
export const store = {
  state: {
    passes: [],
    showNewPassDialog: false,
    showColorPickerDialog: false,
    showingColorPickerFor: null,
    drawer: null
  },
  addPass(passData) {
    fetch(constants.endpoint + "/api/getNewId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": "123456"
      }
    })
      .then(response => {
        if (response.ok) {
          passData.id = response.id;
          this.state.passes.push(passData);
          this.state.showNewPassDialog = false;
        } else {
          alert("Could not contact Server to create Pass :(");
        }
      })
      .catch(error => alert(error));
  },
  deletePass(id) {
    let i;
    for (i = 0; i < this.state.passes.length; i++) {
      if (this.state.passes[i].id == id) {
        break;
      }
    }
    this.state.passes.remove(i);
  },
  showNewPassDialog() {
    this.state.showNewPassDialog = true;
  },
  closeNewPassDialog() {
    this.state.showNewPassDialog = false;
  },
  showColorPickerDialog(passId) {
    this.state.showingColorPickerFor = passId;
    this.state.showColorPickerDialog = true;
  },
  closeColorPickerDialog() {
    this.state.showingColorPickerFor = null;
    this.state.showColorPickerDialog = false;
  },
  chooseColor(color) {
    for (let i = 0; i < this.state.passes.length; i++) {
      if (this.state.passes[i].id == this.state.showingColorPickerFor) {
        this.state.passes[i].bgColor = color;
        break;
      }
    }
    this.closeColorPickerDialog();
  },
  toggleDrawer() {
    this.state.drawer = !this.state.drawer;
  }
};
