<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <Card>{{ $t('generalInformation') }}</Card>
    </vs-col>
  </vs-row>
</template>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  }
}
</script>
