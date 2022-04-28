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
        <el-dialog v-model="dialogFormVisible" title="提示" width="40%" :model="form">

            <el-form :model="form" ref="form" :rules="rules" style="margin-left: 12%">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="stuname">
                    <el-input v-model="form.stuname" autocomplete="off" placeholder="请输入姓名" size="default"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" maxlength="2" show-word-limit
                              autocomplete="off" placeholder="请输入年龄" size="default"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" label="男" size="default">男</el-radio>
                    <el-radio v-model="form.sex" label="女" size="default">女</el-radio>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
                    <el-col :span="11">
                        <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                placeholder="请选择日期"
                                size="default"
                                style="width: 100%"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth" prop="classroom">
                    <el-input v-model="form.classroom" autocomplete="off" placeholder="请输入所在班级" size="default"></el-input>
                </el-form-item>
                <el-form-item label="监护人姓名" :label-width="formLabelWidth" prop="parents">
                    <el-input v-model="form.parents" autocomplete="off" placeholder="请输入监护人姓名" size="default"></el-input>
                </el-form-item>
                <el-form-item label="监护人关系" :label-width="formLabelWidth" prop="parrelation">
                    <el-select v-model="form.parrelation"  placeholder="请选择监护人关系" size="default">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="监护人联系方式" :label-width="formLabelWidth" prop="parphone">
                    <el-input v-model="form.parphone" maxlength="11" show-word-limit
                              autocomplete="off" placeholder="请输入监护人联系方式" size="default"></el-input>
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
                tooltip-effect="dark"
                :default-sort="{ prop: 'age',prop:'sex',prop:'birthday',prop:'classroom',prop:'parrelation' }"
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" width="80"  />
            <el-table-column prop="stuname" label="姓名" width="90" />
            <el-table-column prop="age" label="年龄" width="100" sortable/>
            <el-table-column prop="sex" label="性别" width="100" sortable/>
            <el-table-column prop="birthday" label="出生日期" width="120" sortable/>
            <el-table-column prop="classroom" label="班级" width="130" sortable/>
            <el-table-column prop="parents" label="监护人姓名" width="110" />
            <el-table-column prop="parrelation" label="监护人关系" width="100" />
            <el-table-column prop="parphone" label="监护人联系方式" width="130" />
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
    // import { reactive, ref } from 'vue'
    import {
        CirclePlus,Delete,Edit,Search
    } from '@element-plus/icons-vue'

    export default {
        name:'Student',
        components:{
            CirclePlus,Delete,Edit,Search
        },
        data() {
            return {
                rules:{
                    stuname:[{ required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
                    age:[{ required: true, message: '请输入年龄', trigger: 'blur' }],
                    sex:[{required: true, message: '请选择性别', trigger: 'change',}],
                    birthday: [{type: 'date', required: true, message: '请选择时间', trigger: 'change'}],
                    classroom:[{required: true, message: '请输入所在班级', trigger: 'change'}],
                    parents:[{ required: true, message: '请输入监护人姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
                    parrelation:[{required: true, message: '请选择监护人关系', trigger: 'change'}],
                    parphone: [{ required: true, message: '请输入监护人联系方式', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的号码格式', trigger: 'blur' }],
                },
                options:[
                    {value: '父亲', label: '父亲',},
                    {value: '母亲', label: '母亲',}
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
                    parents:'',
                    parrelation:'',
                    parphone:'',
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
                request.post("api/student/deleteBatch",this.ids).then(res =>{
                    if (res.code === '0'){
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
                            request.put("/api/student",this.form).then(res =>{
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
                            request.post("/api/student",this.form).then(res =>{
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
                    }else {
                        console.log("表单提交失败！！！")
                        return false;
                    }
                })
            },
            //获取后台数据
            query(){
                request.get("/api/student",{
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
                request.delete("api/student/"+ id).then(res =>{
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
