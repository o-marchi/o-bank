<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: 350px;">

      <section class="modal-card-body" v-if="!success">
        <div class="notification is-danger" v-if="error">
          <button class="delete" @click="error = false"></button>
          Ocorreu um erro ao sacar o dinheiro, tente novamente
        </div>

        <p class="modal-info">
          Sacar dinheiro
        </p>

        <b-field>
          <money class="input is-medium" placeholder="Valor" v-model="amount" v-bind="money"></money>
        </b-field>

        <button class="button is-primary">Sacar</button>

        <br>

        <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
      </section>

      <section class="modal-card-body" v-if="success">
        <div class="modal-info has-text-center">
          Parabéns, você acabou de sacar:
          <money class="plain-text" :value="amount" readonly="readonly" v-bind="money"></money>
        </div>

        <button class="button is-primary" @click="$parent.close();">Fechar</button>

        <br>

        <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
      </section>
    </div>
</form>
</template>

<script>
export default {
  name: "withdraw",
  data() {
    return {
      amount: 0.0,
      loading: false,
      error: false,
      success: false,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    submit() {
      this.loading = true;

      const amount = this.amount * 100;

      this.$http
        .post("/withdraw", { amount })
        .then(response => {
          this.loading = false;
          this.success = true;

          this.$emit('reload');
        })
        .catch(error => {
          console.error(error);
          this.error = true;
          this.loading = false;
        });
    }
  }
};
</script>
