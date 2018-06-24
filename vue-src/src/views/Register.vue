<template>
  <div class="register">
    <v-container>
      <v-layout>
        <v-flex sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <v-form v-model="valid" style="width:100%">
                <v-text-field 
                  v-model="name"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="uname"
                  :rules="unameRules"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-Mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="pass1"
                  :rules="pass1Rules"
                  :append-icon="icon1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (icon1 = !icon1)"
                  :type="icon1 ? 'password' : 'text'"
                  label="Password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="pass2"
                  :rules="pass2Rules"
                  :append-icon="icon2 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (icon2 = !icon2)"
                  :type="icon2 ? 'password' : 'text'"
                  label="Confirm Password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-title>
            <v-card-actions>
              <div class="text-xs-center" style="width:100%">
                <v-btn large outline ripple 
                  color="primary" 
                  @click="register" 
                  :disabled="!valid"
                >
                  Register
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar right bottom
      :timeout="timeout"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      uname: '',
      unameRules: [
        v => !!v || 'Username is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      pass1: '',
      icon1: true,
      pass1Rules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ],
      pass2: '',
      icon2: true,
      pass2Rules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
        v => v === this.pass1 || 'Passwords do not match'
      ],
      snackbar: false,
      color: '',
      mode: '',
      timeout: 6000,
      text: ''
    }
  },
  methods: {
    register() {
      const user = {
        name: this.name,
        uname: this.uname,
        email: this.email,
        pass: this.pass1
      }
      axios.post(process.env.VUE_APP_API_URL + '/user/register', user)
        .then(response => {
          this.text = response.data.data;
          this.color = 'success'
          this.snackbar = true;
        })
        .catch(error => {
          console.log(error);
          this.text = 'Internal server error';
          this.color = 'error'
          this.snackbar = true;
        });
    }
  }
}
</script>

