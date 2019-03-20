// manages app state, brute-forcefully, no need for vuex until this file gets yuge
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

let idx = 0;
/**
 * Structure of a Pass obj in passes:
 {
    password: "lolz",
    service: "Top Bank",
    username: "Rand Doode",

    bgColor: "bg-blue-grey",
    idx: 0
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
    passData.idx = idx++;
    this.state.passes.push(passData);
    this.state.showNewPassDialog = false;
  },
  deletePass(id) {
    let i;
    for (i = 0; i < this.state.passes.length; i++) {
      if (this.state.passes[i].idx == id) {
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
  showColorPickerDialog(idx) {
    this.state.showingColorPickerFor = idx;
    this.state.showColorPickerDialog = true;
  },
  closeColorPickerDialog() {
    this.state.showingColorPickerFor = null;
    this.state.showColorPickerDialog = false;
  },
  chooseColor(color) {
    for (let i = 0; i < this.state.passes.length; i++) {
      if (this.state.passes[i].idx == this.state.showingColorPickerFor) {
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
