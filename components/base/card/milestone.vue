<template>
  
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.milestone-item {
  color: #0064a0;
  display: flex;
  text-align: left;
}

.milestone-item .v-icon {
  position: absolute;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
}

.milestone-item:nth-child(odd) {
  align-items: flex-start !important;
}
.milestone-item:nth-child(even) {
  align-items: flex-end !important;
}
</style>