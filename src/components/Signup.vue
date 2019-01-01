<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: 350px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastro</p>
      </header>

      <section class="modal-card-body">
        <b-field label="Nome completo">
          <b-input
              type="text"
              :value="name"
              placeholder="Nome completo"
              v-model="name"
              required>
          </b-input>
        </b-field>

        <b-field label="CPF">
          <the-mask class="input" placeholder="CPF" :required="true" v-model="cpf" :value="cpf" type="text" :mask="'###.###.###-##'" />
        </b-field>

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
          <button class="button is-primary" type="submit">Se cadastrar</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      cpf: ""
    };
  },
  methods: {
    submit() {
      this.loading = true;

      const body = {
        user: {
          name: this.name,
          email: this.email,
          password: this.password,
          cpf: this.cpf
        }
      };

      this.$http
        .post("/users", body)
        .then(response => this.createUser(response))
        .catch(() => {
          this.error = true;
          this.loading = false;
        });
    },
    createUser(response) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      localStorage.setItem("authorization", response.headers.authorization);
      this.$http.defaults.headers["Authorization"] =
        response.headers.authorization;

      this.$router.replace("/minhaconta");
      this.loading = false;
    }
  }
};
</script>
