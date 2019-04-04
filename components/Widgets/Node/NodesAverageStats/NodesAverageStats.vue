<template>
  <div>
    <div class="nodes-average row">
      <div v-for="item in items" :key="item.color" class="nodes-average__item col col_xs_3">
        <div
          class="nodes-average__icon"
          :class="[item.color ? 'nodes-average__icon_color_'+item.color : '', item.icon ? item.icon : '']"
        ></div>
        <div class="nodes-average__data">
          <div class="nodes-average__title">{{item.title}}</div>
          <div class="nodes-average__value">
            {{item.value.number}}
            <span class="nodes-average__currency">{{item.value.currency}}</span>
          </div>
          <div class="nodes-average__tooltip">
            <span
              :class="{'nodes-average__tooltip_negative': parseFloat(item.tooltip.number)<0 && item.tooltip.isChange, 'nodes-average__tooltip_positive': parseFloat(item.tooltip.number)>0 && item.tooltip.isChange}"
            >{{item.tooltip.number}}</span>
            {{item.tooltip.text}}
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => {
    return {
      items: [
        {
          icon: "fe fe-layers",
          color: "purple",
          title: "Monitored Nodes",
          value: {
            number: "18",
            currency: ""
          },
          tooltip: {
            text: "in network",
            number: "8264",
            isChange: false
          }
        },
        {
          icon: "fe fe-codepen",
          color: "green",
          title: "Average rewards per day",
          value: {
            number: "875",
            currency: "NKN"
          },
          tooltip: {
            text: "up this week",
            number: "2.4%",
            isChange: true
          }
        },
        {
          icon: "fe fe-credit-card",
          color: "red",
          title: "Total Mined",
          value: {
            number: "45,500",
            currency: "NKN"
          },
          tooltip: {
            text: "mined in March",
            number: "2650",
            isChange: false
          }
        },
        {
          icon: "fe fe-dollar-sign",
          color: "orange",
          title: "Profit per month",
          value: {
            number: "$1,650",
            currency: "USD"
          },
          tooltip: {
            text: "mined in March",
            number: "2650",
            isChange: false
          }
        }
      ]
    };
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
};
</script>
