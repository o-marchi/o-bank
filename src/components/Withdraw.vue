<template>
  <form action="">
    <div class="modal-card" style="width: 350px;">

      <section class="modal-card-body">
        <p class="modal-info">
          Sacar dinheiro
        </p>

        <b-field>
          <b-input
              type="text"
              :value="amount"
              placeholder="Valor"
              size="is-medium"
              required>
          </b-input>
        </b-field>

        <button class="button is-primary">Sacar</button>

        <br>
      </section>
    </div>
</form>
</template>

<script>
export default {
  name: "withdraw"
};
</script>
