// manages app state, brute-forcefully, no need for vuex until this file gets yuge
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

export const store = {
  state: {
    passes: [
      {
        password: "lolz",
        service: "Top Bank",
        username: "Rand Doode",
        bgColor: "bg-blue-grey"
      }
    ],
    showNewPassDialog: false,
    drawer: null
  },
  addPass(passData) {
    this.state.passes.push(passData);
    this.state.showNewPassDialog = false;
  },
  deletePass(id) {
    this.state.passes.remove(id);
  },
  showNewPassDialog() {
    this.state.showNewPassDialog = true;
  },
  closeNewPassDialog() {
    this.state.showNewPassDialog = false;
  },
  toggleDrawer() {
    this.state.drawer = !this.state.drawer;
  }
};
