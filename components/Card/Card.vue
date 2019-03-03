<template>
  <div class="card" :class="background">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    background: String
  }
}
</script>
