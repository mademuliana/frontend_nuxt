<template>
  <v-col :md="width">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      close-delay="1000"
      :return-value.sync="selectedDate"
      transition="scroll-y-reverse-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="selectedDate"
          :rules="rules"
          readonly
          outlined
          :hide-details="hideDetails"
          :placeholder="placeholder"
          :label="label"
          class=""
          v-bind="attrs"
          v-on="on"
          :value="date | filterDate"
          
        >
          <template v-slot:prepend-inner>
            <v-icon>mdi mdi-calendar</v-icon>
          </template>
        </v-text-field>
      </template>
      <v-date-picker
        v-model="selectedDate"
        no-title
        scrollable
        reactive
        :min="min"
        :max="max"
        :allowed-dates="allowedDates"
        :range="range"
        @change="onDateChanged"
        @click:year="showTip = false"
        @click:month="showTip = false"
      >
        <div
          v-if="showTip"
          class="d-flex pa-1 grey lighten-3 rounded-lg shadow"
          style="max-width: 274px"
        >
          <v-icon class="mr-1" color="primary">mdi-information-outline</v-icon>
          <p class="primary--text caption mb-0 font-weight-bold">
            Klik <b class="primary--text">Bulan-Tahun</b> di atas untuk memilih
            bulan/tahun.
          </p>
          <div class="">
            <v-btn icon small @click="showTip = false">
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-date-picker>
    </v-menu>
  </v-col>
</template>
<script>
import dayjs from "dayjs";
export default {
  props: {
    placeholder: {
      type: String,
      default: "Select Date",
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array,
      default: (_) => [],
    },
    date: {
      type: String,
      required: false,
      default: null,
    },
    allowedDates: {
      type: Function,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
    },
    min: {
      type: String,
      required: false,
    },
    max: {
      type: String,
      required: false,
    },
    range: {
      type: Boolean,
      required: false,
      default: false,
    },
    icon: {
      type: String,
      required: false,
      default: "/assets/icons/calendar.png",
    },
    hideDetails: {
      type: Boolean,
      required: false,
      default: true,
    },
    column: {
        type: Object,
        required: false,
        default: ''
    },
    width:{
            type: Number,
            required: true,
            default: 6
        }
  },
  data() {
    return {
      menu: false,
      showTip: true,
    };
  },
  computed: {
    selectedDate: {
      get() {
        return this.date || this.max;
      },
      set(val) {
        this.$emit("changed", val);
      },
    },
  },
  methods: {
    onDateChanged(val) {
      this.$refs.menu.save(val);
    },
  },
  filters: {
    filterDate(val) {
      if (!val) {
        return "";
      }
      return dayjs(val).format("DD MMMM YYYY");
    },
  },
};
</script>
