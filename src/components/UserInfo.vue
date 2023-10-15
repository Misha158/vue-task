<script lang="ts">
import Vue from "vue";
import type PropType from "vue";
import type { User } from "@/types";

export default Vue.extend({
  name: "UserInfo",
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="user-card">
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <ul>
        <li><strong>Username:</strong> {{ user.username }}</li>
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li><strong>Phone:</strong> {{ user.phone }}</li>
        <li><strong>Website:</strong> {{ user.website }}</li>
      </ul>
    </div>
    <div class="user-address">
      <h3>Address</h3>
      <ul>
        <li><strong>Street:</strong> {{ user.address.street }}</li>
        <li><strong>Suite:</strong> {{ user.address.suite }}</li>
        <li><strong>City:</strong> {{ user.address.city }}</li>
        <li><strong>Zipcode:</strong> {{ user.address.zipcode }}</li>
      </ul>
    </div>
    <div class="user-company">
      <h3>Company</h3>
      <ul>
        <li><strong>Name:</strong> {{ user.company.name }}</li>
        <li><strong>Catch Phrase:</strong> {{ user.company.catchPhrase }}</li>
        <li><strong>BS:</strong> {{ user.company.bs }}</li>
      </ul>
    </div>
  </div>
</template>
<style>
.user-card {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
  margin-bottom: 10px;
  border: 2px solid black;
  background-color: #c3c3c3;
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

.user-info ul,
.user-address ul,
.user-company ul {
  padding: 0;
  list-style-type: none;
}

.user-info li,
.user-address li,
.user-company li {
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
