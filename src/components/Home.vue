<template>
  <div class="hello">
    HelloWorld this
    <!-- <article class="context" v-html="compiledMarkdown"></article> 不安全，xss -->
    <vue-markdown class="article" v-highlight :source="content"></vue-markdown>
  </div>
</template>

<script>
import marked from "marked";
import VueMarkdown from "vue-markdown";
export default {
  name: "Home",
  props: {
    msg: String,
  },
  components: {
    "vue-markdown": VueMarkdown, // 声明组件
  },
  data() {
    return {
      code: "```javascript\nfunction(){\n\tconsole.log(123)\n}\n```",
      content: "test",
    };
  },
  created() {
    this.$http
      .get("/mock/data.json")
      .then((res) => {
        this.code = res.data.seller.description;
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.$http.get("Blogs/function.md").then((response) => {
      debugger;
      console.log(response.data);
      this.content = response.data;
    });
  },
  mounted() {},
  computed: {
    compiledMarkdown() {
      return marked(this.code, { sanitize: true });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.article {
  padding: 0 36px;
}
</style>
