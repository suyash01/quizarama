<template>
  <div class="login">
    <v-container>
      <v-layout>
        <v-flex sm6 offset-sm3>
          <v-card>
            <v-card-title>
              <v-form v-model="valid" style="width:100%">
                <v-text-field
                  v-model="uname"
                  :rules="unameRules"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="pass"
                  :rules="passRules"
                  :append-icon="icon ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (icon = !icon)"
                  :type="icon ? 'password' : 'text'"
                  label="Password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-title>
            <v-card-actions>
              <div class="text-xs-center" style="width: 100%">
                <v-btn large outline ripple 
                  color="primary" 
                  @click="login" 
                  :disabled="!valid"
                >
                  Login
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function(){
    return {
      valid: false,
      uname: '',
      unameRules: [
        v => !!v || 'Username is required'
      ],
      pass: '',
      icon: true,
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ]
    }
  },
  methods: {
    login: function(){
      const user = {
        uname: this.uname,
        pass: this.pass
      }
      axios.post('/user/login', user)
      .then(response => {
        const data = {
          text: response.data.data,
          color: 'success'
        }
        this.$emit('show-snackbar', data);
        this.$router.push('quiz');
      })
      .catch(error => {
        console.log(error);
        const data = {
          text: 'Internal server error',
          color: 'error'
        }
        this.$emit('show-snackbar', data);
      });
    }
  }
};
</script>

