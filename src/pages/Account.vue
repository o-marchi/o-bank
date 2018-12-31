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
          <section class="account-info box has-text-left is-relative">
            <h3 class="title is-5">Informações sobre minha conta</h3>
            <div class="columns">
              <div class="column is-one-fifth">
                <span class="icon section-icon">
                  <i class="fas fa-address-card"></i>
                </span>
              </div>
              <div class="column">
                <h5 class="is-uppercase">{{ user.name }}</h5>
                <p><the-mask class="plain-text" readonly="readonly" :value="user.cpf" type="text" :mask="'###.###.###-##'" /></p>
                <p>{{ user.email }}</p>
                <hr>
                <p>Saldo:</p>
                <h2 class="user-amount">
                  <money :value="user.amount" readonly="readonly" v-bind="money"></money>
                </h2>
                <div class="buttons">
                  <a class="button is-info" @click="withdrawModal = true">
                  Sacar
                </a>
                </div>
              </div>
            </div>

            <b-loading :is-full-page="false" :active.sync="loadingAccount"></b-loading>
          </section>

          <section class="panel is-relative">
            <p class="panel-heading">
              Tranferências
            </p>
            <div class="panel-block has-text-left" v-bind:key="transaction.id" v-for="transaction in transactions">
              <div class="columns">
                <div class="column">

                  <div v-if="user.id == transaction.from.id">
                    <span class="panel-icon has-text-danger">
                      <i class="fas fa-arrow-left" aria-hidden="true"></i>
                    </span>
                    
                    <small>Tranferência para<br></small>
                    <strong>{{ transaction.to.name }}</strong>
                  </div>

                  <div v-if="user.id == transaction.to.id">
                    <span class="panel-icon has-text-primary">
                      <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    </span>

                    <small>Depósito de<br></small>
                    <strong>{{ transaction.from.name }}</strong>
                  </div>
                </div>
                <div class="column is-one-quarter">
                  <money class="plain-text" :value="transaction.amount / 100" readonly="readonly" v-bind="money"></money>
                </div>

                <div class="column is-one-quarter has-text-right">
                  <p>{{ moment(transaction.inserted_at).format("DD/MM/YYYY") }}</p>
                </div>
              </div>
            </div>

            <b-loading :is-full-page="false" :active.sync="loadingTransactions"></b-loading>
          </section>
        </div>
        <div class="column has-text-left holders">
          <h3 class="title is-5">Correntistas</h3>

          <div class="is-relative">
            <section class="holder box has-text-left" v-bind:key="holder.id" v-for="holder in holders">
              <h5 class="is-uppercase">{{ holder.name }}</h5>
              <p><the-mask class="plain-text" readonly="readonly" :value="holder.cpf" type="text" :mask="'###.###.###-##'" /></p>
              <p>{{ holder.email }}</p>
              <hr>
              <div class="buttons">
                <a class="button is-small is-info" @click="currentHolder = holder; transferModal = true">
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
      <transfer v-on:reload="updatePage()" :holder="currentHolder"></transfer>
    </b-modal>
    
    <b-modal :active.sync="withdrawModal" has-modal-card>
      <withdraw v-on:reload="updatePage()"></withdraw>
    </b-modal>
  </main>
</template>

<script>
import moment from "moment";
import Transfer from "@/components/Transfer.vue";
import Withdraw from "@/components/Withdraw.vue";

export default {
  components: { Transfer, Withdraw },
  name: "account",
  data() {
    return {
      transferModal: false,
      withdrawModal: false,
      currentHolder: {},
      user: {},
      holders: [],
      transactions: [],
      loadingUsers: true,
      loadingAccount: true,
      loadingTransactions: true,
      errorUsers: true,
      errorAccount: true,
      errorTransactions: true,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      }
    };
  },
  mounted: function() {
    this.$http
      .get("/users")
      .then(response => {
        const holders = response.data.data;
        this.holders = holders.filter(item => item.id !== this.user.id);

        this.loadingUsers = false;
      })
      .catch(() => {
        this.holders = [];
        this.loadingUsers = false;
      });

    this.updatePage();
  },
  methods: {
    moment(date) {
      return moment(date);
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("authorization");
      this.$router.replace("/");
    },
    updatePage() {
      this.$http
        .get("/me")
        .then(response => {
          this.user = response.data.data;
          this.user.amount = this.user.amount / 100;
          localStorage.setItem("user", JSON.stringify(this.user));

          this.errorAccount = false;
          this.loadingAccount = false;
        })
        .catch(() => {
          this.errorAccount = true;
          this.loadingAccount = false;
        });

      this.$http
        .get("/my-transfers")
        .then(response => {
          this.transactions = response.data.data;
          this.errorTransactions = false;
          this.loadingTransactions = false;
        })
        .catch(() => {
          this.errorTransactions = true;
          this.loadingTransactions = false;
        });
    }
  }
};
</script>
