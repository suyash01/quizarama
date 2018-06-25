<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawer" width="250">
      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(item, index) in items" :key="index" :to="item.link">{{item.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view v-on:show-snackbar="showSnackbar"></router-view>
    </v-content>
    <v-footer app>
      <v-flex xs-12 text-xs-center>&copy;{{ new Date().getFullYear() }} - <strong>Suyash</strong></v-flex>
    </v-footer>
    <v-snackbar right bottom
      :timeout="timeout"
      :color="color"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      snackbar: false,
      color: '',
      timeout: 6000,
      text: '',
      drawer: false,
      items: [
        {icon: 'home', name: 'Home', link: '/'},
        {icon: '', name: 'Login', link: '/login'},
        {icon: '', name: 'Register', link: '/register'},
        {icon: '', name: 'About', link: '/about'}
      ],
      title: 'Quizarama'
    }
  },
  methods: {
    showSnackbar: function(data){
      this.text = data.text;
      this.color = data.color;
      this.snackbar = true;
    }
  }
}
</script>
