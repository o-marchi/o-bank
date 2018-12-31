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
                <h5 class="is-uppercase">{{ user.name }}</h5>
                <p><the-mask class="plain-text" readonly :value="user.cpf" type="text" :mask="'###.###.###-##'" /></p>
                <p>{{ user.email }}</p>
                <hr>
                <p>Saldo:</p>
                <h2 class="user-amount">
                  <money v-model="user.amount" v-bind="money"></money>
                </h2>
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

          <div style="position: relative;">
            <section class="holder box has-text-left" v-for="holder in holders" v-if="holder.id !== user.id">
              <h5 class="is-uppercase">{{ holder.name }}</h5>
              <p><the-mask class="plain-text" readonly :value="holder.cpf" type="text" :mask="'###.###.###-##'" /></p>
              <p>{{ holder.email }}</p>
              <hr>
              <div class="buttons">
                <a class="button is-small is-info" @click="transferModal = true">
                  Transferir
                </a>
              </div>
            </section>

            <b-loading :is-full-page="false" :active.sync="loadingUsers"></b-loading>
          </div>

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
      withdrawModal: false,
      user: {},
      holders: [],
      loadingUsers: true,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    };
  },
  mounted: function() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.user.amount = this.user.amount / 100;

    this.$http
      .get('/users')
      .then(response  => {
        this.holders = response.data.data;
        this.loadingUsers = false;
      })
      .catch(error => {
        console.error(error);
        this.holders = [];
        this.loadingUsers = false;
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("authorization");
      this.$router.replace("/");
    }
  }
};
</script>
