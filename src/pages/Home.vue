<template>
  <main class="home">
    <img alt="O Bank" src="@/assets/logo.png">

    <div>
      <section class="title">
        <h1>Um banco bom <br>demais para ser verdade</h1>
        <small>Talvez porque ele realmente não é</small>
      </section>
    </div>

    <section class="action">
      <div class="button is-large" @click="signinModal = true">
        Login
      </div>
      <div class="button is-large" @click="signupModal = true">
        Crie uma conta
      </div>
    </section>

    <section class="bottom-info">
      <p>
        Sério agora, este projeto tem apenas um objetivo, me dar um emprego na
        <a href ="https://www.stone.com.br/" target="_blank">Stone</a>.<br>
        Mas fique livre para se cadastrar e se divertir.
      </p>
    </section>

    <b-modal :active.sync="signinModal" has-modal-card :width="350">
      <signin></signin>
    </b-modal>

    <b-modal :active.sync="signupModal" has-modal-card :width="350">
      <signup></signup>
    </b-modal>
  </main>
</template>

<script>
import Signin from "@/components/Signin.vue";
import Signup from "@/components/Signup.vue";

export default {
  components: { Signin, Signup },
  name: "home",
  data() {
    return {
      signinModal: false,
      signupModal: false
    };
  }
};
</script>
