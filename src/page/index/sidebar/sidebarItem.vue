<template>
    <div class="menu-wrapper">
        <template v-for="item in menu">
            <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
                          :index="item[pathKey]"
                          @click="open(item)"
                          :key="item[labelKey]"
                          :class="{'is-active':vaildAvtive(item)}">
                <i :class="item[iconKey]"></i>
                <span slot="title">{{item[labelKey]}}</span>
            </el-menu-item>
            <el-submenu v-else-if="!validatenull(item[childrenKey])&&vaildRoles(item)"
                        :index="item[pathKey]"
                        :key="item[labelKey]">
                <template slot="title">
                    <i :class="item[iconKey]"></i>
                    <span slot="title"
                          :class="{'el-menu--display':collapse&&first}">{{item[labelKey]}}</span>
                </template>
                <template v-for="(child,cindex) in item[childrenKey]">
                    <el-menu-item :index="child[pathKey],cindex"
                                  @click="open(child)"
                                  :class="{'is-active':vaildAvtive(child)}"
                                  v-if="validatenull(child[childrenKey])"
                                  :key="child[labelKey]">
                        <i :class="child[iconKey]"></i>
                        <span slot="title">{{child[labelKey]}}</span>
                    </el-menu-item>
                    <sidebar-item v-else
                                  :menu="[child]"
                                  :key="cindex"
                                  :props="props"
                                  :screen="screen"
                                  :collapse="collapse"></sidebar-item>
                </template>
            </el-submenu>
        </template>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {validatenull} from '@/util/validate';
    import website from '@/const/website.js'

    export default {
        name: 'sidebarItem',
        data() {
            return {
                config: website.menu
            }
        },
        props: {
            menu: {
                type: Array
            },
            screen: {
                type: Number
            },
            first: {
                type: Boolean,
                default: false
            },
            props: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            collapse: {
                type: Boolean
            }
        },
        created() {
        },
        mounted() {
        },
        computed: {
            ...mapGetters(['roles']),
            labelKey() {
                return this.props.label || this.config.props.label
            },
            pathKey() {
                return this.props.path || this.config.props.path
            },
            iconKey() {
                return this.props.icon || this.config.props.icon
            },
            childrenKey() {
                return this.props.children || this.config.props.children
            },
            nowTagValue() {
                return this.$router.$avueRouter.getValue(this.$route)
            }
        },
        methods: {
            vaildAvtive(item) {
                const groupFlag = (item['group'] || []).some(ele => this.$route.path.includes(ele));
                return this.nowTagValue === item[this.pathKey] || groupFlag
            },
            vaildRoles(item) {
                item.meta = item.meta || {};
                return item.meta.roles ? item.meta.roles.includes(this.roles) : true
            },
            validatenull(val) {
                return validatenull(val);
            },
            open(item) {
                if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
                this.$router.$avueRouter.group = item.group;

               // this.$store.commit('SET_CURRENT_MENU', item);

                this.$router.push({
                    path: this.$router.$avueRouter.getPath({
                        name: item[this.labelKey],
                        src: item[this.pathKey],
                        id: item.id
                    }),
                    query: item.query
                })
            }
        }
    }
</script>

