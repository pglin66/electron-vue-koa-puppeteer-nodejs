<template>
    <div style="padding: 30px">
        <div class="btns">
            <div style="margin: 5px;">
                <Input v-model="getnumber.number" placeholder="手机号码" />
            </div>
            <Button type="warning" @click.stop="bindlesetip">
                切换ip
            </Button>
            <Button type="success" @click.stop="bindlebrowser">
                注册
            </Button>

          <Button type="success" @click.stop="bindlereadelsx">
              读取excel数据
          </Button>
          <Button type="success" @click.stop="bindleregbtn">
              点击注册
          </Button>

          <Button type="success" @click.stop="bindletypeform">
              填写注册信息
          </Button>
          <Button type="success" @click.stop="bindlegetnumber">
              获取手机号码
          </Button>
          <Button type="success" @click.stop="bindletypenumber">
              填写手机号码
          </Button>
          <Button type="success" @click.stop="bindletypecode">
              填写验证码
          </Button>

          <Button type="success" @click.stop="bindletypeinfo">
              填写用户信息
          </Button>
          <Button type="success" @click.stop="bindlenext1">
              下一步
          </Button>
          <Button type="success" @click.stop="bindlenext2">
              最后一步
          </Button>
      </div>
        <div style="margin-top: 30px;">
            <Button @click.stop="bindlereg">
                一键注册
            </Button>
            <Button @click.stop="bindlereg2">
                不切换ip一键注册
            </Button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'landing-page',
        data() {
            return {
                getnumber:{
                    number:'',
                    id:''
                }
            }
        },
        created() {

        },
        methods: {
            async bindlereg(){
                let readelsx= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/readelsx',
                    method: 'get',
                    data: this.form
                })
                if(readelsx.data.errno!=0){
                    return ;
                }
                let id= await axios({
                    url: 'http://127.0.0.1:3000/api/ip',
                    method: 'get',
                })

                if(id.data.errno!=0){
                    return ;
                }
                let googleEmail= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail',
                    method: 'get',
                })

                if(googleEmail.data.errno!=0){
                    return ;
                }

                let regbtn= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/regbtn',
                    method: 'get',
                })

                if(regbtn.data.errno!=0){
                    return ;
                }

                let typeform= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typeform',
                    method: 'get',
                })

                if(typeform.data.errno!=0){
                    return ;
                }
                let getnumber= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/getnumber',
                    method: 'get',
                })
                this.getnumber=getnumber.data.data
                if(getnumber.data.errno!=0){
                    return ;
                }

                let typenumber= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typenumber',
                    method: 'get',
                    params:this.getnumber
                })

                if(typenumber.data.errno!=0){

                    return ;
                }


                let typecode= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typecode',
                    params:this.getnumber,
                    method: 'get',
                })

                if(typecode.data.errno!=0){
                    return ;
                }

                let typeinfo= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typeinfo',
                    params:this.getnumber,
                    method: 'get',
                })

                if(typeinfo.data.errno!=0){
                    return ;
                }

                let next1= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/next1',
                    method: 'get',
                })

                if(next1.data.errno!=0){
                    return ;
                }

                let next2= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/next2',
                    method: 'get',
                })

                if(next2.data.errno!=0){
                    return ;
                }

            },
            async bindlereg2(){
                let readelsx= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/readelsx',
                    method: 'get',
                    data: this.form
                })
                if(readelsx.data.errno!=0){
                    return ;
                }

                let googleEmail= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail',
                    method: 'get',
                })

                if(googleEmail.data.errno!=0){
                    return ;
                }

                let regbtn= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/regbtn',
                    method: 'get',
                })

                if(regbtn.data.errno!=0){
                    return ;
                }

                let typeform= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typeform',
                    method: 'get',
                })

                if(typeform.data.errno!=0){
                    return ;
                }
                let getnumber= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/getnumber',
                    method: 'get',
                })
                this.getnumber=getnumber.data.data
                if(getnumber.data.errno!=0){
                    return ;
                }

                let typenumber= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typenumber',
                    method: 'get',
                    params:this.getnumber
                })

                if(typenumber.data.errno!=0){

                    return ;
                }


                let typecode= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typecode',
                    params:this.getnumber,
                    method: 'get',
                })

                if(typecode.data.errno!=0){
                    return ;
                }
                var typeinfo;
                setTimeout(async ()=>{
                    typeinfo= await axios({
                        url: 'http://127.0.0.1:3000/googleEmail/typeinfo',
                        params:this.getnumber,
                        method: 'get',
                    })
                },6000)

                if(typeinfo.data.errno!=0){
                    return ;
                }

                var next1;
                setTimeout(async ()=>{
                    next1= await axios({
                        url: 'http://127.0.0.1:3000/googleEmail/next1',
                        method: 'get',
                    })
                },4000)

                if(next1.data.errno!=0){
                    return ;
                }

                let next2= await axios({
                    url: 'http://127.0.0.1:3000/googleEmail/next2',
                    method: 'get',
                })

                if(next2.data.errno!=0){
                    return ;
                }

            },
            bindletypeinfo(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typeinfo',
                    method: 'get',
                    params:this.getnumber
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
            bindlenext1(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/next1',
                    method: 'get',
                    params:this.getnumber
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
            bindlenext2(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/next2',
                    method: 'get',
                    params:this.getnumber
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
            bindletypecode(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typecode',
                    method: 'get',
                    params:this.getnumber
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
            bindletypenumber(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typenumber',
                    method: 'get',
                    params:this.getnumber
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
            bindlegetnumber(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/getnumber',
                    method: 'get',
                    data: this.form
                }).then(res => {
                    if(res.data.errno==0){
                        this.getnumber=res.data.data
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
            bindlereadelsx(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/readelsx',
                    method: 'get',
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
                })
            },
            bindletypeform(){
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/typeform',
                    method: 'get',
                    data: this.form
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
            bindlebrowser(index, row) {
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail',
                    method: 'get',
                    data: this.form
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
            bindleregbtn(index, row) {
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail/regbtn',
                    method: 'get',
                    data: this.form
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
            bindlesetip(row) {
                axios({
                    url: 'http://127.0.0.1:3000/api/ip',
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

            bindleRegList(index, row) {
                axios({
                    url: 'http://127.0.0.1:3000/googleEmail?id=',
                    method: 'get',
                    data: this.form
                }).then(res => {

                })
            },
        }
    }
</script>

<style>

    .btns{
        padding-top: 100px;
    }
    .btns button{
        margin: 5px;}
</style>
