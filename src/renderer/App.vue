<template>
    <div id="app">
        <!--<div class="layout">
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="light" active-name="1">
                        <div class="layout-logo">邮箱自动注册软件</div>
                        <div class="layout-nav">
                          <router-link to="/email">
                            <MenuItem name="1">
                                <Icon type="ios-navigate"></Icon>
                              邮箱列表
                            </MenuItem>
                          </router-link>
                          <router-link to="/landing">
                            <MenuItem name="2">
                                <Icon type="ios-keypad"></Icon>
                              短信列表
                            </MenuItem>
                          </router-link>
                            <MenuItem name="3">
                                <Icon type="ios-analytics"></Icon>
                              软件配置
                            </MenuItem>
                            <MenuItem name="4">
                              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            </MenuItem>
                        </div>
                    </Menu>
                </Header>
                <Layout>
                  &lt;!&ndash;  <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>&ndash;&gt;
                    <Content :style="{ minHeight: '280px'}">
                        <Layout>
                            &lt;!&ndash;<Sider hide-trigger :style="{background: '#fff'}">
                                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                                  <router-link to="/">
                                    <MenuItem name="1-2">邮箱列表</MenuItem>
                                  </router-link>
                                  <router-link to="/landing">
                                    <MenuItem name="1-6">短信列表</MenuItem>
                                  </router-link>
                                  <router-link to="/landing">
                                    <MenuItem name="1-6">软件配置</MenuItem>
                                  </router-link>
                                    &lt;!&ndash;<Submenu name="1">
                                        <template slot="title">
                                            <Icon type="ios-navigate"></Icon>
                                            Item 1
                                        </template>
                                        <MenuItem name="1-1">Option 1</MenuItem>
                                        <MenuItem name="1-2">Option 2</MenuItem>
                                        <MenuItem name="1-3">Option 3</MenuItem>
                                    </Submenu>&ndash;&gt;
                                   &lt;!&ndash; <Submenu name="2">
                                        <template slot="title">
                                            <Icon type="ios-keypad"></Icon>
                                            Item 2
                                        </template>
                                        <MenuItem name="2-1">Option 1</MenuItem>
                                        <MenuItem name="2-2">Option 2</MenuItem>
                                    </Submenu>
                                    <Submenu name="3">
                                        <template slot="title">
                                            <Icon type="ios-analytics"></Icon>
                                            Item 3
                                        </template>
                                        <MenuItem name="3-1">Option 1</MenuItem>
                                        <MenuItem name="3-2">Option 2</MenuItem>
                                    </Submenu>&ndash;&gt;
                                </Menu>
                            </Sider>&ndash;&gt;
                            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                                <router-view></router-view>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
                <Footer class="layout-footer-center">2020-2020 &copy; </Footer>
            </Layout>
        </div>
-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'my-project'
    }
</script>

<style>
  .app_page{
    margin-top: 20px;
  }
  .ivu-layout-header{
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.08);
    box-shadow: 0 1px 1px rgba(0,0,0,.08);

  }
    /* CSS */
    .layout {
        border: 1px solid #d7dde4;
        background: #f00;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-menu-light{
      background: none;}
    .ivu-menu-horizontal.ivu-menu-light:after{
      display: none;}
    .layout-logo {
        width: 300px;
        height: 30px;
        line-height: 30px;
        color: #333;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 520px;
        margin: 0 auto;
        margin-right: 0px;
        display: flex;
      justify-content: flex-end;
    }

    .layout-footer-center {
        text-align: center;
    }
</style>
