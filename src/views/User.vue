<template>
  <div>
    <h1>User</h1>
    <!-- <p>this is {{$route.params.username}} another way of doing it without the props</p> -->
    <p>this is {{ username }} the state of current route</p>
  </div>
</template>

<script>
export default {
  props: ['username'],
}
</script>
