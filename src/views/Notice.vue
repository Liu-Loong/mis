<template>
    <div class="home" style="padding: 10px">
        <!--搜索栏-->
        <div style="margin: 5px 0;">
            <el-input v-model="search" placeholder="请输入内容" clearable style="width: 20%"/>
            <el-button type="primary" style="margin-left: 10px"  @click="query">
                <el-icon style="margin-right: 5px"><search /></el-icon>查询</el-button>
            <el-button type="primary"
                       style="margin-left: 10px"
                       @click="dialogFormVisible = true,submitReset('form')">
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

            <el-form :model="form" ref="form" :rules="rules">

                <el-form-item label="公告标题" :label-width="formLabelWidth" prop="title">
                    <el-select v-model="form.title"  placeholder="请选择标题类型" size="default">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="发布日期" :label-width="formLabelWidth" prop="time">
                    <el-col :span="11">
                        <el-date-picker
                                v-model="form.time"
                                type="date"
                                placeholder="请选择日期"
                                size="default"
                                style="width: 100%"
                        />
                    </el-col>
                </el-form-item>

                <el-form-item label="姓名" :label-width="formLabelWidth" prop="content" style="width: 80%">
                    <el-input
                            v-model="form.content"
                            :autosize="{ minRows: 2, maxRows: 10}"
                            type="textarea"
                            placeholder="请输入内容"
                            size="default"
                    />
<!--                    <el-input v-model="form.teaname" autocomplete="off" placeholder="请输入姓名" size="default"></el-input>-->
                </el-form-item>



            </el-form>

            <template #footer>
                 <span class="dialog-footer">
                    <el-button @click="submitReset('form'),dialogFormVisible = false" size="default">取消</el-button>
                    <el-button type="primary" @click="submit('form')" size="default">确认</el-button>
                 </span>
            </template>

        </el-dialog>


        <!--表格-->
        <el-table
                ref="multipleTable"
                :data="tableData"
                :default-sort="{ prop: 'age',prop:'sex',prop:'edubackground',prop:'evaluation',order: 'descending' }"
                tooltip-effect="dark"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" width="130"  />
            <el-table-column prop="title" label="公告标题" width="130" />
            <el-table-column prop="time" label="发布日期" width="130" sortable/>
            <el-table-column prop="content" label="公告内容" width="570" />

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
    import request from "../utils/request";

    import {
        CirclePlus,Delete,Edit,Search
    } from '@element-plus/icons-vue'

    export default {
        name:'Notice',
        components:{
            CirclePlus,Delete,Edit,Search
        },
        data() {
            return {
                rules:{
                    title:[{required: true, message: '请选择公告类型', trigger: 'change'}],
                    time: [{type: 'date', required: true, message: '请选择时间', trigger: 'change'}],
                    content:[{ required: true, message: '请输入公告内容', trigger: 'blur' }]
                },
                options:[
                    {value: '放假通知', label: '放假通知',},
                    {value: '新开课程通知', label: '新开课程通知',},
                    {value: '优惠活动通知', label: '优惠活动通知',}
                ],
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
                    name: '',
                    age:'',
                    sex:'',
                    edubackground:'',
                    evaluation:'',
                    delivery: false,
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
                request.post("api/notice/deleteBatch",this.ids).then(res =>{
                    if (res.code === '200'){
                        this.$message.success("批量删除成功！");
                        this.query()//刷新表格数据
                    }else {
                        this.$message.error("批量删除错误！！！")
                    }

                })

            },
            //刷新表单
            submitReset(formName){
                this.$nextTick(()=>{
                    this.$refs[formName].resetFields();
                })
            },
            //提交表单数据
            submit(formName){
                this.$refs[formName].validate((valid) =>{
                    if (valid){
                        if (this.form.id){
                            request.put("/api/notice",this.form).then(res =>{
                                console.log(res);
                                if (res.code === '200'){//恒等于
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
                            request.post("/api/notice",this.form).then(res =>{
                                console.log(res);
                                if (res.code === '200'){//恒等于
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
                    }else {
                        console.log("表单提交失败！！！")
                        return false;
                    }
                })
            },
            //获取后台数据
            query(){
                request.get("/api/notice",{
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
                request.delete("api/notice/"+ id).then(res =>{
                    if (res.code === '200'){//恒等于
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
