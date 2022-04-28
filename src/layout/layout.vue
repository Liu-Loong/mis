<template>
    <!--     头部-->
    <Header/>
    <!--     主体-->
    <div style="display: flex">
        <!--     侧边栏-->
        <Aside/>
        <!--    主页面-->
        <router-view/>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import Aside from "@/components/Aside";
    export default {
        name: "layout",
        components: {Aside, Header}
    }
</script>

<style scoped>

</style>