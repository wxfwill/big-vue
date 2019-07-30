<template>
    <table class="bj-table">
        <thead>
        <th :key="column.id" :style="{color : `${column.color}`}" v-for="column in columns">
            {{ column.label }}
        </th>
        </thead>
        <tbody>
        <tr :key="rowIndex" v-for="(row, rowIndex) in list">
            <td :key="column.id" :style="{color : `${column.color}`}" v-for="column in columns">{{ row[column.id] }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
	export default {
		props: ['columns', 'list']
	}
</script>

<style lang="scss" scoped>
    .bj-table {
        width: 100%;
        thead {
            margin-bottom: 20px;
            th {
                line-height: 70px;
                font-size: 20px;
                font-weight: 400;
                width: 150px;
            }
        }
        tbody {
            tr {
                line-height: 50px;
                font-size: 18px;
            }
        }
    }
</style>