<template>
    <div>
        <el-row class="tac">
            <el-col :span="25">
                <el-menu style="width: 200px ;min-height: calc(100vh - 50px)"
                        default-active="Student Info"
                         router
                         :default-openeds="['Student Info']"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                >
                    <el-sub-menu index="Student Info">
                        <template #title>
                            <el-icon><user /></el-icon>
                            <span >学生信息</span>
                        </template>
                            <el-menu-item index="student" >
                                <el-icon ><document /></el-icon>
                                学生信息管理</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="Teacher Info">
                        <template #title>
                            <el-icon><user-filled /></el-icon>
                            <span>教师信息</span>
                        </template>
                            <el-menu-item index="teacher" >
                            <el-icon ><document /></el-icon>
                            教师信息管理</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="test2" >
                        <template #title>
                            <el-icon><office-building /></el-icon>
                            <span>少年宫信息</span>
                        </template>
                        <el-menu-item index="home" >
                            <el-icon ><document /></el-icon>
                            少年宫信息管理</el-menu-item>
                        <el-menu-item index="notice" >
                            <el-icon><tickets /></el-icon>
                            通知公告管理</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script lang="ts" setup >
    import {
        User,
        UserFilled,
        Document,
        Setting,
        OfficeBuilding,
        Tickets
    } from '@element-plus/icons-vue'
    const handleOpen = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

</script>
<style scoped>

</style>