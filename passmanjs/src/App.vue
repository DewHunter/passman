<template>
  <v-app dark>
    <Toolbar/>
    <NavDrawer/>

    <v-content>
      <PassGrid/>
    </v-content>

    <AddPassDialog/>
    <ColorPickerDialog/>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
import NavDrawer from "./components/NavDrawer";
import PassGrid from "./components/PassGrid";
import AddPassDialog from "./components/dialogs/AddPassDialog";
import ColorPickerDialog from "./components/dialogs/ColorPickerDialog";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Toolbar,
    NavDrawer,
    PassGrid,
    AddPassDialog,
    ColorPickerDialog,
    Footer
  }
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
