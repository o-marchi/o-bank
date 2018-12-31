<template>
  <main class="account container">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item">
          <img alt="O Bank" src="@/assets/logo-green.png" height="30">
        </span>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button" @click.prevent="logout">
                Sair
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="columns">
        <div class="column is-two-thirds">
          <section class="account-info box has-text-left">
            <h3 class="title is-5">Informações sobre minha conta</h3>
            <div class="columns">
              <div class="column is-one-fifth">
                <span class="icon section-icon">
                  <i class="fas fa-address-card"></i>
                </span>
              </div>
              <div class="column">
                <h5>ONELIO DE MARCHI JUNIOR</h5>
                <p>oneliojr@gmail.com</p>
                <hr>
                <p>Saldo:</p>
                <h2>R$ 1.000,00</h2>
                <div class="buttons">
                  <a class="button is-info" @click="withdrawModal = true">
                  Sacar
                </a>
                </div>
              </div>
            </div>
          </section>

          <section class="panel">
            <p class="panel-heading">
              Extrato
            </p>
            <div class="panel-block has-text-left" v-for="n in 10">
              <div class="columns">
                <div class="column">
                  <span class="panel-icon has-text-primary">
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                  </span>
                  Depósito de Katita
                </div>
                <div class="column is-one-quarter has-text-right has-text-weight-bold">
                  R$ 500,00
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="column has-text-left holders">
          <h3 class="title is-5">Correntistas</h3>

          <section class="holder box has-text-left" v-for="n in 5">
            <h5>ONELIO DE MARCHI JUNIOR</h5>
            <p>oneliojr@gmail.com</p>
            <hr>
            <div class="buttons">
              <a class="button is-small is-info" @click="transferModal = true">
                Transferir
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>

    <b-modal :active.sync="transferModal" has-modal-card>
      <transfer></transfer>
    </b-modal>
    
    <b-modal :active.sync="withdrawModal" has-modal-card>
      <withdraw></withdraw>
    </b-modal>
  </main>
</template>

<script>
import Transfer from "@/components/Transfer.vue";
import Withdraw from "@/components/Withdraw.vue";

export default {
  components: { Transfer, Withdraw },
  name: "account",
  data() {
    return {
      transferModal: false,
      withdrawModal: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('authorization');
      this.$router.replace('/');
    }
  }
};
</script>
