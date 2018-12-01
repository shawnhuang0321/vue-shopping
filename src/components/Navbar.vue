<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Playing Cards</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a @click.prevent="signout" class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    methods: {
      signout() {
        const api = `${process.env.API_PATH}/logout`;
        const vm = this;
        vm.$http.post(api).then(res => {
          const { data: { success } } = res;
          if (success) {
            vm.$router.push("/");
          }
        });
      }
    }
  }
</script>