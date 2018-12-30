<template>
  <form action="">
    <div class="modal-card" style="width: 350px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>

      <section class="modal-card-body">
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
          <button class="button is-primary">Login</button>
      </footer>
    </div>
</form>
</template>

<script>
export default {
  name: "signin",
  props: ["email", "password"]
};
</script>
