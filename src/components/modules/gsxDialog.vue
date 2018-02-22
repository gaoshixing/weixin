<style lang="less" scoped>
    .drop-enter-active {
        transition: all 0.3s ease;
    }
    .drop-leave{
        transition: all 0.2s ease;
    }
    .drop-enter {
        transform: scale(1.3);
        opacity: 1 ;
    }
    .drop-leave-active {
        opacity: 0;
    }
    .dialog-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .dialog-cover {
        background: #000;
        opacity: 0.3;
        position: fixed;
        z-index: 5;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .dialog-content {
        box-shadow: 0px 0px 5px #888888;
        width: 70%;
        position: fixed;
        max-height: 50%;
        overflow: auto;
        background: #fff;
        top: 33%;
        left: 50%;
        margin-left: -35%;
        z-index: 10;
        line-height: 1.6;
    }
    .dialog-close {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 20px;
        height: 20px;
        text-align: center;
        cursor: pointer;
    }
    .dialog-close:hover {
        color: #4fc08d;
    }
</style>
<template>
    <div>
        <div class="dialog-cover"  v-if="isShow" @click="closeMyself"></div>
            <transition name="drop">
                <div class="dialog-content"  v-if="isShow">
                    <slot></slot>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isShow: {
        type: Boolean,
        default: false
        }
    },
    data() {
        return {};
    },
    methods: {
        closeMyself() {
        this.$emit("on-close");
        }
    }
};
</script>