<template>
    <div>
        <Form ref="formInline" :model="query" :rules="ruleInline" inline>
             <FormItem prop="user">
                 <Input v-model="query.email" placeholder="邮箱" />
             </FormItem>
            <FormItem prop="user">
                <Button type="primary" @click="bindleQuery">搜索</Button>
            </FormItem>
            <FormItem prop="user">
                <Button type="primary" @click="bindleAddList">新增</Button>
            </FormItem>
            <FormItem prop="user">
                <Button  @click="bindleDelete">删除</Button>
            </FormItem>
        </Form>
        <Table :columns="columns" :data="list.data"  v-if="list">
            <template slot-scope="scope" slot="action">
                <div style="padding: 10px 0;">
                    <Button type="info" @click.stop="bindleGetNumberList(scope.$index, scope.row)">
                        获取手机号码
                    </Button>
                    <Button type="warning" @click.stop="bindlesetip(scope.$index, scope.row)">
                        切换ip
                    </Button>
                    <Button type="success" @click.stop="bindleRegList(scope.$index, scope.row)">
                        注册
                    </Button>
                    <div style="padding-top: 10px;">
                        <Button @click.stop="bindleDelete(scope.$index, scope.row)">
                            删除
                        </Button>
                        <Button @click.stop="bindleEditList(scope.$index, scope.row)">
                            编辑
                        </Button>
                    </div>
                </div>
            </template>
        </Table>
        <Page :total="list.count" v-if="list" show-elevator class-name="app_page"  show-sizer @on-change="pagechange" @on-page-size-change="pagesize"  />
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'emial-page',
        data() {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width: 50,
                    },
                    {
                        title: '姓',
                        key: 'lastname',
                        width: 100,
                    },
                    {
                        title: '名',
                        key: 'firstname',
                        width: 100,
                    },
                   /* {
                        title: '邮箱',
                        key: 'email'
                    },

                    {
                        title: '备用邮箱',
                        key: 'spareemail'
                    },
                    {
                        title: '密码',
                        key: 'passwd'
                    },
                    {
                        title: '地区',
                        key: 'country'
                    },
                    {
                        title: '生日',
                        key: 'birthday'
                    },*/
                    {
                        title: '短信id',
                        key: 'smsid',
                        width: 100,
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '创建时间',
                        key: 'createtime'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
                query: {
                    'current': 1,
                    'email': ''
                },
                form: {
                    'current': 1,
                    'email': '',
                    'size': 10
                },
                ruleInline:{

                },

                list:null,
                listSelect: []
            }
        },
        created() {
            this.getlist()
        },
        methods: {
            bindlesetip(row) {
                axios({
                    url: 'http://127.0.0.1:8360/api/ip',
                    method: 'get',
                }).then(res => {
                    if(res.data.errno==0){
                        this.$Notice.success({
                            title: '提示',
                            desc:  res.data.errmsg
                        });
                    }else{
                        this.$Notice.error({
                            title: '提示',
                            desc: res.data.errmsg
                        });
                    }
                })
            },
            bindleGetNumberList(index, row) {
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail?id=' + row.id,
                    method: 'get',
                    data: this.form
                }).then(res => {
                    if (res.data.errno === 0) {
                        this.$message({
                            type: 'success',
                            message: res.data.errmsg
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.errmsg
                        })
                    }
                    this.getlist()
                })
            },
            bindleRegList(index, row) {
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail?id=' + row.id,
                    method: 'get',
                    data: this.form
                }).then(res => {
                    this.getlist()
                })
            },
            bindleQuery() {
                this.form = {
                    ...this.form,
                    ...this.query
                }
                this.getlist()
            },
            bindleTableSelect(selection) {
                this.listSelect = []
                selection.map(item => {
                    this.listSelect.push(item.id)
                })
            },
            bindleDelete(index, row) {
                let ids = []
                if (row) {
                    ids = [row.id]
                } else {
                    ids = this.listSelect
                }
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax({
                        url: 'sys/config/delete',
                        method: 'post',
                        data: {
                            ids: ids
                        }
                    }).then(res => {
                        // this.list.records.splice(index, 1);
                        this.getlist()
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        })
                    }).catch(() => {
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            pagechange(res){
                this.form.current=res;
                this.getlist();
            },
            pagesize(res){
                this.form.size=res;
                this.getlist();
            },
            getlist() {
                axios({
                    url: 'http://127.0.0.1:3000/api/email',
                    method: 'get',
                    params: this.form
                }).then(res => {
                    this.list = res.data.data
                })
            },
            bindleAddList() {
                this.$router.push('/email_edit')
            },
            bindleEditList(index, row) {
                this.$router.push('/email_edit?id=' + row.id)
            },
            handleSizeChange(val) {
                this.form.size = val
                this.getlist()
            },
            handleCurrentChange(val) {
                this.form.current = val
                this.getlist()
            }
        }
    }
</script>

<style>

</style>
