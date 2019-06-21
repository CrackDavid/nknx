<template>
  <Card padding="none">
    <v-client-table :columns="columns" :data="data" :options="options">
      <a
        slot="uri"
        slot-scope="props"
        target="_blank"
        :href="props.row.uri"
        class="glyphicon glyphicon-eye-open"
      ></a>

      <div slot="child_row" slot-scope="props">
        The link to {{props.row.name}} is
        <a :href="props.row.uri">{{props.row.uri}}</a>
      </div>
    </v-client-table>
  </Card>
</template>

<style lang="scss">
@import './NodeManager.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  data: () => {
    return {
      columns: ['name', 'code', 'uri'],
      data: [
        {
          code: 'ZW',
          name: 'Zimbabwe',
          created_at: '2015-04-24T01:46:50.459583',
          updated_at: '2015-04-24T01:46:50.459593',
          uri: 'http://api.lobbyfacts.eu/api/1/country/245',
          id: 245
        },
        {
          code: 'ZM',
          name: 'Zambia',
          created_at: '2015-04-24T01:46:50.457459',
          updated_at: '2015-04-24T01:46:50.457468',
          uri: 'http://api.lobbyfacts.eu/api/1/country/244',
          id: 244
        }
      ],
      options: {
        headings: {
          name: 'Country Name',
          code: 'Country Code',
          uri: 'View Record'
        },
        sortable: ['name', 'code'],
        filterable: ['name', 'code']
      }
    }
  },
  mounted: function() {}
}
</script>
