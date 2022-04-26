<template>
  <div>
    <h1>Uh oh!</h1>
    <h3>
      It looks like you are experiencing a network issue. Please click the back
      button to try again
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >Or go back to the Home Page</router-link
    >
  </div>
</template>
