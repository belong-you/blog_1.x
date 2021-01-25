<template>
    <div>
        <h2>
            <router-link :to="'article/'+ item.id">{{ item.title }}</router-link>
        </h2>
        <p class="timer">
            <i class="el-icon-time"></i>&nbsp;
            {{ switchTime(item.time) }}
            <button :style="{background: getColor(item.type)}">{{ item.type }}</button>&nbsp;
            <i class="el-icon-view"></i>&nbsp;
            {{ item.look }}&nbsp;
            <i class="el-icon-thumb"></i>&nbsp;
            {{ item.praise }}
        </p>
    </div>
</template>

<script>
import { switchTimeFormat } from '@/util/sign'
import axios from '@/axios/note';

export default {
    props: {
        item: Object,
        colors: Array,
    },
    methods: {
		switchTime (time) {
			return switchTimeFormat(time);
        },
        getColor (text) {
            let color = '';
            for (const prop of this.colors) {
                if (text === prop.name) {
                    color = prop.color;
                }
            }
            return color;
        }
    }
}
</script>

<style scoped>
h2{
    font-size: 20px;
    margin-bottom: 8px;
}
.timer{
    color: #999;
    font-size: 14px;
}
button{
    box-sizing: border-box;
    background: #b3d8ff;
    padding: 2px 8px;
    border-radius: 4px;
    color: white;
}
</style>