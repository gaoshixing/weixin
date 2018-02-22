<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    	pushHistory();
	var bool = false;
	setTimeout(function () {
		bool = true;
  }, 1500);
  let _this = this
	window.addEventListener("popstate", function (e) {
		if (bool) {
			_this.$router.go(-1)
		}
		pushHistory();
  }, false);
  function pushHistory() {
  const state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
  }
}


}
</script>

<style>
body{
		margin: 0;
	}
  #app {
    
  }
</style>    
