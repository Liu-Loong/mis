<template>
    <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex" >
        <div style="width: 200px; padding-left: 10px; font-weight: bold;color: dodgerblue;text-align: center">
          后台信息管理系统
        </div>
        <div style="flex: 1 ;" ></div>

        <div style="width: 100px;padding-top:17px;">
            <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
                <template #dropdown>
                    <el-dropdown-menu>
<!--                        <el-dropdown-item>Action 1</el-dropdown-item>-->
<!--                        <el-dropdown-item>Action 2</el-dropdown-item>-->
                        <el-dropdown-item @click="$router.push('/login')">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>

<script lang="ts" setup>
    import { ArrowDown, ElementPlus } from '@element-plus/icons-vue'
</script>
<style scoped>
    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
</style>
