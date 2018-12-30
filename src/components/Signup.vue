<template>
  <form action="">
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
              required>
          </b-input>
        </b-field>

        <b-field label="CPF">
          <b-input
              type="text"
              :value="cpf"
              placeholder="CPF"
              required>
          </b-input>
        </b-field>

        <b-field label="E-mail">
          <b-input
              type="email"
              :value="email"
              placeholder="Seu e-mail"
              required>
          </b-input>
        </b-field>

        <b-field label="Senha">
          <b-input
              type="password"
              :value="password"
              password-reveal
              placeholder="Sua senha"
              required>
          </b-input>
        </b-field>

        <br>
      </section>
      
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Cancelar</button>
          <button class="button is-primary">Se cadastrar</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "signup",
  props: ["email", "password"]
};
</script>
