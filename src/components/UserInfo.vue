<script>
import Vue from "vue";

export default Vue.extend({
  name: "UserInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <div class="user-card">
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <p><strong>Website:</strong> {{ user.website }}</p>
    </div>
    <div class="user-address">
      <h3>Address</h3>
      <p><strong>Street:</strong> {{ user.address.street }}</p>
      <p><strong>Suite:</strong> {{ user.address.suite }}</p>
      <p><strong>City:</strong> {{ user.address.city }}</p>
      <p><strong>Zipcode:</strong> {{ user.address.zipcode }}</p>
    </div>
    <div class="user-company">
      <h3>Company</h3>
      <p><strong>Name:</strong> {{ user.company.name }}</p>
      <p><strong>Catch Phrase:</strong> {{ user.company.catchPhrase }}</p>
      <p><strong>BS:</strong> {{ user.company.bs }}</p>
    </div>
  </div>
</template>

<style>
.user-card {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.user-info,
.user-address,
.user-company {
  flex-basis: 30%;
}

.user-info h2,
.user-address h3,
.user-company h3 {
  margin-bottom: 10px;
  font-weight: bold;
}

.user-info p,
.user-address p,
.user-company p {
  margin: 5px 0;
}

@media screen and (max-width: 768px) {
  .user-card {
    gap: 40px;
  }

  .user-info,
  .user-address,
  .user-company {
    flex-basis: 100%;
  }
}
</style>
