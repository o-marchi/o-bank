<template>
  <form @submit.prevent="login">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>

      <section class="modal-card-body">

        <div class="notification is-danger" v-if="error">
          <button class="delete" @click="error = false"></button>
          Ocorreu um erro no login, tente novamente
        </div>

        <b-field label="E-mail">
          <b-input
              type="email"
              :value="email"
              v-model="email"
              placeholder="Seu e-mail"
              required>
          </b-input>
        </b-field>

        <b-field label="Senha">
          <b-input
              type="password"
              :value="password"
              v-model="password"
              password-reveal
              placeholder="Sua senha"
              required>
          </b-input>
        </b-field>

        <br>

      </section>
      
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Cancelar</button>
          <button class="button is-primary">Login</button>
      </footer>

      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    </div>
</form>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;

      this.$http
        .post('/login', { "email": this.email, "password": this.password })
        .then(response  => this.processLogin(response ))
        .catch(error => {
          console.error(error);
          this.error = true;
          this.loading = false;
        });
    },
    processLogin(response) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      localStorage.setItem('authorization', response.headers.authorization);

      this.$router.replace('/minhaconta');
      this.loading = false;
    }
  }
};
</script>
