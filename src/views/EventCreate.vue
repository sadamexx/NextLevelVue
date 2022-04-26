<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model.trim="event.title"
        type="text"
        placeholder="Title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <!-- <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        /> -->
      <!-- </div> -->
      <BaseInput
        label="Description"
        v-model.trim="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model.trim="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          @closed="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
          placeholder="Select a date"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        @blur="$v.event.time.$touch()"
        :class="{ error: $v.event.time.$error }"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>
      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
    </form>
    <!-- <p>This event was created by {{ user.name }}</p>
    <p>{{ getEventById(1) }}</p>
    <p>There are {{ catLength }} categories listed below</p> -->
    <!-- <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul> -->
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import BaseInput from '../components/BaseInput.vue'
import BaseSelect from '../components/BaseSelect.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker,
    BaseInput,
    BaseSelect,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEventObject(),
      times,
      categories: this.$store.state.categories,
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
  // computed: {
  //   // getEvent() {
  //   //   return this.$store.getters.getEventById
  //   // },
  //   catLength() {
  //     return this.$store.getters.catLength
  //   },
  //   ...mapGetters(['getEventById']),
  //   ...mapState(['user', 'categories']),
  // },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
