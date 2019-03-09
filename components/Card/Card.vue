<template>
  <div class="card" :class="background">
    <slot/>
  </div>
</template>
<script>
export default {
  props: {
    background: {
      type: String,
      default: "card_bg_default"
    }
  }
};
</script>
