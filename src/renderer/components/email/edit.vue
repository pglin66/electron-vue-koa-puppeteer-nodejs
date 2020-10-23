<template>
    <div>
        <Form ref="form" :model="form" label-position="right" :label-width="120">
            <FormItem label="姓" prop="lastname" >
                <Input v-model="form.lastname" />
            </FormItem>
            <FormItem label="名称" prop="firstname">
                <Input v-model="form.firstname" />
            </FormItem>
            <FormItem label="密码" prop="passwd">
                <Input v-model="form.passwd" />
                <Button @click="bindlerandompasswd">随机</Button>
            </FormItem>
            <FormItem label="地区" prop="country">
                <Input v-model="form.country" />
            </FormItem>
            <FormItem label="生日" prop="birthday">
                <Input v-model="form.birthday" />
            </FormItem>
            <FormItem label="详细地址" prop="addressinfo">
                <Input v-model="form.addressinfo" />
            </FormItem>

            <FormItem label="邮编" prop="postalcode">
                <Input v-model="form.postalcode" />
            </FormItem>
            <FormItem label="城市" prop="city">
                <Input v-model="form.city" />
            </FormItem>
            <FormItem label="州" prop="state">
                <Input v-model="form.state" />
            </FormItem>
            <FormItem label="当前使用短信id" prop="smsid">
                <Input v-model="form.smsid" />
            </FormItem>
            <FormItem label="状态" prop="status">
                <!--<el-switch v-model="form.status" :active-value="1" :inactive-value="0" />-->
            </FormItem>
            <FormItem>
                <Button type="primary" @click="onSubmit('form')">提交</Button>
                <Button @click="resetForm('form')">重置</Button>
            </FormItem>
        </Form>

    </div>
</template>

<script>
    import axios from 'axios'
    function randomPassword(size) {
        let seed = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'p', 'Q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '2', '3', '4', '5', '6', '7', '8', '9'
        );//数组
        let seedlength = seed.length; //数组长度
        let createPassword = '';
        for (let i = 0; i < size; i++) {
            let j = Math.floor(Math.random() * seedlength);
            createPassword += seed[j];
        }
        return createPassword;
    }
    export default {
        name: "edit",
        data() {
            return {
                form: {
                    id:null,
                    lastname:'',
                    firstname:'',
                    passwd:'',
                    country:'saudiarabia',
                    birthday:'',
                    addressinfo:'',
                    postalcode:'',
                    city:'',
                    state:0,
                    smsid:1,
                    status:0,
                },
                rules: {}
            }
        },
        created() {
            if (this.$route.query.id) {
                this.getinfo(this.$route.query.id)
            }
        },
        methods: {
            bindlerandompasswd(){
                this.form.passwd=randomPassword(10)
            },
            getinfo(id) {
                axios({
                    url: 'http://127.0.0.1:3000/api/email/info',
                    method: 'get',
                    params: {
                       id
                    }
                }).then(res => {
                    this.form = res.data.data
                })
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3000/api/email/save',
                            data: this.form
                        }).then(res => {
                            console.log(res)
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
                            this.$router.push('/email')
                        }).catch((e) => {
                        })
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>

</style>
