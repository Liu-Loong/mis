<template>
    <div class="home" style="padding: 10px">
        <!--搜索栏-->
        <div style="margin: 5px 0;">
            <el-input v-model="search" placeholder="请输入内容" clearable style="width: 20%"/>
            <el-button type="primary" style="margin-left: 10px"  @click="query">
                <el-icon style="margin-right: 5px"><search /></el-icon>查询</el-button>
            <el-button type="primary"
                       style="margin-left: 10px"
                       @click="dialogFormVisible = true,submitReset()">
                <el-icon style="margin-right: 5px"><circle-plus /></el-icon>新增</el-button>

            <el-popconfirm title="确定要删除吗?" @confirm="deleteBatch">
                <template #reference>
                    <el-button type="danger" >
                        <el-icon style="margin-right: 5px"><Delete/></el-icon>批量删除</el-button>
                </template>
            </el-popconfirm>


        </div>
        <!--弹窗表单-->
        <el-dialog v-model="dialogFormVisible" title="提示" width="35%" :model="form">

            <el-form :model="form" ref="myform">
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名" size="default"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名" size="default"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" autocomplete="off" placeholder="请输入年龄" size="default"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" label="男" >男</el-radio>
                    <el-radio v-model="form.sex" label="女" >女</el-radio>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="address" size="default">
                    <el-input type="textarea" v-model="form.address" autocomplete="off" style="width:75%" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                 <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false" size="default">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false,submit()" size="default">确认</el-button>
                 </span>
            </template>

        </el-dialog>



        <!--表格-->
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                :default-sort="{ prop: 'age',prop:'sex',order: 'descending' }"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" width="130"  />
            <el-table-column prop="username" label="用户名" width="130"/>
            <el-table-column prop="name" label="姓名" width="130" />
            <el-table-column prop="age" label="年龄" width="130" sortable/>
            <el-table-column prop="sex" label="性别" width="130" sortable/>
            <el-table-column prop="address" label="地址" width="300" show-overflow-tooltip/>
            <el-table-column fixed="right" label="操作" width="300">

                <template #default="scope">
                    <el-button @click="dialogFormVisible = true,handleEdit(scope.row)" type="primary" >
                        <el-icon style="margin-right: 5px"><edit /></el-icon>编辑</el-button>

                    <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button type="danger"  >
                                <el-icon style="margin-right: 5px"><delete /></el-icon>删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>

        <div style="margin-top: 10px">
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <!--分页器-->
        <div style="margin:10px 0">
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 15, 20, 50]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import request from "@/utils/request.js";
// import { reactive, ref } from 'vue'
import {
    CirclePlus,Delete,Edit,Search
} from '@element-plus/icons-vue'

export default {
    name:'Home',
    components:{
        CirclePlus,Delete,Edit,Search
    },
    data() {
        return {
            search:'',
            currentPage:1,
            pageSize:15,
            total:0,
            tableData: [
               ],
            ids:[],
            multipleSelection: [],
            dialogFormVisible: false,
            formLabelWidth: '100px',
            form: {
                username: '',
                name: '',
                age:'',
                sex:'',
                address:'',
                delivery: false,
                type: [],
                resource: '',
                desc: '    '
            },
        }
    },
    //页面加载时调用
    created(){
        this.query()
    },
    methods: {
        //批量删除
        deleteBatch(){
            if (!this.ids.length){
                this.$message.warning("请选择最少一条数据！");
                return
            }
            request.post("api/user/deleteBatch",this.ids).then(res =>{
                if (res.code === '0'){
                    this.$message.success("批量删除成功！");
                    this.query()//刷新表格数据
                }else {
                    this.$message.error("批量删除错误！！！")
                }

            })

        },
        //刷新表单
        submitReset(){
            this.form={}
        },
        //提交表单数据
        submit(){
            if (this.form.id){
                request.put("/api/user",this.form).then(res =>{
                    console.log(res);
                    if (res.code === '0'){//恒等于
                        this.$message({
                            type:"success",
                            message:"修改成功"
                        })
                    }else{
                        this.$message.error("修改错误")
                    }
                    this.query();//刷新表格数据
                    this.dialogFormVisible = false
                })
            }else {
                request.post("/api/user",this.form).then(res =>{
                    console.log(res);
                    if (res.code === '0'){//恒等于
                        this.$message({
                            type:"success",
                            message:"新增成功"
                        })
                    }else{
                        this.$message.error("新增错误")
                    }
                    this.query();//刷新表格数据
                    this.dialogFormVisible = false
                })
            }
        },
        //获取后台数据
        query(){
            request.get("/api/user",{
                params:{
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    search: this.search
                }
            }).then(res =>{
                this.tableData = res.data.records;
                this.total = res.data.total
                // console.log(this.search)
                // console.log(this.tableData)
                // console.log(this.total)
            })
        },
        //多选框
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.ids = val.map(v => v.id) //在所有的行对象中去除其中的所有所选id
        },
        //编辑按钮
        handleEdit(row){
            //深拷贝
            this.form = JSON.parse(JSON.stringify(row))
        },
        //删除按钮
        handleDelete(id){
            console.log(id);
            request.delete("api/user/"+ id).then(res =>{
                if (res.code === '0'){//恒等于
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                }else{
                    this.$message.error("删除错误")
                }
                this.query()//刷新表格数据
            })
        },
        //分页器
        handleSizeChange(pageSize) {//改变当前页的个数
            this.pageSize = pageSize;
            this.query();
            console.log(`每页 ${pageSize} 条`);
        },
        handleCurrentChange(pageNum) {//改变当前页
            this.currentPage = pageNum;
            this.query();
            console.log(`当前页: ${pageNum}`);
        }
    }
}
</script>
<style scoped>
    .el-button--text {
        margin-right: 15px;
    }
    .el-select {
        width: 300px;
    }
    .el-input {
        width: 300px;
    }
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
</style>
