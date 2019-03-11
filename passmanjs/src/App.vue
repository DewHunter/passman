<template>
  <v-app dark>
    <Toolbar/>
    <NavDrawer/>

    <v-content>
      <PassGrid/>
    </v-content>

    <AddPassDialog/>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
import NavDrawer from "./components/NavDrawer";
import PassGrid from "./components/PassGrid";
import AddPassDialog from "./components/AddPassDialog";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Toolbar,
    NavDrawer,
    PassGrid,
    AddPassDialog,
    Footer
  }
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
