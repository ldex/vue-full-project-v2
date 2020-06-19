export default {
    data() {
      return {
        componentName: "unnamed"
      };
    },
    created: function() {
      this.log();
    },
    methods: {
      log: function() {
        console.log(`Component ${this.componentName} created.`);
      }
    }
  };