<template>
  <div class="quiz">
    <v-tabs color="grey lighten-4" grow slider-color="grey darken-1">
      <v-tab v-for="(tab, index) in tabs" :key="index">{{tab}}</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      tabs: ['Ongoing', 'Upcoming', 'Past']
    };
  }
}
</script>

