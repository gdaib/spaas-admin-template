<template>
  <div class="index" :style="{'background-image': `url(${$store.state.meta.homePageImg})`}"></div>
</template>

<style lang="less" scoped>
.index {
  height: calc(100vh - 140px);
  background: #f7f8fb;
  background-size: 100%, auto;
  background-repeat: no-repeat;
}
</style>
